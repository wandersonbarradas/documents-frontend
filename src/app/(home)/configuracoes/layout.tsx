import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Configurações",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
