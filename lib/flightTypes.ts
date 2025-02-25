export interface Root {
	data: Data;
	status: boolean;
	message: string;
}

export interface Data {
	everywhereDestination: EverywhereDestination;
	context: Context2;
}

export interface EverywhereDestination {
	context: Context;
	features: Features;
	buckets: Bucket[];
	results: Result[];
}

export interface Context {
	status: string;
	sessionId: string;
	totalResults: number;
}

export interface Features {
	flightsIndicative: string;
	images: string;
	ads: string;
}

export interface Bucket {
	id: string;
	label: string;
	category: string;
	resultIds: string[];
	flightQuotes: string;
	hotelQuotes: string;
}

export interface Result {
	id: string;
	type: string;
	content: Content;
	entityId: string;
	skyId: string;
}

export interface Content {
	location: Location;
	flightQuotes?: FlightQuotes;
	image: Image;
	flightRoutes: FlightRoutes;
}

export interface Location {
	id: string;
	skyCode: string;
	name: string;
	type: string;
}

export interface FlightQuotes {
	cheapest: Cheapest;
	direct?: Direct;
}

export interface Cheapest {
	price: string;
	rawPrice: number;
	direct: boolean;
}

export interface Direct {
	price: string;
	rawPrice: number;
	direct: boolean;
}

export interface Image {
	url: string;
}

export interface FlightRoutes {
	directFlightsAvailable: boolean;
}

export interface Context2 {
	status: string;
	sessionId: string;
	totalResults: number;
}
