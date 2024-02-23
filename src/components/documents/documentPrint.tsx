"use client";

import { Document } from "@/types/Document";
import { getPDF } from "@/api/documents";
import Formatter from "@/utils/formatter";
import extenso from "extenso";
import { useEffect, useState } from "react";

type Props = {
    document: Document;
};

export const DocumentPrint = ({ document }: Props) => {
    const [size, setSize] = useState(document.text.length);
    const handlePrint = async () => {
        await getPDF(document.id);
    };

    useEffect(() => {
        console.log(size);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Verifica se a tecla pressionada é o 'P' e se a tecla Ctrl também está pressionada
            if (event.ctrlKey && (event.key === "p" || event.key === "P")) {
                event.preventDefault(); // Impede o comportamento padrão (abrir a caixa de diálogo de impressão)

                // Executa sua lógica personalizada aqui
                handlePrint();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="min-h-screen bg-[url('/img/imagem2.jpg')] bg-no-repeat bg-contain bg-center relative">
                <div
                    id="box"
                    className={`absolute top-0 left-0 right-0 bottom-0 text-black ${
                        size > 700 ? "pt-16" : "pt-52"
                    } text-center bg-white/90`}
                >
                    <div className="w-full max-w-xl mx-auto">
                        <div className="mb-20 text-sm">
                            <b>
                                {" "}
                                {document.document_type.title}
                                {document.document_type.has_number && (
                                    <>
                                        {" "}
                                        -{" "}
                                        {Formatter.number(
                                            document.number as string,
                                        )}
                                    </>
                                )}
                            </b>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: document.text,
                            }}
                            className="text-sm text-justify"
                        ></div>
                        {document.document_type.expires && (
                            <p className="text-sm">
                                O presente Documento tem validade de{" "}
                                {document.document_type.validity} (
                                {extenso(document.document_type.validity)})
                                dias.
                            </p>
                        )}
                        <div className="text-sm mt-10">
                            Demerval Lobão,{" "}
                            {Formatter.formatarDataPorExtenso(
                                new Date(document.date),
                            )}
                        </div>
                    </div>
                    <button
                        className="my-6 bg-slate-800 text-white px-4 py-2 rounded-md transition-all hover:bg-slate-600"
                        id="print"
                        onClick={handlePrint}
                    >
                        Imprimir
                    </button>
                </div>
            </div>
        </>
    );
};
