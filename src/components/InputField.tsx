"use client";

type Props = {
    type?: string;
    placeholder?: string;
    value?: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    errorMessage?: string;
    id?: string;
};

export const InputField = ({
    type,
    placeholder,
    value,
    onChange,
    onKeyDown,
    disabled,
    errorMessage,
    id,
}: Props) => {
    return (
        <div className="w-full">
            <input
                onKeyDown={onKeyDown}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id={id}
                className={`block w-full border p-3 bg-gray-50 dark:bg-gray-900 rounded-lg outline-none 
                placeholder:text-gray-500 disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed ${
                    errorMessage
                        ? "border-red-600"
                        : "border-gray-300 dark:border-gray-600 focus:border-green-400"
                }`}
            />
            {errorMessage && (
                <div className="text-sm text-red-600">{errorMessage}</div>
            )}
        </div>
    );
};
