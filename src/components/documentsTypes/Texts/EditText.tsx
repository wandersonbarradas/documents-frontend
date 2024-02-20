import { ErrorItem } from "@/types/ErrorItem";
import { getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { updateText } from "@/api/texts";
import { addAlert } from "@/utils/addAlert";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { Editor } from "@/components/Editor";

type Props = {
    text: DocumentTypeText;
    refreshAction: () => void;
    cancelEdit: () => void;
};

export const EditText = ({ text, refreshAction, cancelEdit }: Props) => {
    const [nameField, setNameField] = useState(text.name);
    const [textField, setTextField] = useState(text.text);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorItem[]>([]);

    const textSchema = z.object({
        nameField: z.string().min(4, "Preencha o nome"),
        textField: z.string().min(4, "Preencha o texto"),
    });

    useEffect(() => {
        setErrors([]);
        const data = textSchema.safeParse({ nameField, textField });
        if (!data.success) return setErrors(getErrorFromZod(data.error));
    }, [nameField, textField]);

    const handleUpdateText = async () => {
        if (errors.length > 0) return false;
        setLoading(true);
        const result = await updateText(text.id, text.document_type_id, {
            name: nameField,
            text: textField,
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
        <div className="">
            <div className="mb-5">
                <h4 className="text-xl text-center mb-2">Editando Texto</h4>
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
                {/* <TextField
                    id="textField"
                    disabled={loading}
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                    placeholder="Digite o texto"
                    errorMessage={
                        errors.find((item) => item.field === "textField")
                            ?.message
                    }
                /> */}
                <Editor
                    value={textField}
                    onChange={(e) => setTextField(e)}
                    disabled={loading}
                />
            </div>
            <div className="flex gap-4">
                <Button
                    value="Cancelar"
                    disabled={loading}
                    onClick={cancelEdit}
                    type="cancel"
                />
                <Button
                    value={loading ? "Salvando..." : "Salvar"}
                    disabled={loading}
                    onClick={handleUpdateText}
                    type="add"
                />
            </div>
        </div>
    );
};
