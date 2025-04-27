import { useState } from "react";
import type { SortOrder } from "~/types";

type Props = {
	initialOrder?: SortOrder;
};

export default function SortDate({ initialOrder }: Props) {
	const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder || "asc");

	return (
		<div className="w-full md:w-auto flex items-center">
			<label
				htmlFor="sort-order"
				className="text-sm font-medium px-4 py-2 bg-gray-50 border border-gray-300 rounded-l-md text-gray-700 border-r-0 flex items-center h-10"
			>
				Order by
			</label>
			<select
				id="sort-order"
				name="sortOrder"
				value={sortOrder}
				onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
				className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-schiphol-blue h-10 appearance-none flex items-center"
				aria-label="Sort by departure date"
			>
				<option value="asc">Departure date ↑</option>
				<option value="desc">Departure date ↓</option>
			</select>
		</div>
	);
}
