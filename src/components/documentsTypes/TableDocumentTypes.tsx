"use client";

import { DocumentType } from "@/types/DocumentType";
import {
    TableDocumentTypeItem,
    TableDocumentTypePlaceholder,
} from "./TableDocumentTypeItem";
type Props = {
    documentsTypes: DocumentType[];
    loading: boolean;
    refreshAction: () => void;
    openModal: (document: DocumentType) => void;
};

export const TableDocumentType = ({
    documentsTypes,
    loading,
    refreshAction,
    openModal,
}: Props) => {
    return (
        <div className="pb-4 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-2xl">
            <table className="w-full">
                <thead>
                    <tr className="text-center border-b border-gray-300 dark:border-gray-600 text-gray-400 dark:text-slate-200">
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Nome
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Titulo
                        </th>
                        <th className="font-medium py-2 border-r border-gray-300 dark:border-gray-600">
                            Validade
                        </th>
                        <th className="font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <>
                            <TableDocumentTypePlaceholder />
                            <TableDocumentTypePlaceholder />
                            <TableDocumentTypePlaceholder />
                            <TableDocumentTypePlaceholder />
                            <TableDocumentTypePlaceholder />
                            <TableDocumentTypePlaceholder />
                        </>
                    )}
                    {!loading &&
                        documentsTypes.length > 0 &&
                        documentsTypes.map((item) => (
                            <TableDocumentTypeItem
                                documentType={item}
                                key={item.id}
                                refreshAction={refreshAction}
                                onEdit={openModal}
                            />
                        ))}
                </tbody>
            </table>
            {!loading && documentsTypes.length <= 0 && loading === false && (
                <div className="pt-3 text-center">
                    Nenhum tipo de documento para exibir! 👻
                </div>
            )}
        </div>
    );
};
