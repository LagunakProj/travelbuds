import BudGroupsClient from "./client"
import { createClient } from "@/utils/supabase/server"

export async function BudGroupsServer() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<BudGroupsClient user={user} />
		</main>
	)
}
