import { BudGroupData } from "@/lib/types"

export default function BudGroupInfo({ budgroupInfo }: { budgroupInfo: BudGroupData }) {
	return (
		<div>
			<h1>ID: {budgroupInfo.id}</h1>
			<h1>BUDGET: {budgroupInfo.budget}</h1>
			<h1>STARTDATES: {budgroupInfo.startdates}</h1>
			<h1>ENDDATES: {budgroupInfo.enddates}</h1>
			<h1>USER_ID: {budgroupInfo.user_id}</h1>
		</div>
	)
}
