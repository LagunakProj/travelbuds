"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { BudGroup } from "@/lib/types";
import BoardingPassCard from "@/components/budgroup-card";
import { useUser } from "@clerk/nextjs";
import Modal from "react-minimal-modal";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function BudGroups() {
	const router = useRouter();
	const user = useUser();

	const [budGroups, setBudGroups] = useState<BudGroup[] | null>(null);
	const [showModal, setShowModal] = useState(false);

	const [newBudGroupName, setNewBudGroupName] = useState<string>("");
	const [newBudGroupMinPeople, setNewBudGroupMinPeople] = useState<number>(0);

	useEffect(() => {
		if (!user.isSignedIn) return;
		fetch("/api/budgroups?userId=" + user.user.id)
			.then((res) => res.json())
			.then((data) => setBudGroups(data));
	}, [user.isSignedIn]);

	const handleCreateBudGroup = async () => {
		if (!user.isSignedIn) return;

		const response = await fetch("/api/budgroups/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: user.user.id,
				username: user.user.username,
				name: newBudGroupName,
				minPeople: newBudGroupMinPeople,
			}),
		});

		setShowModal(false);

		if (response.ok) {
			toast.success("BudGroup created!");
			router.refresh();
		} else {
			toast.error("Error creating BudGroup");
		}
	};

	if (!user.isSignedIn) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center text-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center">
					<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
						<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
							Please sign in to view your BudGroups
						</h1>
					</div>
				</section>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						Hi, {user.user.username}! Your BudGroups
					</h1>
					<p className="text-lg text-white max-w-lg text-center">
						Your BudGroups are the people you travel with. Create a
						BudGroup to start planning your next adventure.
					</p>
					<div className="flex gap-4">
						<Button
							className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
							onClick={() => {
								setShowModal(true);
							}}
						>
							Create BudGroup
						</Button>
						<Modal
							open={showModal}
							onOpenChange={setShowModal}
							title="Create BudGroup"
						>
							<div className="flex flex-col gap-4">
								<Input
									className="bg-white text-black"
									type="text"
									placeholder="BudGroup Name"
									onChange={(e) => {
										setNewBudGroupName(e.target.value);
									}}
								/>
								<Input
									className="bg-white text-black"
									type="number"
									placeholder="Minimum Number of People"
									onChange={(e) => {
										setNewBudGroupMinPeople(
											parseInt(e.target.value)
										);
									}}
								/>
								<Button
									className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
									onClick={() => {
										handleCreateBudGroup();
									}}
								>
									Create BudGroup
								</Button>
							</div>
						</Modal>
					</div>
				</div>
			</section>
			<section className="flex flex-col w-full py-12 md:py-24 lg:py-32 ">
				<div className="flex flex-col justify-center align-center text-center px-4 md:px-6">
					{budGroups ? (
						<ul className="flex flex-row flex-wrap gap-4">
							{budGroups.map((budGroup) => (
								<BoardingPassCard
									key={budGroup.id}
									id={budGroup.id}
									name={budGroup.name}
									startDate={budGroup?.startdate}
									endDate={budGroup.enddate}
									destination={budGroup.destination}
									people={budGroup.people}
								/>
							))}
						</ul>
					) : (
						<p className="text-white text-2xl">
							We could not find any BudGroups yet, but you can
							create one!!
						</p>
					)}
				</div>
			</section>
		</main>
	);
}
