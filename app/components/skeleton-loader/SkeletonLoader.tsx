type Props = {
	rows?: number;
};

export default function SkeletonLoader({ rows = 5 }: Props) {
	return (
		<div className="flex flex-col gap-4 my-6" data-testid="skeleton-loader">
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
