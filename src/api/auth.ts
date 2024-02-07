import { req } from "./axios";

export const login = async (data: { email: string; password: string }) => {
    try {
        const result = await req.post("/auth/login", data);
        return result.data;
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data;
        }
        return {
            status: false,
            error: "Ops! Algo deu errado! " + error.message,
        };
    }
};
