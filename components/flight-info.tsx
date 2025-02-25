"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightInfo() {
	const [flight, setFlight] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFlight = async () => {
			try {
				const response = await axios.get("/api/flights", {
					params: {
						fromEntityId: "MAD",
						type: "roundtrip",
						year: 2025,
						month: 11,
						currency: "EUR",
						locale: "es-ES",
						adults: 2,
					},
				});
				setFlight(response.data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchFlight();
	}, []);

	return (
		<div className="w-full max-w-md mx-auto text-center flex flex-wrap items-center justify-center">
			{loading && <p>Cargando...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}
			{flight && <pre>{JSON.stringify(flight, null, 2)}</pre>}
		</div>
	);
}
