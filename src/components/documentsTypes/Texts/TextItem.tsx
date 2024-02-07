import { LuFileEdit } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { deleteText } from "@/api/texts";
import { addAlert } from "@/utils/addAlert";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { ItemButton } from "../../ItemButton";

type Props = {
    text: DocumentTypeText;
    refreshAction: () => void;
    onEdit: (text: DocumentTypeText) => void;
};

export const TextItem = ({ text, refreshAction, onEdit }: Props) => {
    const handleDeleteText = async () => {
        if (confirm("Deseja realmente deletar este texto?")) {
            const result = await deleteText(text.id, text.documentTypeId);
            if (typeof result === "string") {
                addAlert("error", result);
            } else {
                addAlert("success", "Excluido com sucesso!");
                refreshAction();
            }
        }
    };

    return (
        <div className="border border-gray-300 rounded p-3 mb-3 flex items-center transition-all hover:bg-gray-200">
            <div className="flex-1">{text.name}</div>
            <div className="flex gap-6">
                <ItemButton
                    IconElement={LuFileEdit}
                    onClick={() => onEdit(text)}
                />
                <ItemButton IconElement={LuTrash2} onClick={handleDeleteText} />
            </div>
        </div>
    );
};

export const TextItemPlaceholder = () => {
    return (
        <div className="border border-gray-300 rounded p-3 mb-3 flex items-center transition-all hover:bg-gray-200">
            <div className="flex-1 ">
                <div className="h-6 w-3/4 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            </div>
            <div className="flex gap-6">
                <div className="h-6 w-10 rounded-lg px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>

                <div className="h-6 w-10 rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
};
