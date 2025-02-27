"use client"

import { type Root as FlightData } from "@/lib/flightTypes"
import { useEffect, useState } from "react"
import data from "@/lib/data/flight-data.json"

export default function FlightsData() {
	const [flightData, setFlightData] = useState<FlightData | null>(null)

	useEffect(() => {
		// Simulación de llamada a API (cargar desde el JSON en este caso)
		setFlightData(data as FlightData)
	}, [])

	if (!flightData) {
		return <p>Cargando...</p>
	}

	return (
		<div>
			<p className="text-6xl">Buckets</p>
			<div className="grid grid-cols-3 gap-4">
				{flightData.data.everywhereDestination.buckets.map((bucket) => (
					<div
						className="flex flex-col text-center items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
						key={bucket.id}
					>
						<h2 className="text-xl font-semibold">{bucket.label}</h2>
						<ul className="flex flex-col gap-4 items-center text-center">
							{bucket.resultIds.map((resultId) => {
								const flight = flightData.data.everywhereDestination.results.find(
									(r) => r.id === resultId
								)

								if (!flight) return null
								if (!flight.content.flightQuotes) return

								return (
									flight && (
										<li
											key={resultId}
											className="flex flex-col border-b py-2 text-center items-center"
										>
											<h3 className="text-lg font-medium">{flight.content.location.name}</h3>
											<p>
												Precio más barato: {flight.content.flightQuotes.cheapest?.price ?? "N/A"}
											</p>
											<img
												src={flight.content.image.url}
												alt={flight.content.location.name}
												className="w-32 h-20 object-cover rounded-md mt-2"
											/>
										</li>
									)
								)
							})}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}
