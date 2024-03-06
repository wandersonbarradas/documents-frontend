import React, { useState } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        const totalPagesToShow = 5; // Quantidade total de páginas a serem mostradas

        let startPage = Math.max(
            1,
            currentPage - Math.floor(totalPagesToShow / 2),
        );
        let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

        if (endPage - startPage + 1 < totalPagesToShow) {
            startPage = Math.max(1, endPage - totalPagesToShow + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push("...");
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav>
            <ul className="flex">
                {pageNumbers.map((number, index) => (
                    <li
                        key={index}
                        className={number === currentPage ? "active" : ""}
                    >
                        {number === "..." ? (
                            <span className="block px-2 min-h-7 text-xs border border-gray-300">
                                ...
                            </span>
                        ) : (
                            <button
                                className={`block px-2 min-h-7 text-xs border border-gray-300 ${
                                    number === currentPage ? "bg-gray-900" : ""
                                } `}
                                onClick={() => onPageChange(number as number)}
                            >
                                {number}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
