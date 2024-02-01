"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
    IconElement: IconType;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    active?: boolean;
};

export const ItemButton = ({
    IconElement,
    label,
    onClick,
    href,
    target,
    active,
}: Props) => {
    const content = (
        <div className="font-medium p-2 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div>
                <IconElement />
            </div>
            {label && <div>{label}</div>}
        </div>
    );
    return (
        <div
            className={`border border-black rounded-lg transition-all ${
                active
                    ? "text-white bg-black hover:bg-white hover:text-black"
                    : "text-black bg-white hover:bg-black hover:text-white"
            }`}
        >
            {href && !onClick && (
                <Link href={href} target={target}>
                    {content}
                </Link>
            )}
            {!href && onClick && (
                <div onClick={onClick} className="cursor-pointer">
                    {content}
                </div>
            )}
        </div>
    );
};
