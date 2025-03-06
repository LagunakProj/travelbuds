import { BudGroupUserData } from "@/lib/types"
import ExpenseTracker from "@/components/expense-tracker"

export default function BudGroupInfo({ budgroupInfo }: { budgroupInfo: BudGroupUserData }) {
	return (
		<div className="flex flex-col gap-4 mt-8 items-center justify-center">
			<h1 className="text-3xl font-medium">USER DATA</h1>
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
			<h1 className="text-3xl font-medium">EXPENSES</h1>
			<ExpenseTracker />
		</div>
	)
}
