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

    const owner = "May5599";
    const repo = "SurgoStudioDev";
    const branch = "main";
    const contentPath = "content/blogs";

    // 🧱 Step 1 — Get the latest commit SHA of main
    const refData = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    const latestCommitSha = refData.data.object.sha;

    // 📁 Step 2 — Get the tree SHA (to pull latest files)
    const commitData = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const treeSha = commitData.data.tree.sha;

    // 📰 Step 3 — Fetch trending Ottawa keywords
    let trendingKeywords = "";
    try {
      const feed = await parser.parseURL(
        "https://news.google.com/rss/search?q=ottawa+video+production+OR+media+agency+OR+creative+marketing+OR+podcast+studio&hl=en-CA&gl=CA&ceid=CA:en"
      );
      const headlines = feed.items.slice(0, 5).map((i) => i.title).join(", ");
      trendingKeywords = headlines;
    } catch {
      trendingKeywords =
        "Ottawa video production, Toronto creative studios, Ontario branding agencies, cinematic storytelling, content marketing, podcast production";
    }

    // ✍️ Step 4 — Build improved creative prompt
    const prompt = `
You are a professional creative copywriter at Surgo Studios — a cinematic video production and podcast agency in Ottawa.

Write a complete 900–1200 word blog post about:
"${topic}"

Tone: cinematic, inspiring, and human — like a filmmaker telling a story.
Audience: creative brands, entrepreneurs, and storytellers across Ottawa, Toronto, and Ontario.

✅ Rules:
- DO NOT mention SEO, AI, automation, or "generated" content.
- No phrases like "this article will discuss".
- Use <h1>, <h2>, <h3>, <p> tags only.
- Keep paragraphs short and readable.
- End with a short call-to-action that invites readers to connect with Surgo Studios.

Inspiration keywords:
${trendingKeywords}

Return only HTML (no markdown or code fences).
`;

    // 🧠 Step 5 — Generate blog content
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    let blogContent = completion.choices[0]?.message?.content?.trim() || "";

    // 🧹 Step 6 — Clean the HTML
    blogContent = blogContent
      .replace(/[\u2014\u2013]/g, "-")
      .replace(/\*\*|__|[*_]/g, "")
      .replace(/<\/?br\s*\/?>/gi, "<br/>")
      .replace(/\n{2,}/g, "\n")
      .trim();

    // 🪶 Step 7 — Extract first paragraph
    const firstParagraphMatch = blogContent.match(/<p>(.*?)<\/p>/i);
    const firstParagraph =
      firstParagraphMatch?.[1]?.trim() ||
      `Creative storytelling and production insights from Surgo Studios in Ottawa.`;

    // 🏷 Step 8 — Add YAML frontmatter
    const frontMatter = matter.stringify(blogContent, {
      title: topic,
      date: new Date().toISOString(),
      description: firstParagraph,
      tags: [
        "Surgo Studios",
        "Ottawa",
        "Toronto",
        "Ontario",
        "Video Production",
        "Creative Agency",
        "Podcast Studio",
      ],
    });

    // 🗂 Step 9 — Prepare file name
    const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `${safeTopic}-${Date.now()}.mdx`;

    // 💾 Step 10 — Commit the new blog safely on top of the latest commit
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: `${contentPath}/${filename}`,
      message: `📰 Add new blog: ${topic}`,
      content: Buffer.from(frontMatter).toString("base64"),
      branch,
    });

    return NextResponse.json({
      success: true,
      filename,
      message: `✅ Blog pushed successfully to GitHub: ${filename}`,
    });
  } catch (error) {
    console.error("❌ Blog generation failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
