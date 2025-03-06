"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Expense, User, Category } from "@/components/expense-tracker"
import { randomUUID } from "crypto"

interface ExpenseFormProps {
	users: User[]
	categories: Category[]
	onSubmit: (expense: Expense) => void
	onCancel: () => void
}

export function ExpenseForm({ users, categories, onSubmit, onCancel }: ExpenseFormProps) {
	const [description, setDescription] = useState("")
	const [amount, setAmount] = useState("")
	const [paidBy, setPaidBy] = useState(users[0]?.id || "")
	const [category, setCategory] = useState(categories[0]?.id || "")
	const [date, setDate] = useState<Date>(new Date())
	const [splitType, setSplitType] = useState<"equal" | "custom">("equal")
	const [customSplit, setCustomSplit] = useState<Record<string, string>>(
		users.reduce(
			(acc, user) => {
				acc[user.id] = ""
				return acc
			},
			{} as Record<string, string>
		)
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const numericAmount = Number.parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		const split: Record<string, number> = {}

		if (splitType === "equal") {
			const perPerson = numericAmount / users.length
			users.forEach((user) => {
				split[user.id] = perPerson
			})
		} else {
			// Validate custom split
			let total = 0
			users.forEach((user) => {
				const userAmount = Number.parseFloat(customSplit[user.id] || "0")
				split[user.id] = isNaN(userAmount) ? 0 : userAmount
				total += split[user.id]
			})

			// If total doesn't match, adjust proportionally
			if (Math.abs(total - numericAmount) > 0.01) {
				const factor = numericAmount / total
				Object.keys(split).forEach((userId) => {
					split[userId] = Number.parseFloat((split[userId] * factor).toFixed(2))
				})
			}
		}

		const newExpense: Expense = {
			id: randomUUID(),
			description,
			amount: numericAmount,
			paidBy,
			date,
			category,
			split,
		}

		onSubmit(newExpense)
	}

	const handleCustomSplitChange = (userId: string, value: string) => {
		setCustomSplit({
			...customSplit,
			[userId]: value,
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add New Expense</CardTitle>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="What was this expense for?"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							type="number"
							step="0.01"
							min="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="0.00"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="paidBy">Paid By</Label>
						<Select value={paidBy} onValueChange={setPaidBy}>
							<SelectTrigger>
								<SelectValue placeholder="Select who paid" />
							</SelectTrigger>
							<SelectContent>
								{users.map((user) => (
									<SelectItem key={user.id} value={user.id}>
										{user.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.id}>
										<div className="flex items-center">
											<div className={`w-3 h-3 rounded-full mr-2 ${cat.color}`}></div>
											{cat.name}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="date">Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-start text-left font-normal",
										!date && "text-muted-foreground"
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={(date) => date && setDate(date)}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className="space-y-2">
						<Label>Split Type</Label>
						<div className="flex space-x-4">
							<Button
								type="button"
								variant={splitType === "equal" ? "default" : "outline"}
								onClick={() => setSplitType("equal")}
							>
								Split Equally
							</Button>
							<Button
								type="button"
								variant={splitType === "custom" ? "default" : "outline"}
								onClick={() => setSplitType("custom")}
							>
								Custom Split
							</Button>
						</div>
					</div>

					{splitType === "custom" && (
						<div className="space-y-4">
							<Label>Custom Split</Label>
							{users.map((user) => (
								<div key={user.id} className="flex items-center space-x-2">
									<Label className="w-24">{user.name}</Label>
									<Input
										type="number"
										step="0.01"
										min="0"
										value={customSplit[user.id]}
										onChange={(e) => handleCustomSplitChange(user.id, e.target.value)}
										placeholder="0.00"
									/>
								</div>
							))}
						</div>
					)}
				</CardContent>

				<CardFooter className="flex justify-between">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">Save Expense</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
