import { NextResponse } from "next/server";
import OpenAI from "openai";
import Parser from "rss-parser";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const parser = new Parser();

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ success: false, error: "No topic provided." });

    let trendingKeywords = "";
    try {
      const feed = await parser.parseURL(
        "https://news.google.com/rss/search?q=ottawa+video+production+OR+media+agency+OR+creative+marketing&hl=en-CA&gl=CA&ceid=CA:en"
      );
      trendingKeywords = feed.items.slice(0, 6).map((i) => i.title).join(", ");
    } catch {
      trendingKeywords =
        "Ottawa video production 2026, brand storytelling Ottawa, social media content creation, corporate video Ottawa";
    }

    const prompt = `You are an expert SEO copywriter and brand voice specialist for Surgo Studios — a premium cinematic video production, podcast, and creative media agency based in Ottawa, Ontario.

Write a 1,000–1,400 word SEO-optimized blog post about: "${topic}"

TARGET GEOGRAPHY — weave these naturally throughout the content:
- Primary: Ottawa, Ontario
- Nearby areas: Kanata, Barrhaven, Orleans, Nepean, Gloucester, Stittsville, Gatineau, Hull, Manotick
- Broader reach: Toronto, Ontario, Canada

2026 HIGH-VALUE KEYWORDS — include at least 10 naturally:
- Ottawa video production company
- corporate video Ottawa
- brand storytelling Ottawa
- social media content creation Ottawa
- short-form video production 2026
- cinematic brand film Ottawa
- podcast production Ottawa
- YouTube Shorts and Instagram Reels production Ottawa
- personal branding video Ottawa
- video marketing strategy 2026
- content creation agency Ottawa
- drone videography Ottawa
- professional video production Ontario
- Ottawa creative agency
- digital storytelling Ottawa
- video production Kanata
- business video Ottawa
- marketing video production Ontario
- Ottawa filmmaker
- video content strategy 2026

TONE: Cinematic, confident, expert. Like a filmmaker who deeply understands business growth. Never corporate-bland.
AUDIENCE: Ottawa-area business owners, entrepreneurs, marketing managers, and content creators aged 25–55.

HTML STRUCTURE (strictly follow this):
- <h1> — main title, must include a primary keyword + Ottawa
- <h2> — 3 to 4 section headers, each including a secondary keyword
- <p> — body paragraphs, 3–5 sentences max each
- <strong> — bold 2–3 key phrases or stats per section

CONTENT RULES:
- First paragraph MUST open with a reference to Ottawa or a specific Ottawa neighbourhood
- Mention at least 4 Ottawa-area locations woven naturally into sentences
- Include at least one specific 2026 video or content marketing stat (invent a plausible one)
- Reference Surgo Studios 2–3 times as the expert authority
- Final paragraph: compelling CTA mentioning Surgo Studios, invite readers to visit /contact

STRICT FORMATTING RULES:
- Return ONLY clean HTML — no markdown, no code fences, no backticks
- Start directly with the <h1> tag — no preamble
- No <html>, <head>, <body>, or wrapper <div> tags
- No em-dashes — use regular hyphens
- No filler openers like "In today's digital world" or "In conclusion"
- Never mention AI, SEO tools, or that content was generated

Current trending context for relevance:
${trendingKeywords}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
    });

    let content = completion.choices[0]?.message?.content?.trim() || "";

    content = content
      .replace(/```html|```/g, "")
      .replace(/[—–]/g, "-")
      .trim();

    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const generatedTitle = titleMatch?.[1]?.replace(/<[^>]+>/g, "").trim() || topic;

    const firstP = content.match(/<p>(.*?)<\/p>/i)?.[1]?.trim() || "";

    return NextResponse.json({
      success: true,
      content,
      title: generatedTitle,
      description: firstP,
    });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
