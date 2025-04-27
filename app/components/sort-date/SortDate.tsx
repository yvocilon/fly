import { useState } from "react";

type Props = {
	initialOrder?: "asc" | "desc";
};

export default function SortDate({ initialOrder }: Props) {
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
		initialOrder || "asc",
	);

	return (
		<fieldset className="w-full md:w-auto flex items-center border border-gray-300 rounded-md overflow-hidden">
			<legend className="sr-only">Sort by departure date</legend>
			<div className="flex items-center">
				<span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 border-r border-gray-300">
					Sort by:
				</span>
				<div className="flex">
					<button
						type="submit"
						name="order"
						value="asc"
						onClick={() => setSortOrder("asc")}
						className={`px-3 py-2 text-sm font-medium ${
							sortOrder === "asc"
								? "bg-schiphol-blue text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
						aria-label="Sort by departure date ascending"
					>
						Departure date ↑
					</button>
					<button
						type="submit"
						name="order"
						value="desc"
						onClick={() => setSortOrder("desc")}
						className={`px-3 py-2 text-sm font-medium ${
							sortOrder === "desc"
								? "bg-schiphol-blue text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
						aria-label="Sort by departure date descending"
					>
						Departure date ↓
					</button>
				</div>
			</div>
		</fieldset>
	);
}
