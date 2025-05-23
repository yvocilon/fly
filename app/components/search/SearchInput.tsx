type Props = {
	search?: string;
};

export default function SearchInput({ search }: Props) {
	return (
		<input
			className="w-full md:flex-1 border border- rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-schiphol-blue"
			type="text"
			name="search"
			role="searchbox"
			placeholder="Search destination"
			autoComplete="off"
			defaultValue={search || ""}
		/>
	);
}
