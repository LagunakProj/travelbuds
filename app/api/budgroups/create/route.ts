import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
	const supabase = createClient();

	try {
		const { userId, username, name, minPeople } = await req.json();

		if (!userId || !name || !minPeople || !username) {
			return new Response(JSON.stringify({ message: "Faltan datos" }), {
				status: 400,
			});
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
			.select();

		return new Response(JSON.stringify({ message: "BudGroup created!" }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error interno del servidor" }),
			{ status: 500 }
		);
	}
}
