import Link from "next/link";

const page = () => {
    return (
        <>
            <h1 className="text-xl font-medium pl-3 mb-3">Configurações</h1>
            <Link href="/configuracoes/tipos-de-documentos">
                Tipos de documentos
            </Link>
        </>
    );
};

export default page;
