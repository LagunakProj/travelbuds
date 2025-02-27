"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/date-card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DateRange {
	id: string
	startDate: Date | undefined
	endDate: Date | undefined
}

interface MultiDateRangePickerProps {
	dateRanges: DateRange[]
	onDateRangesChange: (dateRanges: DateRange[]) => void
}

export default function MultiDateRangePicker({
	dateRanges,
	onDateRangesChange,
}: MultiDateRangePickerProps) {
	const addNewRange = () => {
		const newId = (dateRanges.length + 1).toString()
		onDateRangesChange([...dateRanges, { id: newId, startDate: undefined, endDate: undefined }])
	}

	const removeRange = (id: string) => {
		if (dateRanges.length > 1) {
			onDateRangesChange(dateRanges.filter((range) => range.id !== id))
		}
	}

	const updateDateRange = (id: string, field: "startDate" | "endDate", value: Date | undefined) => {
		onDateRangesChange(
			dateRanges.map((range) => {
				if (range.id === id) {
					return { ...range, [field]: value }
				}
				return range
			})
		)
	}

	return (
		<Card className="w-full max-w-3xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Date Ranges</CardTitle>
				<Button type="button" variant="outline" size="sm" onClick={addNewRange}>
					<Plus className="mr-2 h-4 w-4" />
					Add Range
				</Button>
			</CardHeader>
			<CardContent>
				<ScrollArea className="max-h-[400px] pr-4">
					<div className="space-y-4">
						{dateRanges.map((range) => (
							<div
								key={range.id}
								className="flex flex-col space-y-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
							>
								<div className="flex flex-1 flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
									<div className="flex-1">
										<p className="text-sm font-medium">Start Date</p>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-start text-left font-normal",
														!range.startDate && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{range.startDate ? format(range.startDate, "PPP") : "Select date"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={range.startDate}
													onSelect={(date) => updateDateRange(range.id, "startDate", date)}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium">End Date</p>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-start text-left font-normal",
														!range.endDate && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{range.endDate ? format(range.endDate, "PPP") : "Select date"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={range.endDate}
													onSelect={(date) => updateDateRange(range.id, "endDate", date)}
													initialFocus
													disabled={(date) => (range.startDate ? date < range.startDate : false)}
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
								{range.startDate && range.endDate && (
									<Badge variant="secondary" className="hidden sm:inline-flex">
										{format(range.startDate, "MMM d")} - {format(range.endDate, "MMM d, yyyy")}
									</Badge>
								)}
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeRange(range.id)}
									disabled={dateRanges.length === 1}
									className="ml-auto"
								>
									<Trash2 className="h-4 w-4" />
									<span className="sr-only">Remove date range</span>
								</Button>
							</div>
						))}
					</div>
				</ScrollArea>

				<div className="mt-6">
					<h3 className="mb-2 font-medium">Selected Ranges:</h3>
					<div className="flex flex-wrap gap-2">
						{dateRanges
							.filter((range) => range.startDate && range.endDate)
							.map((range) => (
								<Badge key={range.id} variant="outline" className="text-xs">
									{format(range.startDate!, "MMM d")} - {format(range.endDate!, "MMM d, yyyy")}
								</Badge>
							))}
						{dateRanges.filter((range) => range.startDate && range.endDate).length === 0 && (
							<span className="text-sm text-muted-foreground">No date ranges selected</span>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
