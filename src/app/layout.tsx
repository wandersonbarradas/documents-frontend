import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500", "400", "600", "700"],
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
            <body className={`${poppins.className} px-4`}>
                <>
                    {children}
                    <ToastContainer />
                </>
            </body>
        </html>
    );
}
