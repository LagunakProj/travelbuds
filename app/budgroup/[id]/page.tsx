"use client";

import { useEffect, useState } from "react";
import data from "@/lib/data/flight-data.json";

export default function BudGroup({ params }: { params: { id: string } }) {
	const [flightData, setFlightData] = useState(data);
	const [id, setId] = useState<string>("");

	useEffect(() => {
		// Aquí se resuelve params.id
		const fetchData = async () => {
			if (params?.id) {
				setId(params.id);
			}
		};

		fetchData();
	}, [params]);

	if (!flightData) {
		return <p>Cargando...</p>;
	}

	return (
		<main className="flex min-h-screen flex-col text-center items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						BudGroup {id}
					</h1>
					<p className="text-lg text-white max-w-lg text-center">
						Your BudGroups are the people you travel with. Create a
						BudGroup to start planning your next adventure.
					</p>

					<p className="text-6xl">Buckets</p>
					<div className="grid grid-cols-3 gap-4">
						{flightData.data.everywhereDestination.buckets.map(
							(bucket) => (
								<div
									className="flex flex-col text-center items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
									key={bucket.id}
								>
									<h2 className="text-xl font-semibold">
										{bucket.label}
									</h2>
									<ul className="flex flex-col gap-4 items-center text-center">
										{bucket.resultIds.map((resultId) => {
											const flight =
												flightData.data.everywhereDestination.results.find(
													(r) => r.id === resultId
												);

											if (
												!flight ||
												!flight.content.flightQuotes
											)
												return null;

											return (
												<li
													key={resultId}
													className="flex flex-col border-b py-2 text-center items-center"
												>
													<h3 className="text-lg font-medium">
														{
															flight.content
																.location.name
														}
													</h3>
													<p>
														Precio más barato:{" "}
														{flight.content
															.flightQuotes
															.cheapest?.price ??
															"N/A"}
													</p>
													<img
														src={
															flight.content.image
																.url
														}
														alt={
															flight.content
																.location.name
														}
														className="w-32 h-20 object-cover rounded-md mt-2"
													/>
												</li>
											);
										})}
									</ul>
								</div>
							)
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
