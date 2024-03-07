"use client";

import { ItemButton } from "./ItemButton";
import { LuPlus } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { Document } from "@/types/Document";
import * as api from "@/api/documents";
import { useEffect, useState } from "react";
import { TableDocuments } from "./documents/TableDocuments";
import { Modal } from "./Modal";
import { DocumentType } from "@/types/DocumentType";
import { getDocumentsTypes } from "@/api/documentsTypes";
import Link from "next/link";
import { Pagination } from "./Pagination";
import { InputField } from "./InputField";
import Formatter from "@/utils/formatter";

export const HomePage = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newDocumentModal, setNewDocumentModal] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(1);

    const [ownerField, setOwnerField] = useState("");
    const [numberField, setNumberField] = useState("");
    const [cpfCnpjField, setCpfCnpjField] = useState("");
    const [addressField, setAddressField] = useState("");
    const [documentType, setDocumentType] = useState<string>("");
    const [initialDateField, setInitialDateField] = useState("");
    const [finalDateField, setFinalDateField] = useState("");

    const optionsPageSize = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    useEffect(() => {
        loadDocuments();
        loadingDocumentsTypes();
    }, []);

    useEffect(() => {
        loadDocuments();
    }, [page, pageSize, itemsCount]);

    const handlePageChange = (number: number) => {
        setPage(number);
    };

    const loadDocuments = async () => {
        setLoading(true);
        const filter: api.Filter = {
            page,
            pageSize,
            orderKey: "id",
            orderValue: "desc",
            owner: ownerField,
            address: addressField,
            cpf_cnpj: Formatter.cpfOrCnpj(cpfCnpjField),
            number: numberField,
            initialDate: initialDateField,
            finalDate: finalDateField,
            documentType: documentType,
        };
        const docs = await api.getDocuments(filter);
        setItemsCount(docs.totalCount);
        setDocuments(docs.documents);
        setLoading(false);
    };

    const loadingDocumentsTypes = async () => {
        const data = await getDocumentsTypes();
        setDocumentTypes(data);
    };

    const handleInitialDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value + "T00:00:00";
        setInitialDateField(value);
    };

    const handleFinalDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value + "T00:00:00";
        setFinalDateField(value);
    };

    return (
        <>
            <div className="flex justify-between items-end mb-2">
                <h1 className="text-xl font-medium ml-3 mb-3">
                    Lista de documentos
                </h1>
                <ItemButton
                    IconElement={LuPlus}
                    onClick={() => setNewDocumentModal(true)}
                    //href="/documents/novo"
                    label="Novo"
                    classNames={`text-white bg-green-400 hover:bg-green-600 px-3 py-1`}
                />
            </div>
            <div className="border border-gray-300 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-600">
                <div className="flex w-full p-4 pb-6 border-b gap-4 border-gray-300 dark:border-gray-600 items-end">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex w-full gap-4">
                            <div className="w-2/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="numero"
                                >
                                    Numero do documento
                                </label>
                                <InputField
                                    id="numero"
                                    disabled={loading}
                                    value={numberField}
                                    onChange={(e) =>
                                        setNumberField(e.target.value)
                                    }
                                    placeholder="Numero"
                                    type="text"
                                />
                            </div>
                            <div className="w-4/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="proprietario"
                                >
                                    Proprietario
                                </label>
                                <InputField
                                    id="proprietario"
                                    disabled={loading}
                                    value={ownerField}
                                    onChange={(e) =>
                                        setOwnerField(e.target.value)
                                    }
                                    placeholder="Proprietario"
                                    type="text"
                                />
                            </div>
                            <div className="w-2/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="cpf_cnpj"
                                >
                                    CPF/CNPJ
                                </label>
                                <InputField
                                    id="cpf_cnpj"
                                    disabled={loading}
                                    value={cpfCnpjField}
                                    onChange={(e) =>
                                        setCpfCnpjField(e.target.value)
                                    }
                                    placeholder="CPF/CNPJ"
                                    type="text"
                                />
                            </div>
                            <div className="w-4/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="address"
                                >
                                    Endereço
                                </label>
                                <InputField
                                    id="address"
                                    disabled={loading}
                                    value={addressField}
                                    onChange={(e) =>
                                        setAddressField(e.target.value)
                                    }
                                    placeholder="Endereço"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="w-3/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="documentType"
                                >
                                    Tipo de documento
                                </label>
                                <select
                                    disabled={loading}
                                    onChange={(e) =>
                                        setDocumentType(e.target.value)
                                    }
                                    value={documentType}
                                    className={`w-full h-[51px] bg-gray-50 dark:bg-gray-900 p-3 outline-none border border-gray-300 dark:border-gray-600 focus:border-green-400 rounded-lg disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed`}
                                >
                                    <option value="">Selecione</option>
                                    {documentTypes.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-2/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="initialDate"
                                >
                                    De
                                </label>
                                <InputField
                                    id="initialDate"
                                    disabled={loading}
                                    value={initialDateField.split("T")[0]}
                                    onChange={handleInitialDate}
                                    type="date"
                                />
                            </div>
                            <div className="w-2/12">
                                <label
                                    className="block mb-1 pl-1"
                                    htmlFor="finalDate"
                                >
                                    Até
                                </label>
                                <InputField
                                    id="finalDate"
                                    disabled={loading}
                                    value={finalDateField.split("T")[0]}
                                    onChange={handleFinalDate}
                                    type="date"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <ItemButton
                            IconElement={LuSearch}
                            onClick={loadDocuments}
                            label="Pesquisar"
                            classNames={`text-white bg-gray-500 hover:bg-gray-700 px-3 py-1`}
                        />
                    </div>
                </div>
                <TableDocuments
                    documents={documents}
                    loading={loading}
                    refreshAction={loadDocuments}
                />
                <div className="p-3 flex items-center justify-between">
                    <div className="">
                        <select
                            onChange={(e) =>
                                setPageSize(parseInt(e.target.value))
                            }
                            value={pageSize}
                            className="bg-gray-200 dark:bg-gray-700 p-1 outline-none border rounded-lg disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {optionsPageSize.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    Total: {itemsCount} - Mostrando {pageSize} por página
                    {documents.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(itemsCount / pageSize)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            {newDocumentModal && (
                <Modal onClose={() => setNewDocumentModal(false)}>
                    <div className="flex flex-col items-center gap-2">
                        {documentTypes.map((item) => (
                            <Link
                                key={item.id}
                                href={`/documentos/${item.id}/novo`}
                                className="w-full text-center px-6 py-2 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-green-400 hover:text-white dark:border-gray-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
};
