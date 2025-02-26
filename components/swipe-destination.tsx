"use client";

import flightData from "@/lib/data/flight-data.json";
import { useState } from "react";
import TinderCard from "react-tinder-card";

export default function SwipeDestination() {
	// const results = data.data.everywhereDestination.buckets[0].resultIds.slice(
	// 	0,
	// 	20
	// );

	// const flights = results.map((resultId) => {
	//     return data.data.everywhereDestination.results.find(
	//         (r) => r.id === resultId
	//     );

	const destinationsDB = flightData.data.everywhereDestination.buckets
		.flatMap((bucket) =>
			bucket.resultIds.map((resultId) => {
				const flight =
					flightData.data.everywhereDestination.results.find(
						(r) => r.id === resultId
					);
				if (
					flight &&
					flight.content &&
					flight.content.location &&
					flight.content.image
				) {
					return {
						name: flight.content.location.name,
						url: flight.content.image.url,
					};
				}
				return null; // Retornar null si no encontramos la información necesaria
			})
		)
		.filter((item) => item !== null)
		.slice(0, 20);

	const [lastDirection, setLastDirection] = useState<string>();

	const swiped = (direction: string, nameToDelete: string) => {
		console.log("removing: " + nameToDelete);
		setLastDirection(direction);
	};

	const outOfFrame = (name: string) => {
		console.log(name + " left the screen!");
	};

	const onSwipe = (direction: string) => {
		console.log("You swiped: " + direction);
	};

	const onCardLeftScreen = (myIdentifier: string) => {
		console.log(myIdentifier + " left the screen");
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<p className="text-6xl text-white">Swipe Destinations</p>
			<div className="w-[90vw] max-w-[260px] h-[300px] relative flex flex-col items-center justify-center">
				{destinationsDB.map((character) => (
					<TinderCard
						className="swipe absolute"
						key={character.name}
						onSwipe={(dir) => swiped(dir, character.name)}
						onCardLeftScreen={() => outOfFrame(character.name)}
					>
						<div
							style={{
								backgroundImage: "url(" + character.url + ")",
							}}
							className="relative bg-white w-[40vw] h-[300px]  rounded-lg bg-cover bg-center"
						>
							<h3>{character.name}</h3>
						</div>
					</TinderCard>
				))}
			</div>

			{lastDirection ? (
				<h2 className="infoText text-white">
					You swiped {lastDirection}
				</h2>
			) : (
				<h2 className="infoText text-white" />
			)}

			{/* <p>{JSON.stringify(destinationsDB)}</p> */}
			{/* <TinderCard
				onSwipe={onSwipe}
				onCardLeftScreen={() => onCardLeftScreen("fooBar")}
				preventSwipe={["right", "left"]}
			>
				Hello, World!
			</TinderCard> */}
			{/* <div className="grid grid-cols-3 gap-4">
				{results.map((resultId) => {
					const flight = data.data.everywhereDestination.results.find(
						(r) => r.id === resultId
					);
					return (
						<div key={resultId}>
							<p>{flight!.content.location.name}</p>
						</div>
					);
				})}
			</div> */}
		</div>
	);
}
