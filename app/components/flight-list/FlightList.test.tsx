import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import mockFlightsData from "../../../test/__mock__/flights.json";
import FlightList from "./FlightList";

describe("FlightList", () => {
	test("renders", () => {
		render(<FlightList isLoading={false} flights={[]} />);

		expect(
			screen.getByText(
				"Enter at least 3 characters to search for a destination",
			),
		).toBeInTheDocument();
	});
	test("shows 'enter at least 3 characters' when search is less than 3 characters", () => {
		render(<FlightList isLoading={false} search="lo" flights={[]} />);

		expect(
			screen.getByText(
				"Enter at least 3 characters to search for a destination",
			),
		).toBeInTheDocument();
	});
	test("shows 'no flights found' when search is more than 3 characters and no flights are found", () => {
		render(<FlightList isLoading={false} search="london" flights={[]} />);

		expect(screen.getByText("No flights found for london")).toBeInTheDocument();
	});

	test("show flight cards when flights are found", async () => {
		const flights = mockFlightsData.flights?.slice(0, 5);
		const flightsWithDateTime = flights?.map((flight) => ({
			...flight,
			expectedDateTime: new Date(`${flight.date}T${flight.expectedTime}`),
			originalDateTime: new Date(`${flight.date}T${flight.originalTime}`),
		}));

		render(
			<FlightList
				isLoading={false}
				search="london"
				flights={flightsWithDateTime}
			/>,
		);

		const results = await screen.findAllByTestId("flight-card");

		expect(results).toHaveLength(5);
	});

	test("show skeleton loader when loading", () => {
		render(<FlightList isLoading={true} flights={[]} />);

		expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
	});
});
