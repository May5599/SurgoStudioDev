import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) return NextResponse.json({ success: false, error: "No file provided." });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop().toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filename);

    return NextResponse.json({ success: true, url: data.publicUrl });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
