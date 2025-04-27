type Props = {
	rows?: number;
	search?: string;
};

export default function SkeletonLoader({ rows = 5, search }: Props) {
	return (
		<div className="flex flex-col gap-4 my-6" data-testid="skeleton-loader">
			{search && (
				<p className="text-gray-500 text-lg bg-gray-200 rounded-md animate-pulse">
					<span className="invisible">
						Showing {rows} flights for '{search}'
					</span>
				</p>
			)}
			{Array.from({ length: rows }).map((_, idx) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={idx}
					className="h-[96px] bg-gray-200 rounded-md animate-pulse"
				/>
			))}
		</div>
	);
}
