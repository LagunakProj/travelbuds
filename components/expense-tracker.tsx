"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { SettlementSummary } from "@/components/settlement-summary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type User = {
	id: string
	name: string
}

export type Category = {
	id: string
	name: string
	color: string
}

export type Expense = {
	id: string
	description: string
	amount: number
	paidBy: string // user id
	date: Date
	category: string // category id
	split: Record<string, number> // userId: amount
}

const defaultUsers: User[] = [
	{ id: "1", name: "You" },
	{ id: "2", name: "Alice" },
	{ id: "3", name: "Bob" },
]

const defaultCategories: Category[] = [
	{ id: "1", name: "Food", color: "bg-green-500" },
	{ id: "2", name: "Transportation", color: "bg-blue-500" },
	{ id: "3", name: "Entertainment", color: "bg-purple-500" },
	{ id: "4", name: "Utilities", color: "bg-yellow-500" },
	{ id: "5", name: "Other", color: "bg-gray-500" },
]

export default function ExpenseTracker() {
	const [expenses, setExpenses] = useState<Expense[]>([
		{
			id: "1",
			description: "Groceries",
			amount: 50,
			paidBy: "1",
			date: new Date(),
			category: "1",
			split: { "1": 25, "2": 25 },
		},
	])
	const [users, setUsers] = useState<User[]>(defaultUsers)
	const [categories, setCategories] = useState<Category[]>(defaultCategories)
	const [showForm, setShowForm] = useState(false)

	const addExpense = (expense: Expense) => {
		setExpenses([...expenses, expense])
		setShowForm(false)
	}

	const deleteExpense = (id: string) => {
		setExpenses(expenses.filter((expense) => expense.id !== id))
	}

	const addUser = (name: string) => {
		const newUser = {
			id: Date.now().toString(),
			name,
		}
		setUsers([...users, newUser])
	}

	const addCategory = (name: string, color: string) => {
		const newCategory = {
			id: Date.now().toString(),
			name,
			color,
		}
		setCategories([...categories, newCategory])
	}

	return (
		<div className="space-y-6">
			<Tabs defaultValue="expenses">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="expenses">Expenses</TabsTrigger>
					<TabsTrigger value="settlement">Settlement</TabsTrigger>
				</TabsList>

				<TabsContent value="expenses" className="space-y-4">
					{showForm ? (
						<ExpenseForm
							users={users}
							categories={categories}
							onSubmit={addExpense}
							onCancel={() => setShowForm(false)}
						/>
					) : (
						<Button onClick={() => setShowForm(true)} className="w-full">
							<Plus className="mr-2 h-4 w-4" /> Add Expense
						</Button>
					)}

					<ExpenseList
						expenses={expenses}
						users={users}
						categories={categories}
						onDelete={deleteExpense}
					/>
				</TabsContent>

				<TabsContent value="settlement">
					<SettlementSummary expenses={expenses} users={users} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
