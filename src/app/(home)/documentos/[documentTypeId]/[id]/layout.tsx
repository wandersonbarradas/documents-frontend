import { Metadata } from "next";

// type Props = {
//     params: { id: string };
//     searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     if (params.id === "novo") {
//         return {
//             title: "Novo documento",
//         };
//     }
//     return {
//         title: "Editando documento",
//     };
// }

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
