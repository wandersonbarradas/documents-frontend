import { ErrorItem } from "@/types/ErrorItem";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { updateField } from "@/api/fields";
import { addAlert } from "@/utils/addAlert";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { DocumentTypeField } from "@/types/DocumentTypeField";

type Props = {
    field: DocumentTypeField;
    refreshAction: () => void;
    cancelEdit: () => void;
};

export const EditField = ({ field, refreshAction, cancelEdit }: Props) => {
    const [nameField, setNameField] = useState(field.name);
    const [typeField, setTypeField] = useState(field.type);
    const [identifierField, setIdentifierField] = useState(field.identifier);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectError, setSelectError] = useState("");

    const fieldSchema = z.object({
        nameField: z.string().min(2, "Preencha o nome"),
        typeField: z.string().min(4, "Selecione o tipo"),
        identifierField: z.string().min(5, "Preencha o idenficador"),
    });

    useEffect(() => {
        const error = errors.find((item) => item.field === "typeField");
        if (error) {
            setSelectError(error.message);
        }
    }, [errors]);

    useEffect(() => {
        setErrors([]);
        const data = fieldSchema.safeParse({
            nameField,
            typeField,
            identifierField,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
    }, [nameField, typeField, identifierField]);

    const handleUpdateField = async () => {
        console.log(errors);
        if (errors.length > 0) return;

        setLoading(true);
        const result = await updateField(
            field.id,
            field.documentTypeId,
            field.documentTypeTextId,
            {
                name: nameField,
                type: typeField,
                identifier: identifierField,
            },
        );
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Alterado com sucesso!");
            setNameField("");
            setTypeField("");
            setIdentifierField("");
            refreshAction();
        }
    };

    return (
        <div className="">
            <div className="mb-5">
                <h4 className="text-xl text-center mb-2">Editando Campo</h4>
                <label className="block mb-1 pl-1" htmlFor="nameField">
                    Nome
                </label>
                <InputField
                    id="nameField"
                    disabled={loading}
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                    placeholder="Digite o nome do campo"
                    type="text"
                    errorMessage={
                        errors.find((item) => item.field === "nameField")
                            ?.message
                    }
                />
            </div>
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="typeField">
                    Tipo
                </label>
                <select
                    className={`block w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black 
                    ${selectError ? "border-red-600" : ""}`}
                    disabled={loading}
                    defaultValue={typeField}
                    onChange={(e) => setTypeField(e.target.value)}
                    id="typeField"
                >
                    <option value="">Selecione um tipo</option>
                    <option value="text">Texto</option>
                    <option value="number">Numero</option>
                </select>
                {selectError && (
                    <div className="text-sm text-red-600">{selectError}</div>
                )}
            </div>
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="identifierField">
                    Idenficador
                </label>
                <InputField
                    id="identifierField"
                    disabled={loading}
                    value={identifierField}
                    onChange={(e) => setIdentifierField(e.target.value)}
                    placeholder="Digite o tipo do campo"
                    errorMessage={
                        errors.find((item) => item.field === "identifierField")
                            ?.message
                    }
                />
            </div>
            <div className="flex gap-4">
                <Button
                    value="Cancelar"
                    disabled={loading}
                    onClick={cancelEdit}
                />
                <Button
                    value={loading ? "Salvando..." : "Salvar"}
                    disabled={loading}
                    onClick={handleUpdateField}
                />
            </div>
        </div>
    );
};
