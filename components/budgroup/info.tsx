import { BudGroupUserData } from "@/lib/types"

export default function BudGroupInfo({ budgroupInfo }: { budgroupInfo: BudGroupUserData }) {
	return (
		<div>
			<h1>ID: {budgroupInfo.id}</h1>
			<h1>BUDGET: {budgroupInfo.budget}</h1>
			<h1>USER_ID: {budgroupInfo.user_id}</h1>
			{budgroupInfo?.date_ranges?.map((dateRange) => (
				<div key={dateRange.id}>
					<h1>ID: {dateRange.id}</h1>
					<h1>STARTDATE: {dateRange.startDate}</h1>
					<h1>ENDDATE: {dateRange.endDate}</h1>
				</div>
			))}
		</div>
	)
}
