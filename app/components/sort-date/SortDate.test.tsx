import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import type { SortOption } from "~/types";
import SortDate from "./SortDate";

const sortOptions: SortOption[] = [
	{ value: "asc", label: "Departure date ↑" },
	{ value: "desc", label: "Departure date ↓" },
];

describe("SortDate", () => {
	test("renders select and options", () => {
		render(<SortDate options={sortOptions} />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toBeInTheDocument();
	});

	test("renders with initial order", () => {
		render(<SortDate options={sortOptions} initialOrder="desc" />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toHaveValue("desc");
	});

	test("updates order when changed", () => {
		render(<SortDate options={sortOptions} initialOrder="desc" />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toHaveValue("desc");
		fireEvent.change(select, { target: { value: "asc" } });
		expect(select).toHaveValue("asc");
	});
});
