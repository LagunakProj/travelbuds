import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, MapPin, Palmtree } from "lucide-react";

export default function Landing() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
			<main className="flex-1">
				<section
					className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center"
					style={{
						backgroundImage:
							"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/placeholder.svg?height=600&width=1200)",
					}}
				>
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-8xl/none">
									TravelBuds
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
									Discover Your Next Adventure
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2 text-center ">
								<form className="flex space-x-2 items-center justify-center">
									<Button
										type="submit"
										className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
									>
										Start Planning Your Trip
									</Button>
								</form>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
					<div className="container px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-pink-300">
							Featured Destinations
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
							{["Bali", "Paris", "New York"].map(
								(destination) => (
									<div
										key={destination}
										className="relative group overflow-hidden rounded-lg"
									>
										<Image
											src={`/Paris.jpg`}
											alt={destination}
											width={600}
											height={400}
											className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<h3 className="text-white text-2xl font-bold">
												{destination}
											</h3>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 items-center">
							<div className="flex flex-col justify-center space-y-4 text-center">
								<div className="space-y-2">
									<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-300">
										Why Choose TravelBuds?
									</h2>
									<p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
										We make your travel dreams a reality
										with our expert services and
										unforgettable experiences.
									</p>
								</div>
							</div>
							<div className="grid sm:grid-cols-3 gap-8">
								{[
									{
										icon: Compass,
										title: "Expert Guidance",
										description:
											"Our experienced team helps you plan the perfect trip.",
									},
									{
										icon: MapPin,
										title: "Unique Destinations",
										description:
											"Discover hidden gems and popular hotspots alike.",
									},
									{
										icon: Palmtree,
										title: "Unforgettable Experiences",
										description:
											"Create memories that will last a lifetime.",
									},
								].map((feature, index) => (
									<div
										key={index}
										className="flex flex-col items-center space-y-2 border border-gray-800 p-6 rounded-lg bg-gray-800"
									>
										<feature.icon className="h-12 w-12 mb-2 text-pink-300" />
										<h3 className="text-xl font-bold text-pink-300">
											{feature.title}
										</h3>
										<p className="text-gray-400 text-center">
											{feature.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-300">
									Ready to Start Your Journey?
								</h2>
								<p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Sign up for our newsletter and get exclusive
									travel deals and inspiration.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<form className="flex flex-col sm:flex-row gap-2">
									<Input
										placeholder="Enter your email"
										type="email"
										className="bg-gray-700 border-gray-600 text-white"
									/>
									<Button
										type="submit"
										className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-medium"
									>
										Subscribe
									</Button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
				<p className="text-xs text-gray-400">
					© {new Date().getFullYear()} TravelBuds. All rights
					reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-xs hover:text-pink-300 transition-colors"
						href="#"
					>
						Terms of Service
					</Link>
					<Link
						className="text-xs hover:text-pink-300 transition-colors"
						href="#"
					>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
