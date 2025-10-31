import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "May5599";
const repo = "SurgoStudioDev";
const branch = "main";
const remotePath = "content/blogs";
const localPath = path.join(process.cwd(), "content", "blogs");

async function syncBlogs() {
  try {
    console.log("🔄 Fetching blog files from GitHub...");

    // Ensure local folder exists
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath, { recursive: true });
    }

    // Fetch all files from GitHub folder
    const { data: files } = await octokit.repos.getContent({
      owner,
      repo,
      path: remotePath,
      ref: branch,
    });

    for (const file of files) {
      if (file.type === "file" && file.name.endsWith(".mdx")) {
        console.log(`⬇️ Downloading: ${file.name}`);

        const { data: fileData } = await octokit.repos.getContent({
          owner,
          repo,
          path: `${remotePath}/${file.name}`,
          ref: branch,
        });

        const content = Buffer.from(fileData.content, "base64").toString("utf8");

        // Write or overwrite locally
        const localFilePath = path.join(localPath, file.name);
        fs.writeFileSync(localFilePath, content, "utf8");
      }
    }

    console.log("✅ Sync complete! Your local /content/blogs folder is now up to date.");
  } catch (err) {
    console.error("❌ Sync failed:", err.message);
  }
}

syncBlogs();
