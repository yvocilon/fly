export type { FlightWithDateTime as Flight } from "~/models/flights.server";

export type SortOrder = "asc" | "desc";

export type SortOption = {
	value: SortOrder;
	label: string;
};
