"use client";

import { ItemButton } from "./ItemButton";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { Document } from "@/types/Document";
import * as api from "@/api/documents";
import { useEffect, useState } from "react";
import { TableDocuments } from "./documents/TableDocuments";
import { Modal } from "./Modal";
import { DocumentType } from "@/types/DocumentType";
import { getDocumentsTypes } from "@/api/documentsTypes";
import Link from "next/link";
import { Pagination } from "./Pagination";
import { pages } from "next/dist/build/templates/app-page";

export const HomePage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newDocumentModal, setNewDocumentModal] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [page, setPage] = useState(1);
    const optionsPageSize = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    useEffect(() => {
        loadDocuments();
        loadingDocumentsTypes();
    }, []);

    useEffect(() => {
        loadDocuments();
    }, [page, pageSize]);

    const handleAddButton = () => {
        alert("TODO criar função de adicionar documento");
    };

    const handlePageChange = (number: number) => {
        setPage(number);
    };

    const loadDocuments = async () => {
        setLoading(true);
        const filter: api.Filter = {
            page,
            pageSize,
            orderKey: "id",
            orderValue: "asc",
            owner: "",
            address: "",
            cpf_cnpj: "",
        };
        const docs = await api.getDocuments(filter);
        setItemsCount(docs.totalCount);
        setDocuments(docs.documents);
        setLoading(false);
    };

    const loadingDocumentsTypes = async () => {
        const data = await getDocumentsTypes();
        setDocumentTypes(data);
    };
    return (
        <>
            <h1 className="text-xl font-medium ml-3 mb-3">
                Lista de documentos
            </h1>
            <div className="border border-gray-300 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-600">
                <div className="flex justify-end p-4 border-b border-gray-300 dark:border-gray-600">
                    <ItemButton
                        IconElement={LuPlus}
                        onClick={() => setNewDocumentModal(true)}
                        //href="/documents/novo"
                        label="Novo"
                        classNames={`text-white bg-green-400 hover:bg-green-600 px-3 py-1`}
                    />
                </div>
                <div className="flex justify-end p-4 border-b gap-4 border-gray-300 dark:border-gray-600 ">
                    <ItemButton
                        IconElement={LuFilter}
                        onClick={handleAddButton}
                        classNames={`text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700`}
                    />
                    <ItemButton
                        IconElement={LuArrowDownWideNarrow}
                        onClick={handleAddButton}
                        classNames={`text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700`}
                    />
                </div>
                <TableDocuments
                    documents={documents}
                    loading={loading}
                    refreshAction={loadDocuments}
                />
                <div className="p-3 flex items-center justify-between">
                    <div className="">
                        <select
                            onChange={(e) =>
                                setPageSize(parseInt(e.target.value))
                            }
                            value={pageSize}
                            className="bg-gray-50 dark:bg-gray-900 p-1 outline-none border rounded-lg disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {optionsPageSize.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    Total: {itemsCount} - Mostrando {pageSize} por página
                    {documents.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(itemsCount / pageSize)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            {newDocumentModal && (
                <Modal onClose={() => setNewDocumentModal(false)}>
                    <div className="flex flex-col items-center gap-2">
                        {documentTypes.map((item) => (
                            <Link
                                key={item.id}
                                href={`/documentos/${item.id}/novo`}
                                className="w-full text-center px-6 py-2 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-green-400 hover:text-white dark:border-gray-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
};
