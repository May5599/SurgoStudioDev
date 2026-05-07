import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug, cover_image_url, published_at")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, posts: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
