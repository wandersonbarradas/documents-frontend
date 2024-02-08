import { ErrorItem } from "@/types/ErrorItem";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { addField } from "@/api/fields";
import { addAlert } from "@/utils/addAlert";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";

type Props = {
    documentTypeId: number;
    documentTypeTextId: number;
    refreshAction: () => void;
};

export const AddField = ({
    documentTypeId,
    documentTypeTextId,
    refreshAction,
}: Props) => {
    const [nameField, setNameField] = useState("");
    const [typeField, setTypeField] = useState("0");
    const [identifierField, setIdentifierField] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [selectError, setSelectError] = useState<string | undefined>();

    const fieldSchema = z.object({
        nameField: z.string().min(2, "Preencha o nome"),
        typeField: z.string().min(4, "Selecione o tipo"),
        identifierField: z.string().min(5, "Preencha o idenficador"),
    });

    useEffect(() => {
        const error = errors.find(
            (item) => item.field === "typeField",
        )?.message;
        setSelectError(error);
    }, [errors]);

    const handleAddField = async () => {
        setErrors([]);
        const data = fieldSchema.safeParse({
            nameField,
            typeField,
            identifierField,
        });
        if (!data.success) return setErrors(getErrorFromZod(data.error));

        setLoading(true);
        const result = await addField(documentTypeId, documentTypeTextId, {
            name: data.data.nameField,
            type: data.data.typeField,
            identifier: data.data.identifierField,
        });
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Adicionado com sucesso!");
            setNameField("");
            setTypeField("0");
            setIdentifierField("");
            refreshAction();
        }
    };

    return (
        <div className="">
            <div className="mb-5">
                <h4 className="text-xl text-center mb-2">Novo Campo</h4>
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
                    value={typeField}
                    onChange={(e) => setTypeField(e.target.value)}
                    id="typeField"
                >
                    <option value="0">Selecione um tipo</option>
                    <option value="text">Texto</option>
                    <option value="number">Numero</option>
                </select>
                {selectError && errors.length > 0 && (
                    <div className="text-sm text-red-600">{selectError}</div>
                )}
                {/* <InputField
                    id="typeField"
                    disabled={loading}
                    value={typeField}
                    onChange={(e) => setTypeField(e.target.value)}
                    placeholder="Digite o tipo do campo"
                /> */}
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
            <div>
                <Button
                    value={loading ? "Adicionando..." : "Adicionar"}
                    disabled={loading}
                    onClick={handleAddField}
                />
            </div>
        </div>
    );
};
