"use client";

import { Document } from "@/types/Document";
import {
    TableDocumentItem,
    TableDocumentPlaceholder,
} from "./TableDocumentItem";
type Props = {
    documents: Document[];
    loading: boolean;
    refreshAction: () => void;
};

export const TableDocuments = ({
    documents,
    loading,
    refreshAction,
}: Props) => {
    return (
        <div className="rounded-br-2xl rounded-bl-2xl bg-white dark:bg-gray-800">
            <table className="w-full">
                <thead>
                    <tr className="text-center border-b text-gray-400 border-gray-300 dark:border-gray-600">
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Numero
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Data
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Tipo
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Nome
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            CPF/CNPJ
                        </th>
                        <th className="font-medium">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <>
                            <TableDocumentPlaceholder />
                            <TableDocumentPlaceholder />
                            <TableDocumentPlaceholder />
                            <TableDocumentPlaceholder />
                            <TableDocumentPlaceholder />
                            <TableDocumentPlaceholder />
                        </>
                    )}
                    {!loading &&
                        documents?.length > 0 &&
                        documents.map((item) => (
                            <TableDocumentItem
                                document={item}
                                key={item.id}
                                refreshAction={refreshAction}
                            />
                        ))}
                </tbody>
            </table>
            {!loading && documents?.length <= 0 && loading === false && (
                <div className="pt-3 text-center">
                    Nenhum documento para exibir! 👻
                </div>
            )}
        </div>
    );
};
