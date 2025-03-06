"use client"

import type { Expense, User, Category } from "@/components/expense-tracker"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpenseListProps {
	expenses: Expense[]
	users: User[]
	categories: Category[]
	onDelete: (id: string) => void
}

export function ExpenseList({ expenses, users, categories, onDelete }: ExpenseListProps) {
	if (expenses.length === 0) {
		return (
			<div className="text-center p-8 text-gray-500">No expenses yet. Add your first expense!</div>
		)
	}

	const getUserName = (id: string) => {
		return users.find((user) => user.id === id)?.name || "Unknown"
	}

	const getCategory = (id: string) => {
		return categories.find((cat) => cat.id === id) || { name: "Other", color: "bg-gray-500" }
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Expenses</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{expenses.map((expense) => {
						const category = getCategory(expense.category)
						const paidByName = getUserName(expense.paidBy)

						return (
							<div
								key={expense.id}
								className="flex items-center justify-between p-4  rounded-lg border"
							>
								<div className="flex items-center space-x-4">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${category.color}`}
									>
										{category.name.charAt(0)}
									</div>
									<div>
										<h3 className="font-medium">{expense.description}</h3>
										<div className="text-sm text-gray-500">
											{format(new Date(expense.date), "MMM d, yyyy")} • Paid by {paidByName}
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="text-right">
										<div className="font-semibold">${expense.amount.toFixed(2)}</div>
										<div className="text-xs text-gray-500">
											{Object.keys(expense.split).length} people
										</div>
									</div>
									<Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
