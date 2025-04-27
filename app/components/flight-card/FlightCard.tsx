import type { Flight } from "~/types";
import FlightDate from "./FlightDate";

export default function FlightCard({
	flightNumber,
	airport,
	date,
	expectedTime,
	originalTime,
}: Flight) {
	return (
		<div
			data-testid="flight-card"
			className="border overflow-hidden border-schiphol-blue rounded-md p-4 flex flex-row items-stretch gap-6 bg-white shadow-sm h-[96px]"
		>
			<FlightDate
				date={date}
				expectedTime={expectedTime}
				originalTime={originalTime}
			/>
			<div className="flex flex-col justify-start">
				<div className="font-semibold text-lg text-schiphol-blue leading-tight break-words text-ellipsis overflow-hidden">
					{airport}
				</div>
				<div className="text-sm text-gray-800">{flightNumber}</div>
			</div>
		</div>
	);
}
