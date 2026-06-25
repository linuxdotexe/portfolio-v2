import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(): Promise<void | NextResponse> {
  try {
    const supabase = createClient();
    const { data: now_content, error: e } = await supabase
      .from("now_content")
      .select("section, content, updated_at")
      .eq("draft", false);
    if (e) {
      console.error(e);
      throw e;
    }
    return NextResponse.json(now_content);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: true,
        msg:
          err instanceof Error
            ? err.message
            : "Something went wrong refer to the now_content api route",
      },
      {
        status: 500,
      },
    );
  }
}
