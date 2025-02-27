import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user?.id

	try {
		const { username, name, minPeople } = await req.json()

		if (!userId || !name || !minPeople || !username) {
			return new Response(JSON.stringify({ message: "Faltan datos" }), {
				status: 400,
			})
		}

		const { data, error } = await supabase
			.from("Budgroups")
			.insert([
				{
					name: name,
					create_user: username,
					members: [userId],
					people: minPeople,
				},
			])
			.select()

		return new Response(JSON.stringify({ message: "BudGroup created!" }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		})
	} catch (error) {
		return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 })
	}
}
