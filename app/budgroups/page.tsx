import { Suspense } from "react"
import { BudGroupsServer } from "./components/server"

export default function BudGroups() {
	return (
		<div>
			<Suspense fallback={<p>Loading feed....</p>}>
				<BudGroupsServer />
			</Suspense>
		</div>
	)
}
