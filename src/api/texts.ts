import { req } from "./axios";
import { getCookie } from "cookies-next";
import { DocumentTypeText } from "@/types/DocumentTypeText";

export const getTexts = async (documentTypeId: number) => {
    try {
        const token = getCookie("token");
        const result = await req.get(
            `/documents-types/${documentTypeId}/texts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return (result.data.documentsTypesTexts as DocumentTypeText[]) || [];
    } catch (error: any) {
        return [];
    }
};

export const addText = async (
    documentTypeId: number,
    data: Omit<DocumentTypeText, "id" | "documentTypeId">,
) => {
    try {
        const token = getCookie("token");
        const result = await req.post(
            `/documents-types/${documentTypeId}/texts`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (result.data?.documentTypeText) {
            return result.data.documentTypeText as DocumentTypeText;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const deleteText = async (id: number, documentTypeId: number) => {
    try {
        const token = getCookie("token");
        const result = await req.delete(
            `/documents-types/${documentTypeId}/texts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (result.data?.documentTypeText) {
            return result.data.documentTypeText as DocumentTypeText;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const updateText = async (
    id: number,
    documentTypeId: number,
    data: Omit<DocumentTypeText, "id" | "documentTypeId">,
) => {
    try {
        const token = getCookie("token");
        const result = await req.put(
            `/documents-types/${documentTypeId}/texts/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (result.data?.documentTypeText) {
            return result.data.documentTypeText as DocumentTypeText;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};
