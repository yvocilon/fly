import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SortDate from "./SortDate";

describe("SortDate", () => {
	test("renders", () => {
		render(<SortDate />);

		expect(screen.getByText("Departure date ↑")).toBeInTheDocument();

		expect(screen.getByText("Departure date ↓")).toBeInTheDocument();
	});
	test("renders with initial order", () => {
		render(<SortDate initialOrder="desc" />);

		expect(screen.getByText("Departure date ↓")).toHaveClass(
			"bg-schiphol-blue",
		);
	});
	test("updates order when clicked", async () => {
		render(<SortDate initialOrder="desc" />);

		await act(async () => {
			screen.getByText("Departure date ↑").click();
		});

		await waitFor(() => {
			expect(screen.getByText("Departure date ↑")).toHaveClass(
				"bg-schiphol-blue",
			);
		});
	});
});
