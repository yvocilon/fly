import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
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
		const mockData = require("../../__mock__/flights.json");

		render(
			<FlightList
				isLoading={false}
				search="london"
				flights={mockData.flights?.slice(0, 5)}
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
