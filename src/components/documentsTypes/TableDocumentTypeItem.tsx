import Formatter from "@/utils/formatter";
import { LuFileEdit } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { DocumentType } from "@/types/DocumentType";
import { deleteDocumentType } from "@/api/documentsTypes";
import { addAlert } from "@/utils/addAlert";

type Props = {
    documentType: DocumentType;
    refreshAction: () => void;
    onEdit: (document: DocumentType) => void;
};

export const TableDocumentTypeItem = ({
    documentType,
    refreshAction,
    onEdit: openModal,
}: Props) => {
    const handleDeleteDocumentType = async () => {
        if (confirm("Deseja realmente deletar este documeto?")) {
            const result = await deleteDocumentType(documentType.id);
            if (typeof result === "string") {
                addAlert("error", result);
            } else {
                addAlert("success", "Excluido com sucesso!");
                refreshAction();
            }
        }
    };

    return (
        <tr className="text-center border-b border-gray-300 dark:border-gray-600 cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-700">
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {documentType.name}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {documentType.title}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {documentType.expires && (
                    <>{Formatter.zero(documentType.validity)} dias</>
                )}
                {!documentType.expires && <>Sem validade</>}
            </td>
            <td className="py-2">
                <div className="flex justify-center items-end gap-4">
                    <div
                        className="p-1 rounded-lg text-lg border transition-all border-gray-300 dark:border-gray-600 hover:bg-gray-800 dark:hover:bg-gray-600 hover:text-white"
                        onClick={() => openModal(documentType)}
                    >
                        <LuFileEdit />
                    </div>

                    <div
                        className="p-1 rounded-lg text-lg border transition-all border-gray-300 dark:border-gray-600 hover:bg-gray-800 dark:hover:bg-gray-600 hover:text-white"
                        onClick={handleDeleteDocumentType}
                    >
                        <LuTrash2 />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export const TableDocumentTypePlaceholder = () => {
    return (
        <tr className="text-center border-b border-gray-300 dark:border-gray-600 h-10 ">
            <td className="py-3 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    nome de certidão de exemplo
                </div>
            </td>
            <td className="py-3 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    title de certidão de exemplo
                </div>
            </td>
            <td className="py-3 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    90 dias
                </div>
            </td>
            <td className="py-3">
                <div className="flex justify-evenly items-end">
                    <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                        xx
                    </div>

                    <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                        xx
                    </div>
                </div>
            </td>
        </tr>
    );
};
