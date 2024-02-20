import { InputField } from "../InputField";
import { ErrorItem } from "@/types/ErrorItem";
import { Button } from "../Button";
import { z } from "zod";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { updateDocumentType } from "@/api/documentsTypes";
import { addAlert } from "@/utils/addAlert";
import { DocumentType } from "@/types/DocumentType";
import { useEffect, useState } from "react";

type Props = {
    documentType: DocumentType;
    refreshAction: () => void;
};

export const DocumentTypeTabInfo = ({ refreshAction, documentType }: Props) => {
    const [nameField, setNameField] = useState(documentType.name);
    const [titleField, setTitleField] = useState(documentType.title);
    const [validityField, setValidityField] = useState(documentType.validity);
    const [hasNumberField, setHasNumberField] = useState(
        documentType.has_number,
    );
    const [expiresField, setExpiresField] = useState(documentType.expires);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    useEffect(() => {
        setErrors([]);
        const data = documentTypeSchema.safeParse({
            nameField,
            titleField,
            validityField,
            expiresField,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
    }, [nameField, titleField, validityField, expiresField]);

    const documentTypeSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        titleField: z.string().min(4, "Preencha o título"),
        validityField: z
            .number({ invalid_type_error: "Preencha a validade" })
            .min(1, "Preencha a validade"),
        expiresField: z.boolean(),
        hasNumberField: z.boolean(),
    });

    const handleUpdateDocumentType = async () => {
        setLoading(true);
        const result = await updateDocumentType(documentType.id, {
            name: nameField,
            title: titleField,
            validity: validityField,
            expires: expiresField,
            has_number: hasNumberField,
            updated_at: new Date(),
        });
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Alterado com sucesso!");
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
                        className="transition-all duration-500 ease-in-out w-6 h-6 mt-3 accent-green-400"
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
                        className="transition-all duration-500 ease-in-out w-6 h-6 mt-3 accent-green-400"
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
                    value={loading ? "Salvando..." : "Salvar"}
                    disabled={loading}
                    onClick={handleUpdateDocumentType}
                    type="add"
                />
            </div>
        </div>
    );
};
