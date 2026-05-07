import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../../../lib/supabase";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "No id provided." });

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/blog");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
