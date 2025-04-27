type FlightDate = {
	date: string;
	expectedTime: string;
	originalTime: string;
};

export default function FlightDate({
	date,
	expectedTime,
	originalTime,
}: FlightDate) {
	const isSame = expectedTime === originalTime;

	return (
		<div className="flex flex-col justify-center gap-1 min-h-[64px]">
			<span className="text-xs text-gray-500">{date}</span>
			<span
				className={
					isSame
						? "text-base font-medium text-schiphol-blue"
						: "text-base font-medium text-schiphol-blue line-through"
				}
			>
				{originalTime}
			</span>
			<span
				className={`text-base font-semibold text-dark-red ${isSame ? "invisible" : ""}`}
			>
				{expectedTime}
			</span>
		</div>
	);
}
