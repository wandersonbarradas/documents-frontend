"use client";

import { ItemButton } from "@/components/ItemButton";
import { LuPlus } from "react-icons/lu";
import { TableDocumentType } from "@/components/documentsTypes/TableDocumentTypes";
import { useEffect, useState } from "react";
import { DocumentType } from "@/types/DocumentType";
import * as api from "@/api/documentsTypes";
import { Modal } from "../Modal";
import { AddDocumentType } from "./AddDocumentType";
import { ModalScreens } from "@/types/ModalScreen";
import { EditDocumentType } from "./EditDocumentType";

export const DocumentTypePage = () => {
    const [documentsTypes, setDocumentsTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showScreen, setModalScreen] = useState<ModalScreens>(null);
    const [selectedDocumentType, setSelectedDocumentType] =
        useState<DocumentType | null>(null);

    useEffect(() => {
        loadingDocumentsTypes();
    }, []);

    const loadingDocumentsTypes = async () => {
        setModalScreen(null);
        setSelectedDocumentType(null);
        setLoading(true);
        const data = await api.getDocumentsTypes();
        setLoading(false);
        setDocumentsTypes(data);
    };

    const editDocumentType = (document: DocumentType) => {
        setSelectedDocumentType(document);
        setModalScreen("edit");
    };

    return (
        <div className="px-3">
            <div className="flex gap-2 justify-between items-center mb-3">
                <h1 className="text-xl font-medium">Tipos de documentos</h1>
                <ItemButton
                    IconElement={LuPlus}
                    label="Novo"
                    active={true}
                    onClick={() => setModalScreen("add")}
                />
            </div>
            <TableDocumentType
                loading={loading}
                documentsTypes={documentsTypes}
                refreshAction={loadingDocumentsTypes}
                openModal={(document: DocumentType) =>
                    editDocumentType(document)
                }
            />

            {showScreen && (
                <Modal onClose={() => setModalScreen(null)}>
                    {showScreen === "add" && (
                        <AddDocumentType
                            refreshAction={loadingDocumentsTypes}
                        />
                    )}
                    {showScreen === "edit" && selectedDocumentType && (
                        <EditDocumentType
                            refreshAction={loadingDocumentsTypes}
                            documentType={selectedDocumentType}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};
