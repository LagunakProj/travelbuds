import SwipeDestination from "@/components/swipe-destination"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/submit-button"
import MultiDateRangePicker from "@/components/budgroup/date-range-picker"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function BudGroupsQuestions({ budgroupId }: { budgroupId: string }) {
	// Estado principal que contiene el presupuesto y los rangos de fechas
	const [formData, setFormData] = useState({
		budget: "",
		dateRanges: [{ id: "1", startDate: undefined, endDate: undefined }],
	})

	// Función para actualizar el presupuesto
	const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, budget: e.target.value })
	}

	// Función para actualizar los rangos de fechas
	const handleDateRangesChange = (dateRanges: any[]) => {
		setFormData({ ...formData, dateRanges })
	}

	// Función para enviar los datos
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await fetch("/api/budgroup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				budgroupId: budgroupId,
				budget: formData.budget,
				dateRanges: formData.dateRanges,
			}),
		})

		if (response.ok) {
			toast.success("BudGroup created!")
			// router.refresh()
		} else {
			toast.error("Error creating BudGroup")
			console.log(response)
		}
	}

	return (
		<div>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			{/* <SwipeDestination /> */}
			<form onSubmit={handleSubmit} className="flex flex-col py-12 gap-2">
				<h1 className="text-2xl font-medium">Questions</h1>
				<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
					<Label htmlFor="budget">Budget</Label>
					<Input
						name="budget"
						placeholder="300"
						value={formData.budget}
						required
						type="number"
						onChange={handleBudgetChange}
					/>
					<MultiDateRangePicker
						dateRanges={formData.dateRanges}
						onDateRangesChange={handleDateRangesChange}
					/>
					<SubmitButton pendingText="Updating info...">Send</SubmitButton>
				</div>
			</form>
		</div>
	)
}
