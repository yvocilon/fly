import { useCallback } from "react";
import { Form, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import FlightList from "~/components/flight-list/FlightList";
import SearchButton from "~/components/search/SearchButton";
import SearchInput from "~/components/search/SearchInput";
import SortDate from "~/components/sort-date/SortDate";
import { getFlights } from "~/models/flights.server";
import type { SortOption } from "~/types";
import { abortableTimeout } from "~/utils";
import type { Route } from "./+types/home";

const sortOptions: SortOption[] = [
	{ value: "asc", label: "Departure date ↑" },
	{ value: "desc", label: "Departure date ↓" },
];

const schema = z.object({
	search: z.string().trim().optional(),
	order: z
		.string()
		.pipe(z.enum(["asc", "desc"]).optional())
		.catch("asc"),
});

export function meta() {
	return [
		{ title: "Search and Find flights" },
		{ name: "description", content: "Search and Find flights" },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);

	const params = schema.parse(Object.fromEntries(url.searchParams));

	const search = params.search;

	const order = params.order || "asc";

	if ((search?.length || 0) < 3) {
		return {
			search,
			flights: [],
			order: params.order || "asc",
		};
	}

	const flights = await getFlights({ order, limit: 5, search });

	return {
		search,
		flights,
		order,
	};
}

export async function clientLoader({
	request,
	serverLoader,
}: Route.ClientLoaderArgs) {
	await abortableTimeout(300, request.signal);

	return await serverLoader();
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { search, flights, order } = loaderData;
	const submit = useSubmit();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	const onFormChange = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			const formData = new FormData(event.currentTarget);

			submit(formData, {
				method: "get",
				replace: true,
			});
		},
		[submit],
	);

	return (
		<div className="max-w-3xl mx-auto px-4 py-6">
			<h1 className="text-md py-4">
				All departing flights to
				<span className="text-schiphol-blue leading-tight font-bold text-3xl  block">
					All destinations
				</span>
			</h1>

			<Form
				onChange={onFormChange}
				className="flex flex-col md:flex-row items-center gap-2 border border-schiphol-blue rounded-md p-2 shadow-sm bg-white"
			>
				<SearchInput search={search} />

				<SortDate initialOrder={order} options={sortOptions} />

				<SearchButton />
			</Form>

			<FlightList isLoading={isLoading} flights={flights} search={search} />
		</div>
	);
}
