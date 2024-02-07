import { req } from "./axios";
import { getCookie } from "cookies-next";
import { DocumentTypeField } from "@/types/DocumentTypeField";

export const getFields = async (
    documentTypeId: number,
    documentTypeTextId: number,
) => {
    try {
        const token = getCookie("token");
        const result = await req.get(
            `/documents-types/${documentTypeId}/texts/${documentTypeTextId}/fields`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return (result.data.fields as DocumentTypeField[]) || [];
    } catch (error: any) {
        return [];
    }
};

export const addField = async (
    documentTypeId: number,
    documentTypeTextId: number,
    data: Omit<
        DocumentTypeField,
        "id" | "documentTypeId" | "documentTypeTextId"
    >,
) => {
    try {
        const token = getCookie("token");
        const result = await req.post(
            `/documents-types/${documentTypeId}/texts/${documentTypeTextId}/fields`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (result.data?.field) {
            return result.data.field as DocumentTypeField;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const deleteField = async (
    id: number,
    documentTypeId: number,
    documentTypeTextId: number,
) => {
    try {
        const token = getCookie("token");
        const result = await req.delete(
            `/documents-types/${documentTypeId}/texts/${documentTypeTextId}/fields/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (result.data?.field) {
            return result.data.field as DocumentTypeField;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const updateField = async (
    id: number,
    documentTypeId: number,
    documentTypeTextId: number,
    data: Omit<
        DocumentTypeField,
        "id" | "documentTypeId" | "documentTypeTextId"
    >,
) => {
    try {
        const token = getCookie("token");
        const result = await req.put(
            `/documents-types/${documentTypeId}/texts/${documentTypeTextId}/fields/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (result.data?.field) {
            return result.data.field as DocumentTypeField;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};
