import * as api from "@/api/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Login",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLoggedIn = await api.isLoggedIn();
    if (isLoggedIn) return redirect("/");
    return <>{children}</>;
}
