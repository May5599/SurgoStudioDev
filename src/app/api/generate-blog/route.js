import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import Parser from "rss-parser";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const parser = new Parser();

export async function POST(req) {
  const { topic } = await req.json();

  // 📰 Step 1 — Pull 5 trending Ottawa media keywords
  let trendingKeywords = "";
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=ottawa+media+OR+video+production+OR+marketing+OR+podcast+OR+creative&hl=en-CA&gl=CA&ceid=CA:en"
    );
    const headlines = feed.items.slice(0, 5).map((i) => i.title).join(", ");
    trendingKeywords = headlines;
  } catch (err) {
    trendingKeywords =
      "Ottawa video production, podcast studios, conference filming, media storytelling, creative marketing";
  }

  // 🧠 Step 2 — Main prompt
  const prompt = `
You are a skilled SEO blog writer for Surgo Studios — an Ottawa-based video production and media agency.
Write a cinematic, SEO-optimized blog post for the title: "${topic}"

Guidelines:
- Use natural, editorial, human language (no AI phrases, no em dashes).
- Focus on Ottawa’s creative and business community.
- Include trending local keywords:
  ${trendingKeywords}
- Mention video production, podcast services, event coverage, and social media content.
- Mention Surgo Studios and Surgo Media as authorities.
- Include an introduction, clear H2 sections, and a CTA to work with Surgo Studios.
- Keep it creative, relevant, and 100% unique.
Return only Markdown.
`;

  // ✍️ Step 3 — Generate blog content
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let blogContent = completion.choices[0].message.content || "";

  // 🧹 Step 4 — Auto format and clean up
  blogContent = blogContent
    .replace(/\s{2,}/g, " ") // remove double spaces
    .replace(/\n{3,}/g, "\n\n") // remove triple line breaks
    .replace(/^##\s*(.*)$/gm, (match, p1) => `## ${p1.trim().replace(/\b\w/g, (c) => c.toUpperCase())}`) // capitalize H2
    .replace(/^###\s*(.*)$/gm, (match, p1) => `### ${p1.trim().replace(/\b\w/g, (c) => c.toUpperCase())}`); // capitalize H3

  // 🪶 Step 5 — Add front matter
  const frontMatter = matter.stringify(blogContent, {
    title: topic,
    date: new Date().toISOString(),
    description: `Local Ottawa SEO blog on ${topic} — insights from Surgo Studios.`,
    tags: [
      "Ottawa",
      "video production",
      "Surgo Studios",
      "media marketing",
      "podcast production",
      "creative storytelling",
    ],
  });

  const filename = `${topic.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.mdx`;

  // 💾 Step 6 — Commit to GitHub
  await octokit.repos.createOrUpdateFileContents({
    owner: "May5599", // your GitHub username
    repo: "SurgoStudioDev", // your repo name
    path: `content/blogs/${filename}`,
    message: `🤖 Added blog: ${topic}`,
    content: Buffer.from(frontMatter).toString("base64"),
    branch: "main",
  });

  return NextResponse.json({
    success: true,
    filename,
    trendingKeywords,
  });
}
