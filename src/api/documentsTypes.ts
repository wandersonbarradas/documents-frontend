import { req } from "./axios";
import { getCookie } from "cookies-next";
import { DocumentType } from "@/types/DocumentType";

export const getDocumentsTypes = async () => {
    try {
        const token = getCookie("token");
        const result = await req.get("/documents-types", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (result.data.documents as DocumentType[]) || [];
    } catch (error: any) {
        return [];
    }
};

export const addDocumentType = async (data: Omit<DocumentType, "id">) => {
    try {
        const token = getCookie("token");
        const result = await req.post("/documents-types", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.data?.document) {
            return result.data.document as DocumentType;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const updateDocumentType = async (
    id: number,
    data: Omit<DocumentType, "id">,
) => {
    try {
        const token = getCookie("token");
        const result = await req.put(`/documents-types/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.data.document) {
            return result.data.document as DocumentType;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const deleteDocumentType = async (id: number) => {
    try {
        const token = getCookie("token");
        const result = await req.delete(`/documents-types/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.data.document) {
            return result.data.document as DocumentType;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};
