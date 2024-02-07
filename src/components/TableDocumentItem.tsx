import { Document } from "@/types/Document";
import Formatter from "@/utils/formatter";
import { LuMoreHorizontal } from "react-icons/lu";
import { useRouter } from "next/navigation";
type Props = {
    document: Document;
};

export const TableDocumentItem = ({ document }: Props) => {
    const router = useRouter();
    const handleClickItem = () => {
        router.push(`/documents/${document.id}`);
    };
    return (
        <tr
            className="text-center border-b border-gray-300 font-medium cursor-pointer transition-all hover:bg-gray-200"
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
            <td className="py-2 border-r border-gray-300">
                {document.data.fields.nome}
            </td>
            <td className="py-2 border-r border-gray-300">
                {Formatter.cpfOrCnpj(document.data.fields["cpf/cnpj"])}
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
