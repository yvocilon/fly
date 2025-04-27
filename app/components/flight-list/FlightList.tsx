import FlightCard from "~/components/flight-card/FlightCard";
import SkeletonLoader from "~/components/skeleton-loader/SkeletonLoader";
import type { Flight } from "~/types";

type Props = {
	isLoading: boolean;
	flights: Flight[];
	search?: string;
};

export default function FlightList({ isLoading, flights, search }: Props) {
	if (isLoading) {
		return <SkeletonLoader />;
	}

	if ((search?.length || 0) < 3) {
		return (
			<p className="text-gray-500 text-sm mt-4">
				Enter at least 3 characters to search for a destination
			</p>
		);
	}

	if (flights.length === 0) {
		return (
			<p className="text-gray-500 text-sm mt-4">
				No flights found {search && `for ${search}`}
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-4 my-6">
			{flights.map((flight) => (
				<FlightCard key={flight.flightIdentifier} {...flight} />
			))}
		</div>
	);
}
