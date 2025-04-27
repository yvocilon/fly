import FlightCard from "~/components/flight-card/FlightCard";
import SkeletonLoader from "~/components/skeleton-loader/SkeletonLoader";
import type { Flight } from "~/types";
import EmptyState from "../empy-state/EmptyState";

type Props = {
	isLoading: boolean;
	flights: Flight[];
	search?: string;
};

export default function FlightList({ isLoading, flights, search }: Props) {
	if (isLoading) {
		return <SkeletonLoader search={search} />;
	}

	if ((search?.length || 0) < 3) {
		return (
			<EmptyState text="Enter at least 3 characters to search for a destination" />
		);
	}

	if (flights.length === 0) {
		return (
			<EmptyState
				text={`No flights found ${search ? `for '${search}'` : ""}`}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-4 my-6">
			{search && (
				<p className="text-gray-500 text-lg">
					Showing {flights.length} flights for '{search}'
				</p>
			)}
			{flights.map((flight) => (
				<FlightCard key={flight.flightIdentifier} {...flight} />
			))}
		</div>
	);
}
