"use client";

type Props = {
    placeholder?: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    errorMessage?: string;
    id?: string;
    heightFull?: boolean;
};

export const TextField = ({
    placeholder,
    value,
    onChange,
    disabled,
    errorMessage,
    id,
    heightFull,
}: Props) => {
    return (
        <div className="w-full">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id={id}
                className={`block w-full border bg-transparent dark:bg-gray-900 p-3 rounded-lg outline-none 
                placeholder:text-gray-300 ${
                    errorMessage
                        ? "border-red-600"
                        : "border-gray-300 dark:border-gray-600 focus:border-green-400"
                } ${heightFull ? " h-96" : ""}`}
            />
            {errorMessage && (
                <div className="text-sm text-red-600">{errorMessage}</div>
            )}
        </div>
    );
};
