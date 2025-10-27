import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import Parser from "rss-parser";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const parser = new Parser();

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) {
      return NextResponse.json({ success: false, error: "No topic provided." });
    }

    // 📰 Step 1 — Pull trending Ottawa creative keywords
    let trendingKeywords = "";
    try {
      const feed = await parser.parseURL(
        "https://news.google.com/rss/search?q=ottawa+video+production+OR+media+agency+OR+creative+marketing+OR+podcast+studio&hl=en-CA&gl=CA&ceid=CA:en"
      );
      const headlines = feed.items.slice(0, 5).map((i) => i.title).join(", ");
      trendingKeywords = headlines;
    } catch {
      trendingKeywords =
        "Ottawa video production, podcast studios, creative marketing, cinematic storytelling, brand content creation";
    }

    // 🧠 Step 2 — AI prompt (natural, cinematic, no SEO wording)
    const prompt = `
You are a professional copywriter for Surgo Studios, a cinematic video production and creative media agency based in Ottawa.

Write a full-length blog article (minimum 900 words) on the topic: "${topic}".

Tone: cinematic, confident, and human. 
Audience: Ottawa creators, brands, and businesses seeking creative storytelling.
Avoid: the words "SEO", "AI", "local blog", or em-dashes. 
Use commas or short sentences instead.

Include trending local references or ideas from these keywords:
${trendingKeywords}

Structure:
1. A creative intro paragraph that hooks readers — this will serve as the description.
2. Strong H2 sections that flow naturally.
3. A closing paragraph that ties the story back to Surgo Studios’ mission.
Return only Markdown (no explanations).
`;

    // ✍️ Step 3 — Generate blog
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    let blogContent = completion.choices[0]?.message?.content?.trim() || "";

    // 🧹 Step 4 — Clean formatting
    blogContent = blogContent
      .replace(/\s{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/—/g, "-"); // remove em-dashes just in case

    // ✍️ Step 5 — Extract first paragraph as description
    const firstParagraphMatch = blogContent.match(/^(.*?)(\r?\n\r?\n|$)/);
    const firstParagraph =
      firstParagraphMatch?.[1]?.trim() ||
      `A creative exploration of ${topic} by Surgo Studios in Ottawa.`;

    // 🪶 Step 6 — Add front matter
    const frontMatter = matter.stringify(blogContent, {
      title: topic,
      date: new Date().toISOString(),
      description: firstParagraph,
      tags: [
        "Surgo Studios",
        "Ottawa",
        "video production",
        "creative media",
        "podcast production",
        "brand storytelling",
      ],
    });

    // 🗂 Step 7 — Commit to GitHub
    const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `${safeTopic}-${Date.now()}.mdx`;

    await octokit.repos.createOrUpdateFileContents({
      owner: "May5599",
      repo: "SurgoStudioDev",
      path: `content/blogs/${filename}`,
      message: `🎬 Added blog: ${topic}`,
      content: Buffer.from(frontMatter).toString("base64"),
      branch: "main",
    });

    return NextResponse.json({
      success: true,
      filename,
      message: `Blog created successfully: ${filename}`,
    });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
