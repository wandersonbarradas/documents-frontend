"use client";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { addDocumentType } from "@/api/documentsTypes";
import { addAlert } from "@/utils/addAlert";
import { DocumentType } from "@/types/DocumentType";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { TextField } from "../TextField";
import { DocumentTypeFull } from "@/types/DocumentTypeFull";

type Props = {
    documentType: DocumentTypeFull;
};

export const AddDocument = ({ documentType }: Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [selectedTextId, setSelectedTextId] = useState<number>(0);
    const [text, setText] = useState("");
    const [validityField, setValidityField] = useState(90);
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

    const documentTypeSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        titleField: z.string().min(4, "Preencha o título"),
        validityField: z
            .number({ invalid_type_error: "Preencha a validade" })
            .min(1, "Preencha a validade"),
    });

    // const handleAddDocumentType = async () => {
    //     setErrors([]);
    //     const data = documentTypeSchema.safeParse({
    //         nameField,
    //         titleField,
    //         validityField,
    //     });
    //     if (!data.success) return setErrors(getErrorFromZod(data.error));
    //     setLoading(true);
    //     const result = await addDocumentType({
    //         name: data.data.nameField,
    //         title: data.data.titleField,
    //         validityPeriod: data.data.validityField,
    //     });
    //     setLoading(false);
    //     if (typeof result === "string") {
    //         addAlert("error", result);
    //     } else {
    //         addAlert("success", "Adicionado com sucesso!");
    //     }
    // };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-center mb-5">Criando {documentType.name}</h2>
            <div className="mb-5 flex gap-4 items-center">
                <div className="w-1/3">
                    <label className="block mb-1 pl-1" htmlFor="date">
                        Data
                    </label>
                    <InputField
                        id="date"
                        disabled={loading}
                        //value={nameField}
                        onChange={(e) => console.log("")}
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
                        id="selectedTextId"
                        onChange={(e) =>
                            setSelectedTextId(parseInt(e.target.value))
                        }
                        className="w-full bg-transparent text-black p-3 outline-none border border-gray-300 rounded-lg"
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
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="validityField">
                    Validade
                </label>
                <InputField
                    id="validityField"
                    disabled={loading}
                    value={validityField.toString()}
                    onChange={(e) => setValidityField(parseInt(e.target.value))}
                    placeholder="Digite a validade do Documento. (Dias)"
                    type="number"
                    errorMessage={
                        errors.find((item) => item.field === "validityField")
                            ?.message
                    }
                />
            </div>
            <div>
                <Button
                    value={loading ? "Adicionando..." : "Adicionar"}
                    disabled={loading}
                    onClick={() => alert("Fazer")}
                />
            </div>
        </div>
    );
};
