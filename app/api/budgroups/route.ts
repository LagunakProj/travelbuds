import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const userId = searchParams.get("userId");
	const supabase = createClient();

	let { data: Budgroups, error } = await supabase
		.from("Budgroups")
		.select("*")
		.contains("members", [userId]);

	return NextResponse.json(Budgroups);
}
