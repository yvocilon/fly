import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
	test("renders", () => {
		render(<SearchInput />);

		expect(
			screen.getByPlaceholderText("Search destination"),
		).toBeInTheDocument();
	});
});
