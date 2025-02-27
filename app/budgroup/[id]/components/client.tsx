"use client"

import BudGroupInfo from "@/components/budgroup/info"
import BudGroupsQuestions from "@/components/budgroup/questions"

import { BudGroupData } from "@/lib/types"
import { useEffect, useState } from "react"

export default function BudGroupClient({ id }: { id: string }) {
	const [budgroupInfo, setBudgroupInfo] = useState<BudGroupData | null>(null)

	useEffect(() => {
		fetch(`/api/budgroup?id=${id}`)
			.then((res) => res.json())
			.then((data) => setBudgroupInfo(data))
	}, [])

	return (
		<main className="flex min-h-screen flex-col text-center items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						BudGroup {id}
					</h1>
					<p className="text-lg text-white max-w-lg text-center">
						Your BudGroups are the people you travel with. Create a BudGroup to start planning your
						next adventure.
					</p>
					{budgroupInfo ? (
						<BudGroupInfo budgroupInfo={budgroupInfo} />
					) : (
						<BudGroupsQuestions budgroupId={id} />
					)}
				</div>
			</section>
		</main>
	)
}
