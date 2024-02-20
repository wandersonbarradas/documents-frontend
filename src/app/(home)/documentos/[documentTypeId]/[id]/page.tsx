import * as api from "@/api/server";
import { AddDocument } from "@/components/documents/addDocument";
import { UpdateDocument } from "@/components/documents/updateDocument";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
        documentTypeId: string;
    };
};

const page = async ({ params }: Props) => {
    if (isNaN(parseInt(params.documentTypeId))) {
        return notFound();
    }
    const documentType = await api.getDocumentType(
        parseInt(params.documentTypeId),
    );
    if (typeof documentType === "string") {
        return notFound();
    }
    if (params.id === "novo") {
        return <AddDocument documentType={documentType} />;
    }
    const [identifier, id] = params.id.split("-");
    if (identifier === "copia") {
        const document = await api.getDocument(parseInt(id));
        if (typeof document === "string") {
            return notFound();
        }
        return <AddDocument documentType={documentType} document={document} />;
    }
    if (isNaN(parseInt(params.id))) {
        return notFound();
    }
    const document = await api.getDocument(parseInt(params.id));
    if (typeof document === "string") {
        return notFound();
    }
    return <UpdateDocument document={document} documentType={documentType} />;
};

export default page;
