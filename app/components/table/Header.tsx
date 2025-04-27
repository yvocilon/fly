import { Link } from "react-router";
import type { SortField } from "~/routes/home/home";

type Props = {
	title: string;
	order: "asc" | "desc";
	field: SortField;
	activeSortField: SortField;
};

export default function Header({
	title,
	activeSortField,
	order,
	field,
}: Props) {
	return (
		<th>
			<Link
				to={`?sort=${field}&order=${activeSortField === field ? (order === "asc" ? "desc" : "asc") : "asc"}`}
			>
				{title}
				{activeSortField === field ? (order === "asc" ? "↑" : "↓") : ""}
			</Link>
		</th>
	);
}
