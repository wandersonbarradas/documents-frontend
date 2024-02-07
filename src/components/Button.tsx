type Props = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
};

export const Button = ({ disabled, onClick, value }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full p-3 font-medium border rounded-lg transition-all outline-none border-black bg-black text-white hover:bg-white hover:text-black"
        >
            {value}
        </button>
    );
};
