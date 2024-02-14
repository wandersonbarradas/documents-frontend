import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as api from "@/api/server";

export const metadata: Metadata = {
    title: "Documento emitido",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLoggedIn = await api.isLoggedIn();
    if (!isLoggedIn) return redirect("/auth/login");
    return <>{children}</>;
}
