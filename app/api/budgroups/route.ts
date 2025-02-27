import { NextResponse } from "next/server"

export async function GET() {
	return NextResponse.json({
		budgroups: [
			{
				id: 1,
				name: "Bombok",
				startDate: "2022-01-01",
				endDate: "2022-01-15",
				people: 2,
				destination: "Bali",
			},
			{
				id: 2,
				name: "Hihihi",
				startDate: "2024-01-01",
				endDate: "2025-01-15",
				people: 6,
				destination: "Hawaii",
			},
			{
				id: 3,
				name: "Timbakak",
				startDate: "2025-01-01",
				endDate: "2025-02-15",
				people: 4,
				destination: "Japan",
			},
		],
	})
}
