import { LuFileEdit } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { deleteField } from "@/api/fields";
import { addAlert } from "@/utils/addAlert";
import { ItemButton } from "../../ItemButton";
import { DocumentTypeField } from "@/types/DocumentTypeField";

type Props = {
    field: DocumentTypeField;
    refreshAction: () => void;
    onEdit: (field: DocumentTypeField) => void;
};

export const FieldItem = ({ field, refreshAction, onEdit }: Props) => {
    const handleDeleteField = async () => {
        if (confirm("Deseja realmente deletar este campo?")) {
            const result = await deleteField(
                field.id,
                field.documentTypeId,
                field.documentTypeTextId,
            );
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
            <div className="flex-1">
                {field.name} - {field.identifier}
            </div>
            <div className="flex gap-6">
                <ItemButton
                    IconElement={LuFileEdit}
                    onClick={() => onEdit(field)}
                />
                <ItemButton
                    IconElement={LuTrash2}
                    onClick={handleDeleteField}
                />
            </div>
        </div>
    );
};

export const FieldItemPlaceholder = () => {
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
