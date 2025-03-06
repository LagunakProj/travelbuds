export interface BudGroup {
	id: string
	name: string
	startDate: string
	endDate: string
	people: number
	destination: string
}

interface DateRanges {
	id: string
	startDate: string
	endDate: string
}

export interface BudGroupUserData {
	id: string
	created_at: string
	budgroup_id: string
	budget: number
	date_ranges: DateRanges[]
	user_id: string
}
