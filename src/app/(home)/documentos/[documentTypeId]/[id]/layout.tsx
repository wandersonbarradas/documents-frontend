import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
    if (params.id === "novo") {
        return {
            title: "Novo documento",
        };
    }
    return {
        title: "Editando documento",
    };
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
