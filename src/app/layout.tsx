import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Header } from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Roboto({
    subsets: ["latin"],
    weight: ["500", "400", "700"],
});

export const metadata: Metadata = {
    title: "Sistema de emissão de Documentos",
    description: "Sistema destinado a emissão de documentos eltronicamente",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body
                className={`${poppins.className} px-4 bg-gray-100 text-black dark:bg-gray-950 dark:text-white`}
            >
                <>
                    {children}
                    <ToastContainer />
                </>
            </body>
        </html>
    );
}
