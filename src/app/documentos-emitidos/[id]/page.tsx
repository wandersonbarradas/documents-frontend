import { DocumentPrint } from "@/components/documents/documentPrint";
import { notFound } from "next/navigation";
import * as api from "@/api/server";

type Props = {
    params: {
        id: string;
    };
};

const page = async ({ params }: Props) => {
    if (isNaN(parseInt(params.id))) {
        return notFound();
    }
    const document = await api.getDocument(parseInt(params.id));
    if (typeof document === "string") {
        return notFound();
    }

    return <DocumentPrint document={document} />;
};

export default page;
