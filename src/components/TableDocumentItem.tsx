import { Document } from "@/types/Document";
import Formatter from "@/utils/formatter";
import { LuMoreHorizontal } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Props = {
    document: Document;
};

export const TableDocumentItem = ({ document }: Props) => {
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const router = useRouter();

    useEffect(() => {
        const text =
            "A Prefeitura Municipal de Demerval Lobão – PI, Certifica para os devidos fins que se fizerem necessários que o Sra. fulana de tal, cpf: 999.999.999-99, possui um imóvel situado na Rua José Ribeiro, Nº 100, Bairro Centro, zona urbana deste município de Demerval Lobão – PI, CEP: 64.390-000. ";
        const regexName =
            /(?:Sr|Sr\(a\)|Sra|Firma|Empresa|Associação)\.?\s(.*?),/i; // Expressão regular para capturar o nome após "Sr(a)."
        // Expressão regular para capturar o nome após "Sr(a)."

        const matchName = regexName.exec(text);
        if (matchName && matchName[1]) {
            const nome = matchName[1];
            console.log("Nome:", nome);
        } else {
            console.log("Nome não encontrado.");
        }
        const regexCpfCnpj = /(?:CPF|CNPJ|CPF\/CNPJ)\:?\s(.*?),/i;
        const matchCpfCnpj = regexCpfCnpj.exec(text);
        if (matchCpfCnpj && matchCpfCnpj[1]) {
            const cpfCnpj = matchCpfCnpj[1];
            console.log("CPF/CNPJ:", cpfCnpj);
        } else {
            console.log("CPF/CNPJ não encontrado.");
        }
    }, []);

    useEffect(() => {
        const fieldName = document.fields.find((item) => {
            if (
                item.name.toLocaleLowerCase().includes("nome") ||
                item.name.toLocaleLowerCase().includes("proprietario") ||
                item.name.toLocaleLowerCase().includes("razão")
            ) {
                return item;
            }
        });
        if (fieldName) setName(fieldName?.value);
        const fieldCpfCnpj = document.fields.find((item) => {
            if (
                item.name.toLocaleLowerCase().includes("cpf") ||
                item.name.toLocaleLowerCase().includes("cnpj")
            ) {
                return item;
            }
        });
        if (fieldCpfCnpj) setCpfCnpj(fieldCpfCnpj.value);
    }, []);

    const handleClickItem = () => {
        router.push(`/documents/${document.id}`);
    };
    return (
        <tr
            className="text-center border-b border-gray-300 cursor-pointer transition-all hover:bg-gray-200"
            key={document.id}
            onDoubleClick={handleClickItem}
        >
            <td className="py-2 border-r border-gray-300">{document.number}</td>
            <td className="py-2 border-r border-gray-300">
                {Formatter.date(document.date)}
            </td>
            <td className="py-2 border-r border-gray-300">
                {document.documentType.name}
            </td>
            <td className="py-2 border-r border-gray-300">{name}</td>
            <td className="py-2 border-r border-gray-300">
                {Formatter.cpfOrCnpj(cpfCnpj)}
            </td>
            <td>
                <div className="flex justify-center items-end">
                    <div className="p-1 rounded-lg border border-gray-300">
                        <LuMoreHorizontal />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export const TableDocumentPlaceholder = () => {
    return (
        <tr className="text-center border-b border-gray-300 h-10 ">
            <td className="py-2 border-r border-gray-300">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    nnn/yyyy
                </div>
            </td>
            <td className="py-2 border-r border-gray-300">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    dd/mm/yyyy
                </div>
            </td>
            <td className="py-2 border-r border-gray-300">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    type document
                </div>
            </td>
            <td className="py-2 border-r border-gray-300">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    name exemple lastname exemple
                </div>
            </td>
            <td className="py-2 border-r border-gray-300">
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    xx.xxx.xxx/xxxx-xx
                </div>
            </td>
            <td>
                <div className="text-transparent rounded-lg inline px-4 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
                    xx
                </div>
            </td>
        </tr>
    );
};
