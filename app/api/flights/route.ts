import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const fromEntityId = searchParams.get("fromEntityId")
	const type = searchParams.get("type")
	const year = searchParams.get("year")
	const month = searchParams.get("month")

	const currency = searchParams.get("currency")
	const locale = searchParams.get("locale")
	const adults = searchParams.get("adults")

	const url = `https://sky-scanner3.p.rapidapi.com/flights/search-everywhere?fromEntityId=${fromEntityId}&type=${type}&year=${year}&month=${month}&currency=${currency}&locale=${locale}&adults=${adults}`

	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
			"x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
		},
	}
	try {
		const response = await fetch(url, options)
		const result = await response.text()
		console.log(result)
		return NextResponse.json(result)
	} catch (error) {
		console.error(error)
	}
}
