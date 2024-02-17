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
    const [expiresField, setExpiresField] = useState(true);
    const [hasNumberField, setHasNumberField] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const documentTypeSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        titleField: z.string().min(4, "Preencha o título"),
        validityField: z
            .number({ invalid_type_error: "Preencha a validade" })
            .min(1, "Preencha a validade"),
        expiresField: z.boolean(),
        hasNumberField: z.boolean(),
    });

    const handleAddDocumentType = async () => {
        setErrors([]);
        const data = documentTypeSchema.safeParse({
            nameField,
            titleField,
            validityField,
            expiresField,
            hasNumberField,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const result = await addDocumentType({
            name: data.data.nameField,
            title: data.data.titleField,
            validity: data.data.validityField,
            expires: data.data.expiresField,
            created_at: new Date(),
            has_number: data.data.hasNumberField,
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
            <div className="mb-5 flex gap-x-16 items-stretch">
                <div className="flex flex-col items-center flex-1">
                    <label className="block mb-1 pl-1" htmlFor="hasNumberField">
                        É numerado?
                    </label>
                    <input
                        id="hasNumberField"
                        checked={hasNumberField}
                        className="transition-all duration-500 ease-in-out w-6 h-6 mt-3"
                        type="checkbox"
                        onChange={() => setHasNumberField(!hasNumberField)}
                    />
                </div>
                <div className="flex flex-col items-center flex-1">
                    <label className="block mb-1 pl-1" htmlFor="expiresField">
                        Tem validade?
                    </label>
                    <input
                        id="expiresField"
                        checked={expiresField}
                        className="transition-all duration-500 ease-in-out w-6 h-6 mt-3"
                        type="checkbox"
                        onChange={() => setExpiresField(!expiresField)}
                    />
                </div>
                {expiresField && (
                    <div className="flex-1">
                        <label
                            className="block mb-1 pl-1"
                            htmlFor="validityField"
                        >
                            Validade (dias)
                        </label>
                        <InputField
                            id="validityField"
                            disabled={loading}
                            value={validityField.toString()}
                            onChange={(e) =>
                                setValidityField(parseInt(e.target.value))
                            }
                            placeholder="Digite a validade do Documento. (Dias)"
                            type="number"
                            errorMessage={
                                errors.find(
                                    (item) => item.field === "validityField",
                                )?.message
                            }
                        />
                    </div>
                )}
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
