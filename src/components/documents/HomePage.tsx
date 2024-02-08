"use client";

import { ItemButton } from "../ItemButton";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { Document } from "@/types/Document";
import * as api from "@/api/documents";
import { useEffect, useState } from "react";
import { TableDocuments } from "../TableDocuments";
import { Modal } from "../Modal";
import { DocumentType } from "@/types/DocumentType";
import { getDocumentsTypes } from "@/api/documentsTypes";
import Link from "next/link";

export const HomePage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newDocumentModal, setNewDocumentModal] = useState(false);
    useEffect(() => {
        loadDocuments();
        loadingDocumentsTypes();
    }, []);

    const handleAddButton = () => {
        alert("TODO criar função de adicionar documento");
    };

    const loadDocuments = async () => {
        setLoading(true);
        const docs = await api.getDocuments();
        if (docs) {
        }
        setDocuments(docs);
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
            <div className="border border-gray-300 rounded-2xl">
                <div className="flex justify-end p-4 border-b border-gray-300">
                    <ItemButton
                        IconElement={LuPlus}
                        onClick={() => setNewDocumentModal(true)}
                        //href="/documents/novo"
                        label="Novo"
                        active
                    />
                </div>
                <div className="flex justify-end p-4 border-b border-gray-300 gap-4">
                    <ItemButton
                        IconElement={LuFilter}
                        onClick={handleAddButton}
                    />
                    <ItemButton
                        IconElement={LuArrowDownWideNarrow}
                        onClick={handleAddButton}
                    />
                </div>
                <TableDocuments documents={documents} loading={loading} />
            </div>
            {newDocumentModal && (
                <Modal onClose={() => setNewDocumentModal(false)}>
                    <div className="flex flex-col items-center gap-2">
                        {documentTypes.map((item) => (
                            <Link
                                href={`/documents/${item.id}/novo`}
                                className="w-full text-center px-6 py-2 rounded-md cursor-pointer transition-all border border-black hover:bg-black hover:text-white"
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
