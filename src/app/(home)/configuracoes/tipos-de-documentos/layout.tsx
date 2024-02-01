import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tipos de Documentos",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
