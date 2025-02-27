import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const budgroupId = searchParams.get("id")

	if (!budgroupId) {
		return new Response(JSON.stringify({ message: "Missing budgroupId" }), {
			status: 400,
		})
	}

	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user?.id

	let { data: Userdata, error } = await supabase
		.from("Userdata")
		.select("*")
		.eq("user_id", userId)
		.eq("budgroup_id", budgroupId)
		.single()

	return NextResponse.json(Userdata)
}

export async function POST(req: Request) {
	console.log("asdada")
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user?.id
	console.log("asdada22222")
	try {
		const { budgroupId, budget, dateRanges } = await req.json()

		console.log("userId", userId)
		console.log("budgroupId", budgroupId)
		console.log("budget", budget)
		console.log("dateRanges", dateRanges)

		if (!userId || !budgroupId || !budget || !dateRanges) {
			return new Response(JSON.stringify({ message: "Missing data" }), {
				status: 400,
			})
		}

		console.log(userId, budgroupId, budget, dateRanges)

		const { data, error } = await supabase.from("Userdata").insert([
			{
				user_id: userId,
				budgroup_id: budgroupId,
				budget: budget,
				date_ranges: dateRanges,
			},
		])

		return new Response(JSON.stringify({ message: "BudGroupData created!" }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error) {
		return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 })
	}
}
