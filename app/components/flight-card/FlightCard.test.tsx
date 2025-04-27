import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import mockFlightsData from "../../../test/__mock__/flights.json";
import FlightCard from "./FlightCard";

const flights = mockFlightsData.flights?.slice(0, 5);
const flightsWithDateTime = flights?.map((flight) => ({
	...flight,
	expectedDateTime: new Date(`${flight.date}T${flight.expectedTime}`),
	originalDateTime: new Date(`${flight.date}T${flight.originalTime}`),
}));

describe("FlightCard", () => {
	test("renders", () => {
		render(<FlightCard {...flightsWithDateTime?.[0]} />);

		expect(
			screen.getByText(mockFlightsData.flights?.[0].airport),
		).toBeInTheDocument();
	});
	test("shows new time when expectedTime is different from originalTime", () => {
		render(<FlightCard {...flightsWithDateTime?.[0]} />);

		const originalTime = screen.getByText(
			mockFlightsData.flights?.[0].originalTime,
		);

		const expectedTime = screen.getByText(
			mockFlightsData.flights?.[0].expectedTime,
		);

		expect(originalTime).toBeInTheDocument();
		expect(expectedTime).toBeInTheDocument();
		expect(originalTime).toHaveClass("line-through");
		expect(expectedTime).not.toHaveClass("line-through");
	});
});
