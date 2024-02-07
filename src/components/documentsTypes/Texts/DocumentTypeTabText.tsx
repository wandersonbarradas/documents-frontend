import { getTexts } from "@/api/texts";
import { useEffect, useState } from "react";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { TextItem, TextItemPlaceholder } from "./TextItem";
import { AddText } from "./AddText";
import { EditText } from "./EditText";

type Props = {
    documentTypeId: number;
};

export const DocumentTypeTabTexts = ({ documentTypeId }: Props) => {
    const [texts, setTexts] = useState<DocumentTypeText[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedText, setSelectedText] = useState<null | DocumentTypeText>(
        null,
    );

    useEffect(() => {
        loadingTexts();
    }, []);

    const loadingTexts = async () => {
        setSelectedText(null);
        setLoading(true);
        const result = await getTexts(documentTypeId);
        setLoading(false);
        setTexts(result);
    };

    return (
        <div className="p-5">
            {selectedText && (
                <EditText
                    cancelEdit={() => setSelectedText(null)}
                    refreshAction={loadingTexts}
                    text={selectedText}
                />
            )}
            {!selectedText && (
                <AddText
                    documentTypeId={documentTypeId}
                    refreshAction={loadingTexts}
                />
            )}

            <div className="mt-5">
                {loading && (
                    <>
                        <TextItemPlaceholder />
                        <TextItemPlaceholder />
                    </>
                )}
                {!loading &&
                    texts.map((item) => (
                        <TextItem
                            text={item}
                            key={item.id}
                            refreshAction={loadingTexts}
                            onEdit={(text: DocumentTypeText) =>
                                setSelectedText(text)
                            }
                        />
                    ))}
                {!loading && texts.length <= 0 && (
                    <div className="pt-3 text-center">
                        Nenhum texto cadastrado neste documento! 👻
                    </div>
                )}
            </div>
        </div>
    );
};
