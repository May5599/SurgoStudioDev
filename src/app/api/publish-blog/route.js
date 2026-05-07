import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../../../lib/supabase";

export async function POST(req) {
  try {
    const { title, content, description, tags, coverImageUrl } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ success: false, error: "Title and content are required." });
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80) +
      "-" +
      Date.now();

    const { error } = await supabase.from("blogs").insert({
      title: title.trim(),
      slug,
      content: content.trim(),
      description: description?.trim() || "",
      tags: tags?.length ? tags : ["Ottawa", "Video Production", "Surgo Studios"],
      cover_image_url: coverImageUrl || "/default-blog-cover.jpg",
      published_at: new Date().toISOString(),
    });

    if (error) throw error;

    revalidatePath("/blog");

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Publish failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
