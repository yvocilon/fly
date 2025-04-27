import { z } from "zod";
import type { SortOrder } from "~/types";

type GetFlightsProps = {
	order: SortOrder;
	limit: number;
	search?: string;
};

const flightSchema = z
	.object({
		flightIdentifier: z.string(),
		flightNumber: z.string(),
		airport: z.string(),
		date: z.string(),
		expectedTime: z.string(),
		originalTime: z.string(),
		url: z.string(),
		score: z.string(),
	})
	.transform((flight) => ({
		...flight,
		expectedDateTime: new Date(`${flight.date}T${flight.expectedTime}`),
		originalDateTime: new Date(`${flight.date}T${flight.originalTime}`),
	}));

const flightsSchema = z.object({
	flights: z.array(flightSchema),
});

type FlightWithDateTime = z.infer<typeof flightSchema>;

export async function getFlights({ order, limit, search }: GetFlightsProps) {
	try {
		const response = await fetch(`${process.env.BASE_URL}/flights.json`);
		const data = await response.json();

		const parsedData = flightsSchema.parse(data);

		const filteredFlights = parsedData.flights.filter((flight) =>
			flight.airport
				.toLowerCase()
				.includes(search?.toLowerCase()?.trim() || ""),
		);

		const sortedFlights = sortFlights(filteredFlights, order);

		return sortedFlights.slice(0, limit);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function sortFlights(flights: FlightWithDateTime[], order: SortOrder) {
	return flights.sort((a, b) => {
		const aTime = new Date(a.expectedDateTime).getTime();
		const bTime = new Date(b.expectedDateTime).getTime();

		return order === "asc" ? aTime - bTime : bTime - aTime;
	});
}
