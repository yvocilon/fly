import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import mockFlightsData from "~/__mock__/flights.json";
import FlightCard from "./FlightCard";

describe("FlightCard", () => {
	test("renders", () => {
		render(<FlightCard {...mockFlightsData.flights?.[0]} />);

		expect(
			screen.getByText(mockFlightsData.flights?.[0].airport),
		).toBeInTheDocument();
	});
	test("shows new time when expectedTime is different from originalTime", () => {
		render(<FlightCard {...mockFlightsData.flights?.[0]} />);

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
