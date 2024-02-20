"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { addAlert } from "@/utils/addAlert";
import { DocumentTypeFull } from "@/types/DocumentTypeFull";
import { Document } from "@/types/Document";
import * as api from "@/api/documents";
import { useRouter } from "next/navigation";
import { Editor } from "../Editor";
import { ItemButton } from "../ItemButton";
import { LuPrinter } from "react-icons/lu";
import { LuFileEdit } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { ModalDelete } from "../ModalDelete";
type Props = {
    documentType: DocumentTypeFull;
    document: Document;
};

export const UpdateDocument = ({ documentType, document }: Props) => {
    const [number, setNumber] = useState<string | undefined>(
        document?.number || undefined,
    );
    const [date, setDate] = useState<string>(document.date);
    const [selectedTextId, setSelectedTextId] = useState<number>(
        document.document_type_text_id,
    );
    const [text, setText] = useState(document.text);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectTextError, setSelectTextError] = useState("");
    const [shouldRender, setShouldRender] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setShouldRender(true);
    }, []);

    useEffect(() => {
        const err = errors.find(
            (item) => item.field === "selectedTextId",
        )?.message;
        if (err) {
            setSelectTextError(err);
        } else {
            setSelectTextError("");
        }
    }, [errors]);

    const documentSchema = z.object({
        date: z
            .string({ invalid_type_error: "Preencha a data" })
            .transform((str) => new Date(str)),
        selectedTextId: z.number().gt(0, "Selectione o texto"),
        text: z.string().min(1, "Texto não pode ser vazio"),
        number: document.document_type.has_number
            ? z.string().min(6, "Preencha o numero")
            : z.string().optional(),
    });

    const handleUpdateDocument = async () => {
        setErrors([]);
        const data = documentSchema.safeParse({
            text,
            selectedTextId,
            date,
            number,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setDisabled(true);
        const result = await api.updateDocument(document.id, {
            date: data.data.date,
            document_type_text_id: data.data.selectedTextId,
            text: data.data.text,
            number: data.data.number || undefined,
            updated_at: new Date(),
        });
        if (typeof result === "string") {
            addAlert("error", result);
            setDisabled(false);
        } else {
            addAlert("success", "Alterado com sucesso!");
        }
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value + "T00:00:00";
        setDate(value);
    };

    const handleSelectText = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTextId(parseInt(e.target.value));
        const textItem = documentType.texts.find(
            (item) => item.id === parseInt(e.target.value),
        );
        if (textItem) {
            setText(textItem.text);
        } else {
            setText("");
        }
    };

    const handlePrintDocument = async () => {
        const result = await api.getPDF(document.id);
        if (result) {
            addAlert("error", result);
        }
    };

    const handleEditDocument = () => {
        setDisabled(false);
    };

    const handleDeleteDocument = async () => {
        setModalDelete(false);
        const result = await api.deleteDocument(document.id);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Documento excluido com sucesso!");
            router.replace("/");
        }
    };

    const handleCopyDocument = () => {
        router.push(
            `/documentos/${document.document_type_id}/copia-${document.id}`,
        );
        router.refresh();
    };

    const handleCancel = () => {
        setDisabled(true);
        if (document.number) {
            setNumber(document.number);
        }
        setDate(document.date);
        setSelectedTextId(document.document_type_text_id);
        setText(document.text);
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto my-5">
                <div className="flex justify-end gap-4 mb-4">
                    <ItemButton
                        IconElement={LuPrinter}
                        label="Imprimir"
                        onClick={handlePrintDocument}
                        classNames={`bg-gray-500 text-white hover:bg-gray-700 ${
                            !disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!disabled}
                    />
                    <ItemButton
                        IconElement={LuFileEdit}
                        label="Alterar"
                        onClick={handleEditDocument}
                        classNames={`bg-sky-500 text-white hover:bg-sky-600 ${
                            !disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!disabled}
                    />
                    <ItemButton
                        IconElement={LuTrash2}
                        label="Excluir"
                        onClick={() => setModalDelete(true)}
                        classNames={`bg-red-400 text-white hover:bg-red-600 ${
                            !disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!disabled}
                    />
                    <ItemButton
                        IconElement={LuCopy}
                        label="Copiar"
                        onClick={handleCopyDocument}
                        classNames={`bg-green-400  text-white hover:bg-green-600 ${
                            !disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!disabled}
                    />
                </div>
                <h2 className="text-xl text-center mb-7">
                    {documentType.name}{" "}
                    {document.document_type.has_number && (
                        <>Nº {document.number}</>
                    )}
                </h2>
                <div className="mb-5 flex gap-4 items-center">
                    {document.document_type.has_number && (
                        <div className="w-1/5">
                            <label className="block mb-1 pl-1" htmlFor="number">
                                Numero
                            </label>
                            <InputField
                                id="number"
                                disabled={disabled}
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Digite o número do Documento"
                                type="text"
                                errorMessage={
                                    errors.find(
                                        (item) => item.field === "number",
                                    )?.message
                                }
                            />
                        </div>
                    )}
                    <div className="w-1/4">
                        <label className="block mb-1 pl-1" htmlFor="date">
                            Data
                        </label>
                        <InputField
                            id="date"
                            disabled={disabled}
                            value={date.split("T")[0]}
                            onChange={handleDate}
                            placeholder="Digite a data do Documento"
                            type="date"
                            errorMessage={
                                errors.find((item) => item.field === "date")
                                    ?.message
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            className="block mb-1 pl-1"
                            htmlFor="selectedTextId"
                        >
                            Modelos de texto
                        </label>
                        <select
                            disabled={disabled}
                            id="selectedTextId"
                            onChange={handleSelectText}
                            className={`w-full h-[52px] bg-gray-50 dark:bg-gray-900 p-3 outline-none border rounded-lg disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed ${
                                selectTextError
                                    ? "border-red-600"
                                    : "border-gray-300 dark:border-gray-600 focus:border-green-400"
                            }`}
                            value={selectedTextId}
                        >
                            <option value={0}>Selecione um texto</option>
                            {documentType.texts.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {selectTextError && errors.length > 0 && (
                            <div className="text-sm text-red-600">
                                {selectTextError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-1 pl-1" htmlFor="text">
                        Texto
                    </label>
                    {shouldRender && (
                        <Editor
                            onChange={(e) => setText(e)}
                            value={text}
                            disabled={disabled}
                        />
                    )}
                </div>
                <div className="flex gap-4">
                    <Button
                        value="Cancelar"
                        disabled={disabled}
                        onClick={handleCancel}
                        type="cancel"
                    />
                    <Button
                        value="Salvar"
                        disabled={disabled}
                        onClick={handleUpdateDocument}
                        type="add"
                    />
                </div>
            </div>
            {modalDelete && (
                <ModalDelete
                    onClose={() => setModalDelete(false)}
                    onDelete={handleDeleteDocument}
                />
            )}
        </>
    );
};
