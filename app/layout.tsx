import { ThemeSwitcher } from "@/components/theme-switcher"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import "./globals.css"
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs"

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000"

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "TravelBuds",
	description: "Discover your next adventure with TravelBuds.",
}

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en" className={geistSans.className} suppressHydrationWarning>
				<body className="bg-background text-foreground">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<header className="px-4 lg:px-6 h-14 flex items-center align-center w-full border-b">
							<Link className="flex items-center justify-center" href="#">
								<Image src="/icon.webp" alt="TravelBuds" width={30} height={30} />
								<span className="font-bold">TravelBuds</span>
							</Link>
							<nav className="ml-auto flex gap-6 mr-4">
								<Link
									className="text-sm font-medium hover:underline underline-offset-4"
									href="/budgroups"
								>
									My BudGroups
								</Link>
								<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
									About Us
								</Link>
							</nav>
							<SignedOut>
								<SignInButton />
								<SignUpButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</header>
						<main className="min-h-screen flex flex-col items-center">
							<div className="flex-1 w-full flex flex-col gap-20 items-center">
								<div className="flex flex-col gap-20 w-full ">{children}</div>
							</div>
						</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
