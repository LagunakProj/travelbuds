import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user?.id

	console.log(userId)

	let { data: Budgroups, error } = await supabase
		.from("Budgroups")
		.select("*")
		.contains("members", [userId])

	return NextResponse.json(Budgroups)
}
