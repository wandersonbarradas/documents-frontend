import { getFields } from "@/api/fields";
import { getTexts } from "@/api/texts";
import { DocumentTypeField } from "@/types/DocumentTypeField";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { useEffect, useState } from "react";
import { FieldItem, FieldItemPlaceholder } from "./FieldItem";
import { AddField } from "./AddField";
import { EditField } from "./EditField";

type Props = {
    documentTypeId: number;
};

export const DocumentTypeTabFields = ({ documentTypeId }: Props) => {
    const [texts, setTexts] = useState<DocumentTypeText[]>([]);
    const [selectedTextId, setSelectedTextId] = useState<number>(0);
    const [textLoading, setTextLoading] = useState(true);
    const [fields, setFields] = useState<DocumentTypeField[]>([]);
    const [selectedField, setSelectedField] =
        useState<null | DocumentTypeField>(null);
    const [fieldloading, setFieldLoading] = useState(true);

    useEffect(() => {
        loadingTexts();
    }, []);

    useEffect(() => {
        loadingFields();
    }, [selectedTextId]);

    const loadingTexts = async () => {
        setSelectedTextId(0);
        setTextLoading(true);
        const result = await getTexts(documentTypeId);
        setTextLoading(false);
        setTexts(result);
    };

    const loadingFields = async () => {
        setSelectedField(null);
        if (selectedTextId <= 0) return;
        setFieldLoading(true);
        const result = await getFields(documentTypeId, selectedTextId);
        setFieldLoading(false);
        setFields(result);
    };

    return (
        <div className="p-5">
            {!textLoading && texts.length > 0 && (
                <select
                    onChange={(e) =>
                        setSelectedTextId(parseInt(e.target.value))
                    }
                    className="w-full bg-transparent text-black text-xl p-3 outline-none"
                >
                    <option value={0}>Selecione um texto</option>
                    {texts.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            )}
            {textLoading && (
                <div className="h-10 w-full rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            )}
            {!textLoading && texts.length <= 0 && (
                <div className="pt-3 text-center">
                    Nenhum texto cadastrado neste documento! 👻
                </div>
            )}
            {selectedTextId > 0 && (
                <>
                    {selectedField && (
                        <EditField
                            cancelEdit={() => setSelectedField(null)}
                            refreshAction={loadingFields}
                            field={selectedField}
                        />
                    )}
                    {!selectedField && (
                        <AddField
                            documentTypeTextId={selectedTextId}
                            documentTypeId={documentTypeId}
                            refreshAction={loadingFields}
                        />
                    )}

                    <div className="mt-5">
                        {fieldloading && (
                            <>
                                <FieldItemPlaceholder />
                                <FieldItemPlaceholder />
                                <FieldItemPlaceholder />
                            </>
                        )}
                        {!fieldloading &&
                            fields.map((item) => (
                                <FieldItem
                                    field={item}
                                    key={item.id}
                                    refreshAction={loadingFields}
                                    onEdit={(field: DocumentTypeField) =>
                                        setSelectedField(field)
                                    }
                                />
                            ))}
                        {!fieldloading && fields.length <= 0 && (
                            <div className="pt-3 text-center">
                                Nenhum um campo cadastrado neste texto! 👻
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
