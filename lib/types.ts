export interface BudGroup {
	id: string
	name: string
	startDate: string
	endDate: string
	people: number
	destination: string
}

export interface BudGroupData {
	id: string
	created_at: string
	budgroup_id: string
	budget: number
	startdates: string[]
	enddates: string[]
	user_id: string
}
