import { NextResponse } from "next/server";
import OpenAI from "openai";
import Parser from "rss-parser";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const parser = new Parser();

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ success: false, error: "No topic provided." });

    let trendingContext = "";
    try {
      const feed = await parser.parseURL(
        "https://news.google.com/rss/search?q=ottawa+video+production+OR+media+agency+OR+creative+marketing&hl=en-CA&gl=CA&ceid=CA:en"
      );
      trendingContext = feed.items.slice(0, 5).map((i) => i.title).join("; ");
    } catch {
      trendingContext = "Ottawa video production 2026, brand storytelling Ottawa, social media content creation, corporate video Canada";
    }

    // ── CALL 1: Metadata only (JSON mode, fast, small) ───────────────────────
    const metadataCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      max_tokens: 1200,
      temperature: 0.65,
      messages: [
        {
          role: "system",
          content: "You are an expert SEO strategist for Surgo Studios, Ottawa's premier video production and podcast agency. You write precise, character-perfect SEO metadata.",
        },
        {
          role: "user",
          content: `Generate SEO metadata for a blog post about: "${topic}"

Return ONLY a valid JSON object with these exact fields:

{
  "focusKeyphrase": "2-4 word primary search term targeting Ottawa or Ontario (e.g. 'video marketing Ottawa', 'podcast studio Ottawa', 'content agency Toronto')",
  "metaTitle": "Browser title. Must contain focusKeyphrase verbatim. Exactly 58-64 characters total including ' | Surgo Studios' at the end.",
  "metaDescription": "Google snippet. Must contain focusKeyphrase in the first 80 characters. Exactly 150-158 characters total. End with 'Book a free call today.'",
  "slug": "4-6 lowercase hyphenated words matching the focusKeyphrase",
  "tags": ["Ottawa", "Video Production", "Surgo Studios", "plus 4 topic-specific tags"],
  "faqItems": [
    {"question": "real Google search question about this topic in Ottawa or Ontario", "answer": "3-4 sentence answer mentioning Surgo Studios"},
    {"question": "second real search question", "answer": "3-4 sentence answer"},
    {"question": "third real search question", "answer": "3-4 sentence answer"}
  ]
}

CRITICAL RULES:
1. focusKeyphrase must appear word-for-word consecutively in metaTitle, no words between them.
2. focusKeyphrase must appear word-for-word consecutively in metaDescription within the first 80 chars.
3. metaTitle: count every character. Must be 58-64 chars. Format: "[focusKeyphrase] [extra context] | Surgo Studios"
4. metaDescription: count every character. Must be 150-158 chars. Never under 150.
5. tags array must have exactly 7 strings.`,
        },
      ],
    });

    const meta = JSON.parse(metadataCompletion.choices[0]?.message?.content || "{}");

    // ── Server-side validation & auto-fix ────────────────────────────────────
    let focusKeyphrase = (meta.focusKeyphrase || "").trim().toLowerCase();
    let metaTitle = (meta.metaTitle || "").trim();
    let metaDescription = (meta.metaDescription || "").trim();

    // Auto-fix: ensure focusKeyphrase is in metaTitle (consecutive, case-insensitive)
    if (focusKeyphrase && !metaTitle.toLowerCase().includes(focusKeyphrase)) {
      // Rebuild title: focusKeyphrase + stripped old title context + | Surgo Studios
      const withoutBrand = metaTitle.replace(/\s*\|\s*Surgo Studios\s*$/i, "").trim();
      const candidate = `${meta.focusKeyphrase} - ${withoutBrand} | Surgo Studios`;
      metaTitle = candidate.slice(0, 65);
    }

    // Enforce title length 55-65 chars (trim at word boundary)
    if (metaTitle.length > 65) {
      metaTitle = metaTitle.slice(0, 65).replace(/\s+\S*$/, "") + (metaTitle.includes("| Surgo Studios") ? "" : "");
    }

    // Auto-fix: ensure focusKeyphrase is in metaDescription
    if (focusKeyphrase && !metaDescription.toLowerCase().includes(focusKeyphrase)) {
      metaDescription = `${meta.focusKeyphrase} services from Surgo Studios help Ottawa businesses grow. ${metaDescription}`.slice(0, 158);
    }

    // Enforce description length
    if (metaDescription.length > 160) {
      metaDescription = metaDescription.slice(0, 157).replace(/\s+\S*$/, "") + "...";
    }

    const faqItems = Array.isArray(meta.faqItems)
      ? meta.faqItems.slice(0, 3).map((f) => ({
          question: String(f.question || "").trim(),
          answer: String(f.answer || "").trim(),
        }))
      : [];

    const slug = (meta.slug || topic)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 65);

    // ── CALL 2: Full article content (no JSON mode   full token budget) ───────
    const faqHtml = faqItems
      .map((f) => `<div class="faq-item"><h3>${f.question}</h3><p>${f.answer}</p></div>`)
      .join("\n");

    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 5500,
      temperature: 0.72,
      messages: [
        {
          role: "system",
          content: `You are the senior content writer at Surgo Studios, a video production and creative agency at 150 Elgin Street, Ottawa. You write SEO blog articles that rank on Google page one for Ottawa, Toronto, and surrounding cities. Your writing sounds like a sharp agency pro, not a robot. Short sentences. Active voice. No fluff. You always write the full article, never cut it short.

BANNED WORDS AND PHRASES (never use any of these):
- moreover, furthermore, additionally, in conclusion, it's worth noting, it is important to note
- "In today's digital landscape", "As a business owner", "Whether you are", "In the heart of"
- em-dashes, en-dashes. Use commas or periods instead.
- Any sentence starting with "This" as a subject
- "leveraging", "utilize", "showcase", "delve", "tapestry", "vibrant", "unlock potential"
- Rhetorical questions as section openers
- Passive voice constructions like "can be seen", "is known to be"`,
        },
        {
          role: "user",
          content: `Write a complete SEO blog article about: "${topic}"

FOCUS KEYPHRASE: "${meta.focusKeyphrase}" — use it exactly 4-5 times throughout the article.

MINIMUM WORD COUNT: 1,100 words of body text. Every H2 section needs at least 220 words. Do not stop writing until all sections are fully written.

OUTPUT: Return ONLY clean HTML starting with <h1>. No markdown. No code fences. No intro text before the HTML.

GEOGRAPHIC TARGETS: The article must naturally mention businesses and clients in Ottawa, Kanata, Barrhaven, Nepean, Gatineau, Orleans, Toronto, Mississauga, Vaughan, and the broader Ontario market. Weave these in as real contexts, not lists.

STRUCTURE (write every section in full, in this exact order):

<h1>[Title that includes "${meta.focusKeyphrase}" and a city name. Make it punchy, not clickbait. Different from the meta title.]</h1>

<p>[Opening paragraph. 5 sentences. First sentence opens with a specific Ottawa street, neighbourhood, or business district. Use "${meta.focusKeyphrase}" within the first 80 words. State a real problem or tension businesses face. No generic openers.]</p>

<h2>[Section 1 heading: secondary keyword + Ottawa or Ontario reference]</h2>
<p>[4-5 sentences. Concrete, specific. Name a real business challenge.]</p>
<p>[4-5 sentences. Include one <strong>bolded key stat or claim</strong>. Reference a specific Ottawa or Toronto area naturally.]</p>
<p>[4-5 sentences. Bring in a content or video strategy insight tied to the topic.]</p>

<h2>[Section 2 heading: another angle on the topic, reference GTA or surrounding Ontario cities]</h2>
<p>[4-5 sentences. Practical and direct.]</p>
<p>[4-5 sentences with <strong>bolded highlight</strong>.]</p>
<ul>
<li>[Full sentence, not a label. Explain the point clearly.]</li>
<li>[Full sentence.]</li>
<li>[Full sentence.]</li>
<li>[Full sentence.]</li>
<li>[Full sentence.]</li>
<li>[Full sentence.]</li>
</ul>
<p>[3-4 sentences. Link naturally to <a href="/services">Surgo Studios' video and content services</a>.]</p>

<h2>[Section 3 heading: content strategy or ROI angle, mention another Ontario city]</h2>
<p>[4-5 sentences.]</p>
<p>[4-5 sentences with <strong>bolded highlight</strong>.]</p>
<p>[4-5 sentences. Name Surgo Studios as the expert helping Ottawa and Ontario businesses.]</p>
<p>[3-4 sentences. Include a plausible 2026 Canadian content or video marketing stat.]</p>

<h2>[Section 4 heading: results, process, or why now angle]</h2>
<p>[4-5 sentences. Specific and confident.]</p>
<p>[4-5 sentences. Reference the broader Ontario market: Toronto, Mississauga, Hamilton, or Ottawa suburbs.]</p>
<p>[3-4 sentences. Include <a href="/contact">book a free discovery call</a> naturally in the sentence flow.]</p>

<h2>Frequently Asked Questions</h2>
${faqHtml}

<p>[Closing CTA. 3 sentences. Name Surgo Studios. Reference Ottawa and Ontario. End with a direct link: <a href="/contact">book your free discovery call today</a>. Confident, not salesy.]</p>

CONTENT RULES (non-negotiable):
- 1,100+ words minimum. Count your output. If you are under, keep writing.
- Use "${meta.focusKeyphrase}" exactly as written, 4-5 times.
- Bold 2-3 phrases per section with <strong>.
- Name Surgo Studios at least 3 times as the authority.
- Zero em-dashes or en-dashes anywhere. Use commas or periods.
- No banned words from your system instructions.
- Every list item is a complete sentence.
- Write the entire article without stopping.`,
        },
      ],
    });

    let content = (contentCompletion.choices[0]?.message?.content || "")
      .replace(/```html|```/g, "")
      .replace(/[—–]/g, "-")
      .trim();

    // Pull display title from H1
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const displayTitle = h1Match?.[1]?.replace(/<[^>]+>/g, "").trim() || meta.metaTitle || topic;

    const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;

    return NextResponse.json({
      success: true,
      content,
      title: displayTitle,
      metaTitle: metaTitle.slice(0, 70),
      metaDescription,
      focusKeyphrase: meta.focusKeyphrase || "",
      slug,
      tags: Array.isArray(meta.tags) ? meta.tags.slice(0, 8) : ["Ottawa", "Video Production", "Surgo Studios"],
      faqItems,
      wordCount,
      warning: wordCount < 1000
        ? `Content is only ${wordCount} words   click Generate again for a fuller article.`
        : null,
    });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
