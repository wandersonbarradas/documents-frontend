import { useState } from "react";
import { DocumentTypeTabInfo } from "./DocumentTypeTabInfo";
import { DocumentType } from "@/types/DocumentType";
import { DocumentTypeTabTexts } from "./Texts/DocumentTypeTabText";

type Props = {
    documentType: DocumentType;
    refreshAction: () => void;
};

type TabNames = "info" | "texts" | "fields";

export const EditDocumentType = ({ refreshAction, documentType }: Props) => {
    const [tab, setTab] = useState<TabNames>("info");
    return (
        <>
            <div className="flex text-center border-b border-black cursor-pointer rounded-bl-md rounded-br-md">
                <div
                    className={`flex-1 p-3 rounded-bl-md rounded-tl-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all ${
                        tab === "info" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                    onClick={() => setTab("info")}
                >
                    Informações
                </div>
                <div
                    className={`flex-1 p-3 rounded-br-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all ${
                        tab === "texts" ? "bg-gray-200 dark:bg-gray-700" : ""
                    }`}
                    onClick={() => setTab("texts")}
                >
                    Textos
                </div>
            </div>
            {tab === "info" && (
                <DocumentTypeTabInfo
                    documentType={documentType}
                    refreshAction={refreshAction}
                />
            )}
            {tab === "texts" && (
                <DocumentTypeTabTexts documentTypeId={documentType.id} />
            )}
        </>
    );
};
