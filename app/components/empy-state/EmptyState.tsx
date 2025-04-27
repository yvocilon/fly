type Props = {
	text: string;
};

export default function EmptyState({ text }: Props) {
	return <p className="text-gray-500 text-lg mt-4">{text}</p>;
}
