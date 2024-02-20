import { AddDocument, Document, UpdateDocument } from "@/types/Document";
import { req } from "./axios";
import { getCookie } from "cookies-next";

export const getDocuments = async () => {
    try {
        const token = getCookie("token");
        const result = await req.get("/documents", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (result.data.documents as Document[]) || [];
    } catch (error: any) {
        return [];
    }
};

export const addDocument = async (data: AddDocument) => {
    try {
        const token = getCookie("token");
        const result = await req.post("/documents", data, {
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

export const updateDocument = async (id: number, data: UpdateDocument) => {
    try {
        const token = getCookie("token");
        const result = await req.put(`/documents/${id}`, data, {
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

export const deleteDocument = async (id: number) => {
    try {
        const token = getCookie("token");
        const result = await req.delete(`/documents/${id}`, {
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

export const getPDF = async (id: number) => {
    try {
        const token = getCookie("token");
        const result = await req.get("/documents/pdf/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer",
        });
        if (result.headers["content-type"] === "application/pdf") {
            // Salva o PDF em um arquivo local
            const blob = new Blob([result.data], { type: "application/pdf" });
            // Abre o arquivo PDF
            // Cria uma URL temporária para o Blob
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } else {
            return "Algo deu Errado!";
        }
    } catch (error: any) {
        console.log("🚀 ~ getPDF ~ error:", error);
        return "Erro na requisição: " + error.message;
    }
};
