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
  "focusKeyphrase": "2-4 word primary search term (e.g. 'video marketing Ottawa', 'podcast studio Ottawa')",
  "metaTitle": "Browser title   MUST contain focusKeyphrase verbatim, exactly 58-64 characters total including ' | Surgo Studios' at the end",
  "metaDescription": "Google snippet   MUST contain focusKeyphrase in first 80 chars, exactly 150-158 characters total, end with 'Book a free call today.'",
  "slug": "4-6 lowercase hyphenated words matching the focusKeyphrase",
  "tags": ["Ottawa", "Video Production", "Surgo Studios", "plus 4 topic-specific tags"],
  "faqItems": [
    {"question": "real Google search question about this topic in Ottawa", "answer": "3-4 sentence answer mentioning Surgo Studios"},
    {"question": "second real search question", "answer": "3-4 sentence answer"},
    {"question": "third real search question", "answer": "3-4 sentence answer"}
  ]
}

CRITICAL RULES:
1. focusKeyphrase must appear WORD FOR WORD consecutively in metaTitle   no words between them
2. focusKeyphrase must appear WORD FOR WORD consecutively in metaDescription within the first 80 chars
3. metaTitle: count every character. Must be 58-64 chars. Format: "[focusKeyphrase] [extra context] | Surgo Studios"
4. metaDescription: count every character. Must be 150-158 chars. Never under 150.
5. tags array must have exactly 7 strings`,
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
      temperature: 0.75,
      messages: [
        {
          role: "system",
          content: `You are the lead content writer for Surgo Studios   Ottawa's premier video production, podcast, and creative agency at 150 Elgin Street. You write long-form SEO blog articles (1,400+ words) that rank on Google's first page. You write with a cinematic, confident voice. You never use filler phrases. You never truncate   you always write the complete article.`,
        },
        {
          role: "user",
          content: `Write a COMPLETE, LONG-FORM SEO blog article about: "${topic}"

FOCUS KEYPHRASE: "${meta.focusKeyphrase}"   use this exact phrase naturally 4-5 times throughout the article.

TARGET WORD COUNT: 1,400-1,600 words of readable body text. This is non-negotiable. Each H2 section must be 250-300 words.

OUTPUT FORMAT: Return ONLY clean HTML. Start directly with <h1>. No markdown. No code fences. No backticks. No preamble.

STRICT HTML STRUCTURE   follow this order exactly:

<h1>[Engaging title   include "${meta.focusKeyphrase}" + Ottawa   different from meta title, more editorial]</h1>

<p>[Opening paragraph   5-6 sentences. FIRST SENTENCE must name a specific Ottawa neighbourhood or street. Include "${meta.focusKeyphrase}" within the first 100 words. Open with a bold stat or vivid Ottawa scene. Never start with "In today's" or "As a business owner".]</p>

<h2>[First major section   secondary keyword + Ottawa area name]</h2>
<p>[Paragraph 1   4-5 sentences]</p>
<p>[Paragraph 2   4-5 sentences, include <strong>key stat or phrase</strong>]</p>
<p>[Paragraph 3   4-5 sentences]</p>

<h2>[Second major section   include another Ottawa area like Kanata, Barrhaven, Orleans, or Nepean]</h2>
<p>[Paragraph 1   4-5 sentences]</p>
<p>[Paragraph 2   4-5 sentences with <strong>bold highlight</strong>]</p>
<ul>
  <li>[Point 1   write a full sentence explanation, not just a label]</li>
  <li>[Point 2   full sentence]</li>
  <li>[Point 3   full sentence]</li>
  <li>[Point 4   full sentence]</li>
  <li>[Point 5   full sentence]</li>
  <li>[Point 6   full sentence]</li>
</ul>
<p>[Closing paragraph for this section   3-4 sentences linking to <a href="/services">our video production services</a>]</p>

<h2>[Third major section   another Ottawa area, weave in content strategy angle]</h2>
<p>[Paragraph 1   4-5 sentences]</p>
<p>[Paragraph 2   4-5 sentences with <strong>bold highlight</strong>]</p>
<p>[Paragraph 3   4-5 sentences]</p>
<p>[Paragraph 4   3-4 sentences]</p>

<h2>[Fourth major section   wrap-up angle, could be about ROI, results, or process]</h2>
<p>[Paragraph 1   4-5 sentences]</p>
<p>[Paragraph 2   4-5 sentences]</p>
<p>[Paragraph 3   3-4 sentences with link to <a href="/contact">book a free discovery call</a>]</p>

<h2>Frequently Asked Questions</h2>
${faqHtml}

<p>[Closing CTA   3-4 sentences. Name Surgo Studios explicitly. Reference Ottawa. Include <a href="/contact">book your free discovery call</a>. Compelling, not pushy.]</p>

CONTENT RULES:
- Mention at least 6 Ottawa-area locations naturally: Kanata, Barrhaven, Orleans, Nepean, Gatineau, Hull, Manotick, Stittsville, Westboro, Glebe, Centretown, Vanier
- Include 1 plausible 2026 Canadian video/content marketing statistic
- Reference Surgo Studios 3 times as the expert authority
- Use <strong> to bold 2-3 key phrases per section
- No em-dashes ( ) or en-dashes   use commas or hyphens
- No filler openers, no "In conclusion", no "Whether you are"
- Write every paragraph in full   do not stop early
- The article is not done until all 4 H2 sections + FAQ + CTA are written completely`,
        },
      ],
    });

    let content = (contentCompletion.choices[0]?.message?.content || "")
      .replace(/```html|```/g, "")
      .replace(/[ –]/g, "-")
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
