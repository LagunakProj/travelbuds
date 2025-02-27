import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/client"

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const budgroupId = searchParams.get("budgroupId")
	const userId = searchParams.get("userId")
	const supabase = createClient()

	const { data: existingData, error } = await supabase
		.from("Budgroups")
		.select("members")
		.eq("id", budgroupId)
		.single()

	const existingMembers = existingData?.members || []

	console.log(existingMembers)

	// Check if the new email is already in the array
	if (!existingMembers.includes(userId)) {
		const updatedMembers = [...existingMembers, userId]

		console.log(updatedMembers)

		const { data, error } = await supabase
			.from("Budgroups")
			.update({ members: updatedMembers })
			.eq("id", budgroupId)
			.select()

		console.log(data)
	}

	// return NextResponse.redirect("/budgroup/" + budgroupId);
	return NextResponse.json({ message: "BudGroup joined!" })
}
