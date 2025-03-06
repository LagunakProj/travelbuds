import type { Expense, User } from "@/components/expense-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface SettlementSummaryProps {
	expenses: Expense[]
	users: User[]
}

type Balance = {
	userId: string
	balance: number
}

type Settlement = {
	from: string
	to: string
	amount: number
}

export function SettlementSummary({ expenses, users }: SettlementSummaryProps) {
	if (expenses.length === 0) {
		return (
			<div className="text-center p-8 text-gray-500">
				No expenses yet. Add expenses to see settlement details.
			</div>
		)
	}

	// Calculate how much each person has paid in total
	const totalPaid: Record<string, number> = {}
	users.forEach((user) => {
		totalPaid[user.id] = 0
	})

	// Calculate how much each person owes in total
	const totalOwed: Record<string, number> = {}
	users.forEach((user) => {
		totalOwed[user.id] = 0
	})

	// Calculate totals
	expenses.forEach((expense) => {
		// Add to total paid by this person
		totalPaid[expense.paidBy] = (totalPaid[expense.paidBy] || 0) + expense.amount

		// Add to total owed by each person
		Object.entries(expense.split).forEach(([userId, amount]) => {
			totalOwed[userId] = (totalOwed[userId] || 0) + amount
		})
	})

	// Calculate net balance for each person
	const balances: Balance[] = users.map((user) => ({
		userId: user.id,
		balance: totalPaid[user.id] - totalOwed[user.id],
	}))

	// Sort balances from most negative to most positive
	balances.sort((a, b) => a.balance - b.balance)

	// Calculate settlements
	const settlements: Settlement[] = []
	let i = 0 // index of person who owes money (negative balance)
	let j = balances.length - 1 // index of person who is owed money (positive balance)

	while (i < j) {
		const debtor = balances[i]
		const creditor = balances[j]

		if (Math.abs(debtor.balance) < 0.01) {
			i++
			continue
		}

		if (Math.abs(creditor.balance) < 0.01) {
			j--
			continue
		}

		const amount = Math.min(Math.abs(debtor.balance), creditor.balance)

		if (amount > 0.01) {
			// Only add settlements for non-zero amounts
			settlements.push({
				from: debtor.userId,
				to: creditor.userId,
				amount,
			})
		}

		// Update balances
		debtor.balance += amount
		creditor.balance -= amount

		// Move indices if balance is settled
		if (Math.abs(debtor.balance) < 0.01) i++
		if (Math.abs(creditor.balance) < 0.01) j--
	}

	const getUserName = (id: string) => {
		return users.find((user) => user.id === id)?.name || "Unknown"
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Settlement Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 className="text-lg font-medium mb-2">Total Expenses</h3>
							<div className="text-2xl font-bold">
								${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
							</div>
						</div>
						<div>
							<h3 className="text-lg font-medium mb-2">Number of Expenses</h3>
							<div className="text-2xl font-bold">{expenses.length}</div>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-medium mb-4">Individual Balances</h3>
						<div className="space-y-2">
							{balances.map((balance) => (
								<div key={balance.userId} className="flex justify-between p-3 rounded-md ">
									<span>{getUserName(balance.userId)}</span>
									<span
										className={
											balance.balance > 0
												? "text-green-600 font-medium"
												: balance.balance < 0
													? "text-red-600 font-medium"
													: ""
										}
									>
										{balance.balance > 0
											? `gets back $${balance.balance.toFixed(2)}`
											: balance.balance < 0
												? `owes $${Math.abs(balance.balance).toFixed(2)}`
												: `settled up`}
									</span>
								</div>
							))}
						</div>
					</div>

					{settlements.length > 0 && (
						<div>
							<h3 className="text-lg font-medium mb-4">Settlements</h3>
							<div className="space-y-3">
								{settlements.map((settlement, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3  rounded-md border"
									>
										<div className="flex items-center space-x-2">
											<span className="font-medium">{getUserName(settlement.from)}</span>
											<ArrowRight className="h-4 w-4" />
											<span className="font-medium">{getUserName(settlement.to)}</span>
										</div>
										<span className="font-bold">${settlement.amount.toFixed(2)}</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
