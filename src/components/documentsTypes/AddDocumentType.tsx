import { useState } from "react";
import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { addDocumentType } from "@/api/documentsTypes";
import { addAlert } from "@/utils/addAlert";

type Props = {
    refreshAction: () => void;
};

export const AddDocumentType = ({ refreshAction }: Props) => {
    const [nameField, setNameField] = useState("");
    const [titleField, setTitleField] = useState("");
    const [validityField, setValidityField] = useState(90);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const documentTypeSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        titleField: z.string().min(4, "Preencha o título"),
        validityField: z
            .number({ invalid_type_error: "Preencha a validade" })
            .min(1, "Preencha a validade"),
    });

    const handleAddDocumentType = async () => {
        setErrors([]);
        const data = documentTypeSchema.safeParse({
            nameField,
            titleField,
            validityField,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const result = await addDocumentType({
            name: data.data.nameField,
            title: data.data.titleField,
            validityPeriod: data.data.validityField,
        });
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Adicionado com sucesso!");
            refreshAction();
        }
    };

    return (
        <div className="p-5">
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="nameField">
                    Nome
                </label>
                <InputField
                    id="nameField"
                    disabled={loading}
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                    placeholder="Digite o nome do Documento"
                    type="text"
                    errorMessage={
                        errors.find((item) => item.field === "nameField")
                            ?.message
                    }
                />
            </div>
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="titleField">
                    Titulo
                </label>
                <InputField
                    id="titleField"
                    disabled={loading}
                    value={titleField}
                    onChange={(e) => setTitleField(e.target.value)}
                    placeholder="Digite o título do Documento"
                    type="text"
                    errorMessage={
                        errors.find((item) => item.field === "titleField")
                            ?.message
                    }
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
                    onClick={handleAddDocumentType}
                />
            </div>
        </div>
    );
};
