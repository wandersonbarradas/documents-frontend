import { Document } from "@/types/Document";
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
