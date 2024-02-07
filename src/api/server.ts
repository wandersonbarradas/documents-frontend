import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { req } from "./axios";

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
        console.log("🚀 ~ isLoggedIn ~ error:", error);
        return false;
    }
};
