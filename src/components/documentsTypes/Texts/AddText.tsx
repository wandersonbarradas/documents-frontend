import { ErrorItem } from "@/types/ErrorItem";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react";
import { z } from "zod";
import { addText } from "@/api/texts";
import { addAlert } from "@/utils/addAlert";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

type Props = {
    documentTypeId: number;
    refreshAction: () => void;
};

export const AddText = ({ documentTypeId, refreshAction }: Props) => {
    const [nameField, setNameField] = useState("");
    const [textField, setTextField] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const textSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        textField: z.string().min(4, "Preencha o texto"),
    });

    const handleAddText = async () => {
        setErrors([]);
        const data = textSchema.safeParse({ nameField, textField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));

        setLoading(true);
        const result = await addText(documentTypeId, {
            name: data.data.nameField,
            text: data.data.textField,
        });
        setLoading(false);
        if (typeof result === "string") {
            addAlert("error", result);
        } else {
            addAlert("success", "Adicionado com sucesso!");
            setNameField("");
            setTextField("");
            refreshAction();
        }
    };

    return (
        <div className="">
            <div className="mb-5">
                <h4 className="text-xl text-center mb-2">Novo Texto</h4>
                <label className="block mb-1 pl-1" htmlFor="nameField">
                    Nome
                </label>
                <InputField
                    id="nameField"
                    disabled={loading}
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                    placeholder="Digite o nome do texto"
                    type="text"
                    errorMessage={
                        errors.find((item) => item.field === "nameField")
                            ?.message
                    }
                />
            </div>
            <div className="mb-5">
                <label className="block mb-1 pl-1" htmlFor="textField">
                    Texto
                </label>
                <TextField
                    id="textField"
                    disabled={loading}
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                    placeholder="Digite o texto"
                    errorMessage={
                        errors.find((item) => item.field === "textField")
                            ?.message
                    }
                />
            </div>
            <div>
                <Button
                    value={loading ? "Adicionando..." : "Adicionar"}
                    disabled={loading}
                    onClick={handleAddText}
                />
            </div>
        </div>
    );
};
