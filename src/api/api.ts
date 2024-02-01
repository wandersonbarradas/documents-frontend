import { Document } from "@/types/Document";
import { req } from "./axios";
import { getCookie } from "cookies-next";

export const login = async (data: { email: string; password: string }) => {
    try {
        const result = await req.post("/auth/login", data);
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getDocuments = async () => {
    const token = getCookie("token");
    const result = await req.get("/documents", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return (result.data.documents as Document[]) || [];
};
