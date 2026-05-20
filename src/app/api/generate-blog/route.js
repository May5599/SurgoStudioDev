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
      trendingContext = feed.items
        .slice(0, 6)
        .map((i) => i.title)
        .join("; ");
    } catch {
      trendingContext =
        "Ottawa video production 2026, brand storytelling Ottawa, social media content creation, corporate video Canada";
    }

    const systemPrompt = `You are an expert SEO content strategist and lead copywriter for Surgo Studios — Ottawa's premier cinematic video production, podcast, and creative media agency located at 150 Elgin Street, Ottawa, Ontario. You write content that ranks on Google's first page by combining deep local Ottawa relevance with authoritative, story-driven prose. You never use filler phrases, AI clichés, or generic marketing language. Every post you write drives real organic traffic and converts readers into clients.`;

    const userPrompt = `Write a comprehensive, Google-ranking SEO blog post about: "${topic}"

Return ONLY a single valid JSON object — no markdown, no code fences, no preamble. Use this exact schema:

{
  "metaTitle": "string",
  "metaDescription": "string",
  "focusKeyphrase": "string",
  "slug": "string",
  "tags": ["string"],
  "faqItems": [
    {"question": "string", "answer": "string"},
    {"question": "string", "answer": "string"},
    {"question": "string", "answer": "string"}
  ],
  "content": "string"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIELD REQUIREMENTS — read carefully, follow precisely
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

metaTitle:
• Exactly 55–65 characters — count every character including spaces
• Format: [Primary Keyword Ottawa] | Surgo Studios
• Primary keyword must come first
• Must contain "Ottawa" or a specific Ottawa area (Kanata, Barrhaven, etc.)
• Example: "Corporate Video Production Ottawa 2026 | Surgo Studios" (53 chars — add more)
• Good example: "Why Ottawa Brands Need Corporate Video in 2026 | Surgo Studios" (63 chars)

metaDescription:
• Exactly 148–158 characters — count every character including spaces
• Include the focusKeyphrase naturally within the first 80 characters
• End with a soft call to action: "Book a free call today." or "Get a free quote."
• Must feel human and compelling — not a keyword dump
• Mention Ottawa or an Ottawa neighbourhood
• Example (155 chars): "Surgo Studios helps Ottawa businesses grow with cinematic corporate video production. From downtown to Kanata, we tell your story. Book a free call today."

focusKeyphrase:
• 2–4 words that a real Ottawa business owner would type into Google
• This is the single most important keyword this post targets
• Examples: "corporate video Ottawa", "podcast studio Ottawa", "brand film production Ottawa"

slug:
• 4–7 lowercase hyphenated words
• Must include the primary keyword
• No dates, no numbers, no special characters
• Example: "corporate-video-production-guide-ottawa"

tags:
• Array of exactly 7 tags
• Always include: "Ottawa", "Video Production", "Surgo Studios"
• Add 4 more specific tags directly relevant to the post topic
• Use title case for each tag

faqItems — exactly 3 objects:
• Questions must mirror real Google searches Ottawa people would make
• Answers: 3–5 sentences — include the focusKeyphrase naturally, authoritative and specific
• At least one answer must naturally mention Surgo Studios as the recommended solution
• These power Google FAQ Rich Results which dramatically increase SERP real estate

content — Full HTML article, 1,250–1,500 words:

Structure requirements (in order):

1. <h1> tag — article display title
   • Can be longer and more editorial than metaTitle
   • Include focusKeyphrase + Ottawa
   • Compelling hook, not just keywords
   • No em-dashes, no colons mid-title

2. Opening paragraph <p>
   • FIRST SENTENCE: must name a specific Ottawa neighbourhood, street, or landmark (not just "Ottawa")
   • Include the focusKeyphrase within the first 80 words of body text
   • Open with a surprising stat, bold claim, or vivid scene — never "In today's world"
   • 3–5 sentences

3. Three to four <h2> sections (200–250 words each)
   • Each H2 must include a secondary keyword + a location variation
   • Each section: 2–4 <p> tags
   • Bold 2–3 key phrases or stats per section using <strong>
   • At least ONE section must contain a <ul> or <ol> list with 4–6 items
   • Weave in at least 5 Ottawa-area locations naturally across all sections:
     Kanata, Barrhaven, Orleans, Nepean, Gatineau, Hull, Manotick, Stittsville, Riverside South, Westboro, Glebe, Centretown, Vanier, Orléans

4. Exactly 2 internal links placed naturally in body text:
   • Link to services page: <a href="/services">anchor text describing the service</a>
   • Link to contact page: <a href="/contact">anchor text like "book a free discovery call"</a>
   • Links must appear in natural prose — not forced or promotional-sounding

5. FAQ section — display the 3 faqItems visually:
   <h2>Frequently Asked Questions</h2>
   <div class="faq-item">
     <h3>[Question from faqItems]</h3>
     <p>[Answer from faqItems]</p>
   </div>
   (repeat for all 3 questions — content must match faqItems exactly)

6. Closing CTA paragraph
   • 2–3 sentences
   • Name Surgo Studios explicitly
   • Include <a href="/contact">book your free discovery call</a>
   • Reference Ottawa
   • Motivate action without being pushy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTML RULES — strictly follow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Start content with <h1> — NO wrapper divs, no <html>, no <body>
• No markdown, no backticks, no code fences
• No em-dashes (—) or en-dashes (–) — use commas or hyphens instead
• No filler openers: "In today's digital landscape", "In conclusion", "As a business owner", "Whether you are"
• Image tags: <img src="[descriptive-image-placeholder]" alt="[keyword-rich alt text describing the image clearly]" class="w-full rounded-xl my-6" />
• All content must be valid HTML that renders cleanly in a browser
• The JSON "content" field must be a properly JSON-escaped string

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND VOICE & SEO INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Voice: cinematic, confident, expert — a filmmaker who deeply understands business growth
• Ottawa-rooted: treat Ottawa like a character, not just a location modifier
• Include at least one specific, plausible 2026 Canadian video/content marketing stat
• Reference Surgo Studios 2–3 times as the expert authority — never self-promotional, always earned
• Audience: Ottawa business owners, marketing managers, entrepreneurs aged 28–55 who are serious about growth
• Never mention AI, ChatGPT, algorithms, or that this content was generated

HIGH-VALUE KEYWORDS — include at least 8 naturally across the post:
Ottawa video production company, corporate video Ottawa, brand storytelling Ottawa, social media content creation Ottawa, cinematic brand film Ottawa, podcast production Ottawa, Instagram Reels production Ottawa, personal branding video Ottawa, video marketing strategy 2026, content creation agency Ottawa, professional video production Ontario, Ottawa creative agency, digital storytelling Ottawa, Ottawa filmmaker

2026 TRENDING CONTEXT — weave 1–2 of these into the post naturally:
${trendingContext}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return ONLY the JSON object. Nothing else.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.72,
      max_tokens: 4500,
    });

    const raw = JSON.parse(completion.choices[0]?.message?.content || "{}");

    // Validate and sanitize every field
    const content = (raw.content || "")
      .replace(/```html|```/g, "")
      .replace(/[—–]/g, "-")
      .trim();

    // Pull display title from H1
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const displayTitle = h1Match?.[1]?.replace(/<[^>]+>/g, "").trim() || raw.metaTitle || topic;

    // Enforce meta description length (truncate at word boundary if over 160)
    let metaDescription = (raw.metaDescription || "").trim();
    if (metaDescription.length > 160) {
      metaDescription = metaDescription.slice(0, 157).replace(/\s+\S*$/, "") + "...";
    }

    // Clean slug
    const rawSlug = (raw.slug || topic)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70);

    // Validate FAQ items
    const faqItems = Array.isArray(raw.faqItems)
      ? raw.faqItems.slice(0, 3).map((f) => ({
          question: String(f.question || "").trim(),
          answer: String(f.answer || "").trim(),
        }))
      : [];

    return NextResponse.json({
      success: true,
      content,
      title: displayTitle,
      metaTitle: (raw.metaTitle || displayTitle).trim().slice(0, 70),
      metaDescription,
      focusKeyphrase: (raw.focusKeyphrase || "").trim(),
      slug: rawSlug,
      tags: Array.isArray(raw.tags) ? raw.tags.slice(0, 8) : ["Ottawa", "Video Production", "Surgo Studios"],
      faqItems,
    });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
