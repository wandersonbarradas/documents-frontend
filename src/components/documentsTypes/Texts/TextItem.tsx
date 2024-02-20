import { LuFileEdit } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { deleteText } from "@/api/texts";
import { addAlert } from "@/utils/addAlert";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { ItemButton } from "../../ItemButton";
import { useState } from "react";
import { ModalDelete } from "@/components/ModalDelete";

type Props = {
    text: DocumentTypeText;
    refreshAction: () => void;
    onEdit: (text: DocumentTypeText) => void;
};

export const TextItem = ({ text, refreshAction, onEdit }: Props) => {
    const [modalDelete, setModalDelete] = useState(false);
    const handleDeleteText = async () => {
        setModalDelete(false);
        const result = await deleteText(text.id, text.document_type_id);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Excluido com sucesso!");
            refreshAction();
        }
    };

    return (
        <>
            <div className="border border-gray-300 dark:border-gray-600 rounded p-3 mb-3 flex items-center transition-all hover:bg-gray-200 dark:hover:bg-gray-700">
                <div className="flex-1">{text.name}</div>
                <div className="flex gap-6">
                    <ItemButton
                        IconElement={LuFileEdit}
                        onClick={() => onEdit(text)}
                        classNames="border border-gray-200 dark:border-gray-600 hover:bg-gray-600 dark:hover:bg-gray-600 hover:text-white"
                    />
                    <ItemButton
                        IconElement={LuTrash2}
                        onClick={() => setModalDelete(true)}
                        classNames="border border-gray-200 dark:border-gray-600 hover:bg-gray-600 dark:hover:bg-gray-600 hover:text-white"
                    />
                </div>
            </div>
            {modalDelete && (
                <ModalDelete
                    onClose={() => setModalDelete(false)}
                    onDelete={handleDeleteText}
                />
            )}
        </>
    );
};

export const TextItemPlaceholder = () => {
    return (
        <div className="border border-gray-300 rounded p-3 mb-3 flex items-center">
            <div className="flex-1 ">
                <div className="h-6 w-3/4 rounded bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse"></div>
            </div>
            <div className="flex gap-6">
                <div className="h-6 w-10 rounded-lg px-4 bg-gradient-to-r ffrom-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse"></div>

                <div className="h-6 w-10 rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse"></div>
            </div>
        </div>
    );
};
