"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { BudGroup } from "@/lib/types";
import BoardingPassCard from "@/components/budgroup-card";

export default function BudGroups() {
	const [budGroups, setBudGroups] = useState<BudGroup[]>([]);

	useEffect(() => {
		fetch("/api/budgroups")
			.then((res) => res.json())
			.then((data) => setBudGroups(data.budgroups));
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						My BudGroups
					</h1>
					<p className="text-lg text-white max-w-lg text-center">
						Your BudGroups are the people you travel with. Create a
						BudGroup to start planning your next adventure.
					</p>
					<div className="flex gap-4">
						<Button
							className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
							// href="/budgroups/create"
						>
							Create BudGroup
						</Button>
						<Button
							className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
							// href="#"
						>
							Join BudGroup
						</Button>
					</div>
				</div>
			</section>
			<section className="flex flex-col w-full py-12 md:py-24 lg:py-32 ">
				<div className="flex flex-col justify-center align-center px-4 md:px-6">
					{/* <pre>{JSON.stringify(budGroups, null, 2)}</pre> */}
					<ul className="flex flex-row flex-wrap gap-4">
						{budGroups.map((budGroup) => (
							// <li key={budGroup.id}>{budGroup.name}</li>
							<BoardingPassCard
								key={budGroup.id}
								id={budGroup.id}
								name={budGroup.name}
								startDate={budGroup.startDate}
								endDate={budGroup.endDate}
								destination={budGroup.destination}
								people={budGroup.people}
							/>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
}
