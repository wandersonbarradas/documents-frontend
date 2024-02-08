import * as api from "@/api/server";
import { AddDocument } from "@/components/documents/addDocument";
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
    const documentType = await api.getDocument(parseInt(params.documentTypeId));
    if (typeof documentType === "string") {
        return notFound();
    }
    if (params.id === "novo") {
        return <AddDocument documentType={documentType} />;
    }
};

export default page;
