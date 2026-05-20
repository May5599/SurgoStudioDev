import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../../../lib/supabase";

export async function POST(req) {
  try {
    const {
      title,
      content,
      description,
      tags,
      coverImageUrl,
      metaTitle,
      focusKeyphrase,
      faqItems,
      slug: providedSlug,
    } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ success: false, error: "Title and content are required." });
    }

    // Build a clean slug: prefer AI-generated slug, fall back to title-derived
    const baseSlug = (providedSlug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 65);

    // Short random suffix to guarantee uniqueness without a noisy timestamp
    const suffix = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${suffix}`;

    // ── Step 1: Insert with core columns (always present) ─────────────────────
    const { data: inserted, error: insertError } = await supabase
      .from("blogs")
      .insert({
        title: title.trim(),
        slug,
        content: content.trim(),
        description: description?.trim() || "",
        tags: tags?.length ? tags : ["Ottawa", "Video Production", "Surgo Studios"],
        cover_image_url: coverImageUrl || null,
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (insertError) throw insertError;

    // ── Step 2: Save extended SEO fields if columns exist in Supabase ─────────
    // These columns need to be added via SQL migration (see README / admin notes):
    //   ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
    //   ALTER TABLE blogs ADD COLUMN IF NOT EXISTS focus_keyphrase TEXT;
    //   ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faq_items JSONB DEFAULT '[]';
    if (inserted?.id && (metaTitle || focusKeyphrase || faqItems?.length)) {
      await supabase
        .from("blogs")
        .update({
          meta_title: metaTitle?.trim() || null,
          focus_keyphrase: focusKeyphrase?.trim() || null,
          faq_items: faqItems?.length ? faqItems : [],
        })
        .eq("id", inserted.id)
        .then(() => null)
        .catch(() => null); // silent — these columns may not exist yet
    }

    // Revalidate the blog list and the individual post page
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Publish failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
