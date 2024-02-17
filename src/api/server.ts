import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { req } from "./axios";
import { DocumentType } from "@/types/DocumentType";
import { DocumentTypeText } from "@/types/DocumentTypeText";
import { DocumentTypeFull } from "@/types/DocumentTypeFull";
import { Document } from "@/types/Document";

export const isLoggedIn = async () => {
    try {
        const token = getCookie("token", { cookies });
        await req.get("/auth/isLoggedIn", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getDocumentType = async (id: number) => {
    try {
        const token = getCookie("token", { cookies });
        const result = await req.get(`/documents-types/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.data?.document) {
            return result.data.document as DocumentTypeFull;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};

export const getDocument = async (id: number) => {
    try {
        const token = getCookie("token", { cookies });
        const result = await req.get(`/documents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.data?.document) {
            return result.data.document as Document;
        }
        return (result.data.error as string) || "Ops! Algo deu errado!";
    } catch (error: any) {
        return "Ops! Algo deu errado! " + error.message;
    }
};
