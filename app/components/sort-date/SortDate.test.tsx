import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SortDate from "./SortDate";

describe("SortDate", () => {
	test("renders select and options", () => {
		render(<SortDate />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toBeInTheDocument();
	});

	test("renders with initial order", () => {
		render(<SortDate initialOrder="desc" />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toHaveValue("desc");
	});

	test("updates order when changed", () => {
		render(<SortDate initialOrder="desc" />);
		const select = screen.getByRole("combobox", {
			name: /sort by departure date/i,
		});
		expect(select).toHaveValue("desc");
		fireEvent.change(select, { target: { value: "asc" } });
		expect(select).toHaveValue("asc");
	});
});
