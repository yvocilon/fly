import { useState } from "react";
import { Form, redirect, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import FlightCard from "~/components/flight-card/FlightCard";
import { getFlights } from "~/models/flights.server";
import { abortableTimeout } from "~/utils";
import type { Route } from "./+types/home";

const schema = z.object({
	search: z.string().optional(),
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
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">(order);

	const onFormChange = (event: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);

		submit(formData, {
			method: "get",
			replace: true,
		});
	};

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
				<input
					className="w-full md:flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-schiphol-blue"
					type="text"
					name="search"
					placeholder="Search destination"
					autoComplete="off"
					defaultValue={search || ""}
				/>

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

				<button
					type="submit"
					className="w-full md:w-auto bg-schiphol-blue text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-schiphol-blue/90 transition"
				>
					Search
				</button>
			</Form>

			{isLoading ? (
				// Show skeletons while submitting
				<div className="flex flex-col gap-4 my-6">
					{Array.from({ length: 5 }).map((_, idx) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={idx}
							className="h-[96px] bg-gray-200 rounded-md animate-pulse"
						/>
					))}
				</div>
			) : (search?.length || 0) < 3 ? (
				<p className="text-gray-500 text-sm mt-4">
					Enter at least 3 characters to search for a destination
				</p>
			) : flights.length > 0 ? (
				<div className="flex flex-col gap-4 my-6">
					{flights.map((flight) => (
						<FlightCard key={flight.flightIdentifier} {...flight} />
					))}
				</div>
			) : (
				<p className="text-gray-500 text-sm mt-4">
					No flights found {search && `for ${search}`}
				</p>
			)}
		</div>
	);
}
