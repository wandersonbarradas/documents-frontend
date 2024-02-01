"use client";

import { ItemButton } from "./ItemButton";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { Document } from "@/types/Document";
import * as api from "@/api/api";
import { useEffect, useState } from "react";
import { TableDocuments } from "./TableDocuments";

export const HomePage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadDocuments();
    }, []);

    const handleAddButton = () => {
        alert("TODO criar função de adicionar documento");
    };

    const loadDocuments = async () => {
        setLoading(true);
        const docs = await api.getDocuments();
        setDocuments(docs);
        setLoading(false);
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
                        onClick={handleAddButton}
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
        </>
    );
};
