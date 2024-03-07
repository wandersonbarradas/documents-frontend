import Link from "next/link";

const page = () => {
    return (
        <div className="w-full">
            <h1 className="text-xl font-medium pl-3 mb-6">Configurações</h1>
            <div className="flex">
                <Link
                    className="flex w-52 h-52 justify-center items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 p-4 rounded-md"
                    href="/configuracoes/tipos-de-documentos"
                >
                    Tipos de documentos
                </Link>
            </div>
        </div>
    );
};

export default page;
