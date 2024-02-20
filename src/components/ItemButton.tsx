"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
    IconElement: IconType;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    classNames: string;
    disabled?: boolean;
};

export const ItemButton = ({
    IconElement,
    label,
    onClick,
    href,
    target,
    classNames,
    disabled,
}: Props) => {
    const content = (
        <div className="font-medium p-2 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div>
                <IconElement />
            </div>
            {label && <div>{label}</div>}
        </div>
    );

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
            e.preventDefault();
        }
    };

    const handleBtnClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };
    return (
        <div className={`rounded-lg transition-all font-normal ${classNames}`}>
            {href && !onClick && (
                <Link href={href} target={target} onClick={handleLinkClick}>
                    {content}
                </Link>
            )}
            {!href && onClick && (
                <div onClick={handleBtnClick} className="cursor-pointer">
                    {content}
                </div>
            )}
        </div>
    );
};
