import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plane, Calendar, Users, Share } from "lucide-react";
import Link from "next/link";

interface BoardingPassProps {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	destination: string;
	people: number;
}

export default function BudGroupCard({
	id,
	name,
	startDate,
	endDate,
	destination,
	people,
}: BoardingPassProps) {
	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: "TravelBuds",
				text: `Check out ${name}'s boarding pass!`,
				url: `https://travelbuds.vercel.app/budgroups/join/${id}`,
			});
		}
	};
	return (
		<Card className="w-full max-w-md mx-auto bg-white shadow-lg">
			<CardHeader className="flex flex-row items-center justify-center gap-2 align-center bg-primary text-primary-foreground p-4 rounded-t-lg">
				<h2 className="text-2xl font-bold text-center">
					{name}'s Boarding Pass
				</h2>
				<button onClick={handleShare}>
					<Share
						className="h-6 w-6 text-muted-foreground bg-white"
						color="pink"
					/>
				</button>
			</CardHeader>
			<Link
				href={`/budgroup/${id}`}
				className="w-full max-w-md mx-auto bg-white rounded-lg"
			>
				<CardContent className="p-6 space-y-4">
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Passenger
						</p>
						<p className="text-lg font-semibold text-black">
							{name}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Start Date
							</p>
							<div className="flex items-center space-x-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<p className="text-sm text-black">
									{startDate}
								</p>
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								End Date
							</p>
							<div className="flex items-center space-x-2">
								<Calendar className="h-4 w-4 text-muted-foreground " />
								<p className="text-sm text-black">{endDate}</p>
							</div>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Destination
						</p>
						<div className="flex items-center space-x-2">
							<Plane className="h-4 w-4 text-muted-foreground" />
							<p className="text-lg font-semibold text-black">
								{destination}
							</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Travelers
						</p>
						<div className="flex items-center space-x-2">
							<Users className="h-4 w-4 text-muted-foreground" />
							<p className="text-sm text-black">
								{people} {people === 1 ? "person" : "people"}
							</p>
						</div>
					</div>
				</CardContent>
			</Link>
			<div className="border-t border-dashed border-gray-300 my-4"></div>
			<div className="p-4 bg-gray-100 rounded-b-lg text-center text-sm text-gray-600">
				<p>Boarding pass for reference only</p>
				<p className="font-semibold mt-1">Have a great trip!</p>
			</div>
		</Card>
	);
}
