import { Header } from "@/components/Header";
import { isLoggedIn } from "@/api/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const logged = await isLoggedIn();
    if (!logged) return redirect("/auth/login");
    return (
        <>
            <Header />
            <main className="mt-8">{children}</main>
        </>
    );
}
