"use client";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { addAlert } from "@/utils/addAlert";
import { TextField } from "../TextField";
import { DocumentTypeFull } from "@/types/DocumentTypeFull";
import { getPDF, addDocument } from "@/api/documents";

type Props = {
    documentType: DocumentTypeFull;
};

export const AddDocument = ({ documentType }: Props) => {
    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] + "T00:00:00",
    );
    const [selectedTextId, setSelectedTextId] = useState<number>(0);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectTextError, setSelectTextError] = useState("");

    useEffect(() => {
        const textItem = documentType.texts.find(
            (item) => item.id === selectedTextId,
        );
        if (textItem) {
            setText(textItem.text);
        } else {
            setText("");
        }
    }, [selectedTextId]);

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
    });

    const generate = async () => {
        await getPDF();
    };

    const handleAddDocument = async () => {
        setErrors([]);
        const data = documentSchema.safeParse({
            text,
            selectedTextId,
            date,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const result = await addDocument({
            date: data.data.date,
            documentTypeId: documentType.id,
            documentTypeTextId: data.data.selectedTextId,
            text: data.data.text,
        });
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Adicionado com sucesso!");
        }
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value + "T00:00:00";
        setDate(value);
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-5">
            <h2 className="text-center">Criando {documentType.name}</h2>
            <button onClick={generate} id="immprimir">
                IMPRIMIR
            </button>
            <div className="mb-5 flex gap-4 items-start">
                <div className="w-1/3">
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
                        onChange={(e) =>
                            setSelectedTextId(parseInt(e.target.value))
                        }
                        className={`w-full bg-transparent text-black p-3 outline-none border border-gray-300 rounded-lg ${
                            selectTextError ? "border-red-600" : ""
                        }`}
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
                    Textos
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
                    value={loading ? "Adicionando..." : "Adicionar"}
                    disabled={loading}
                    onClick={handleAddDocument}
                />
            </div>
        </div>
    );
};
