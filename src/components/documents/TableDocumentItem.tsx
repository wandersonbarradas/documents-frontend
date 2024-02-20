import { Document } from "@/types/Document";
import Formatter from "@/utils/formatter";
import { LuMoreHorizontal } from "react-icons/lu";
import { LuPrinter } from "react-icons/lu";
import { LuFileEdit } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as api from "@/api/documents";
import { addAlert } from "@/utils/addAlert";
type Props = {
    document: Document;
    refreshAction: () => void;
};

export const TableDocumentItem = ({ document, refreshAction }: Props) => {
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const regexName =
            /(?:sra|sr|firma|empresa|associação|espólio do sr|espólio da sra|espólio de)\.?(?:<strong>)?([^,]+)/i;

        const matchName = regexName.exec(document.text);
        if (matchName && matchName[1]) {
            let nome = matchName[1];
            nome = nome.replace(/\*/g, "");
            setName(nome);
        }
        const regexCpfCnpj = /(?:CPF|CNPJ|CPF\/CNPJ)\:?\s(.*?),/i;
        const matchCpfCnpj = regexCpfCnpj.exec(document.text);
        if (matchCpfCnpj && matchCpfCnpj[1]) {
            const cpfCnpj = matchCpfCnpj[1];
            setCpfCnpj(cpfCnpj);
        }
    }, []);

    const handleClickItem = () => {
        router.push(`/documentos/${document.document_type_id}/${document.id}`);
        router.refresh();
    };

    const handleDelete = async () => {
        const result = await api.deleteDocument(document.id);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Documento excluido com sucesso!");
            refreshAction();
        }
    };

    const handleCopyDocument = () => {
        router.push(
            `/documentos/${document.document_type_id}/copia-${document.id}`,
        );
        router.refresh();
    };
    return (
        <tr
            className="text-center border-b border-gray-300 cursor-pointer transition-all hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            key={document.id}
            onDoubleClick={handleClickItem}
        >
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {document.number && Formatter.number(document.number)}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {Formatter.date(document.date)}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {document.document_type.name}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {name}
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                {Formatter.cpfOrCnpj(cpfCnpj)}
            </td>
            <td>
                <div className="flex justify-center items-end ">
                    <div
                        className="relative p-1 rounded-lg border border-gray-300 hover:bg-gray-400 dark:hover:bg-gray-900 hover:text-white dark:border-gray-600"
                        onMouseOver={() => setDropdown(true)}
                        onMouseOut={() => setDropdown(false)}
                    >
                        <LuMoreHorizontal />
                        {dropdown && (
                            <div
                                className="absolute right-4 bottom-3 z-10  bg-gray-300 dark:bg-gray-900 text-black dark:text-white border
                             border-gray-300 py-3 px-1 rounded-md dark:border-gray-600 "
                            >
                                <ul>
                                    <li
                                        className="flex justify-center items-center gap-2 px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={() => api.getPDF(document.id)}
                                    >
                                        Imprimir
                                        <LuPrinter />
                                    </li>
                                    <li
                                        className="flex justify-center items-center gap-2 px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={handleClickItem}
                                    >
                                        Alterar
                                        <LuFileEdit />
                                    </li>
                                    <li
                                        className="flex justify-center items-center gap-2 px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={handleCopyDocument}
                                    >
                                        Copiar
                                        <LuCopy />
                                    </li>
                                    <li
                                        className="flex justify-center items-center gap-2 px-6 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                                        onClick={handleDelete}
                                    >
                                        Excluir
                                        <LuTrash2 />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export const TableDocumentPlaceholder = () => {
    return (
        <tr className="text-center border-b border-gray-300 dark:border-gray-600 h-10 ">
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    nnn/yyyy
                </div>
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    dd/mm/yyyy
                </div>
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    type document
                </div>
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    name exemple lastname exemple
                </div>
            </td>
            <td className="py-2 border-r border-gray-300 dark:border-gray-600">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    xx.xxx.xxx/xxxx-xx
                </div>
            </td>
            <td>
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-pulse">
                    xx
                </div>
            </td>
        </tr>
    );
};
