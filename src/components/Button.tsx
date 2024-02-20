type Props = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
    type: "add" | "cancel" | "delete";
};

export const Button = ({ disabled, onClick, value, type }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-3 font-medium rounded-lg transition-all outline-none ${
                type === "add"
                    ? "bg-green-400 hover:bg-green-600"
                    : type === "cancel"
                    ? "bg-gray-400 hover:bg-gray-500"
                    : "bg-red-400 hover:bg-red-600"
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {value}
        </button>
    );
};
