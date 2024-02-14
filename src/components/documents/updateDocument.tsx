"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { addAlert } from "@/utils/addAlert";
import { TextField } from "../TextField";
import { DocumentTypeFull } from "@/types/DocumentTypeFull";
import { Document } from "@/types/Document";
import { updateDocument } from "@/api/documents";
import { useRouter } from "next/navigation";
type Props = {
    documentType: DocumentTypeFull;
    document: Document;
};

export const UpdateDocument = ({ documentType, document }: Props) => {
    const [number, setNumber] = useState<string>(document.number);
    const [date, setDate] = useState<string>(document.date);
    const [selectedTextId, setSelectedTextId] = useState<number>(
        document.documentTypeTextId,
    );
    const [text, setText] = useState(document.text);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectTextError, setSelectTextError] = useState("");

    const router = useRouter();

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
        number: z.string().min(6, "Preencha o numero"),
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
        setLoading(true);
        const result = await updateDocument(document.id, {
            date: data.data.date,
            documentTypeId: documentType.id,
            documentTypeTextId: data.data.selectedTextId,
            text: data.data.text,
            number: data.data.number,
        });
        if (typeof result === "string") {
            addAlert("error", result);
            setLoading(false);
        } else {
            addAlert("success", "Alterado com sucesso!");
            router.replace(`/documentos-emitidos/${result.id}`);
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

    return (
        <div className="w-full max-w-4xl mx-auto my-5">
            <h2 className="text-center">
                Editando {documentType.name} Nº {document.number}
            </h2>
            <div className="mb-5 flex gap-4 items-start">
                <div className="w-1/5">
                    <label className="block mb-1 pl-1" htmlFor="number">
                        Numero
                    </label>
                    <InputField
                        id="number"
                        disabled={loading}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Digite o número do Documento"
                        type="text"
                        errorMessage={
                            errors.find((item) => item.field === "number")
                                ?.message
                        }
                    />
                </div>
                <div className="w-1/4">
                    <label className="block mb-1 pl-1" htmlFor="date">
                        Data
                    </label>
                    <InputField
                        id="date"
                        disabled={loading}
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
                    <label className="block mb-1 pl-1" htmlFor="selectedTextId">
                        Modelos de texto
                    </label>
                    <select
                        disabled={loading}
                        id="selectedTextId"
                        onChange={handleSelectText}
                        className={`w-full bg-transparent text-black p-3 outline-none border border-gray-300 rounded-lg ${
                            selectTextError ? "border-red-600" : ""
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
                <TextField
                    id="text"
                    disabled={loading}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    errorMessage={
                        errors.find((item) => item.field === "text")?.message
                    }
                    heightFull={true}
                />
            </div>
            <div>
                <Button
                    value={loading ? "Salvando..." : "Salvar"}
                    disabled={loading}
                    onClick={handleUpdateDocument}
                />
            </div>
        </div>
    );
};
