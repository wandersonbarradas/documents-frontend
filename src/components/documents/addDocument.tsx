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
import { addDocument } from "@/api/documents";
import { useRouter } from "next/navigation";
import { Editor } from "../Editor";
import { Document } from "@/types/Document";

type Props = {
    documentType: DocumentTypeFull;
    document?: Document;
};

export const AddDocument = ({ documentType, document }: Props) => {
    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] + "T00:00:00",
    );
    const [selectedTextId, setSelectedTextId] = useState<number>(
        document?.document_type_text_id ?? 0,
    );
    const [text, setText] = useState(document?.text ?? "");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectTextError, setSelectTextError] = useState("");
    const [shouldRender, setShouldRender] = useState(false);

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
    });

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
            document_type_id: documentType.id,
            document_type_text_id: data.data.selectedTextId,
            text: data.data.text,
            created_at: new Date(),
        });
        if (typeof result === "string") {
            addAlert("error", result);
            setLoading(false);
        } else {
            addAlert("success", "Adicionado com sucesso!");
            router.replace(`/documentos/${documentType.id}/${result.id}`);
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
            <h4 className="text-xl text-center mb-7">
                Criando {documentType.name}
            </h4>
            <div className="mb-5 flex gap-4 items-center">
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
                {/* <TextField
                    id="text"
                    disabled={loading}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    errorMessage={
                        errors.find((item) => item.field === "text")?.message
                    }
                    heightFull={true}
                /> */}
                {text && shouldRender && (
                    <Editor
                        onChange={(e) => setText(e)}
                        value={text}
                        disabled={loading}
                    />
                )}
            </div>
            <div className="flex gap-4">
                <Button
                    value="Cancelar"
                    disabled={loading}
                    onClick={() => router.replace("/")}
                    type="cancel"
                />
                <Button
                    value={loading ? "Adicionando..." : "Adicionar"}
                    disabled={loading}
                    onClick={handleAddDocument}
                    type="add"
                />
            </div>
        </div>
    );
};
