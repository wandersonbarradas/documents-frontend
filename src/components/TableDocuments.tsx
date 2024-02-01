"use client";

import { Document } from "@/types/Document";
import { TableItem, TableItemPlaceholder } from "./TableItem";
type Props = {
    documents: Document[];
    loading: boolean;
};

export const TableDocuments = ({ documents, loading }: Props) => {
    const handleActionButton = () => {
        alert("TODO Adicionar ação");
    };

    return (
        <div className="pb-4">
            <table className="w-full">
                <thead>
                    <tr className="text-center border-b border-gray-300 text-slate-400">
                        <th className="font-medium py-2 border-r border-gray-300">
                            Numero
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300">
                            Data
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300">
                            Tipo
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300">
                            Nome
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300">
                            CPF/CNPJ
                        </th>
                        <th className="font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <>
                            <TableItemPlaceholder />
                            <TableItemPlaceholder />
                            <TableItemPlaceholder />
                            <TableItemPlaceholder />
                            <TableItemPlaceholder />
                            <TableItemPlaceholder />
                        </>
                    )}
                    {!loading &&
                        documents.length > 0 &&
                        documents.map((item) => (
                            <TableItem document={item} key={item.id} />
                        ))}
                </tbody>
            </table>
            {!loading && documents.length <= 0 && loading === false && (
                <div className="pt-3 text-center">
                    Nenhum documento para exibir! 👻
                </div>
            )}
        </div>
    );
};
