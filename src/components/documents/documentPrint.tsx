"use client";

import { Document } from "@/types/Document";
import { getPDF } from "@/api/documents";
import Formatter from "@/utils/formatter";
import extenso from "extenso";
import { useEffect } from "react";

type Props = {
    document: Document;
};

export const DocumentPrint = ({ document }: Props) => {
    const handlePrint = async () => {
        await getPDF(document.id);
    };

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
            <div className="min-h-screen bg-[url('/img/Imagem2.jpg')] bg-no-repeat bg-contain bg-center relative">
                <div
                    id="box"
                    className="absolute top-0 left-0 right-0 bottom-0 pt-16 text-center bg-white/90"
                >
                    <div className="w-full max-w-xl mx-auto">
                        <div className="mb-20 text-sm">
                            <b>
                                {" "}
                                {document.documentType.title} -{" "}
                                {Formatter.number(document.number)}
                            </b>
                        </div>
                        <p
                            style={{ whiteSpace: "pre-wrap" }}
                            dangerouslySetInnerHTML={{
                                __html: document.text
                                    .replace(/(?<!\*)\*\*(?!\*)/g, "<b>")
                                    .replace(/(?<!\*)\*\*\*(?!\*)/g, "</b>"),
                            }}
                            className="text-sm text-justify"
                        ></p>
                        <p className="text-sm mb-10">
                            A presente Certidão tem validade de{" "}
                            {document.documentType.validityPeriod} (
                            {extenso(document.documentType.validityPeriod)})
                            dias.
                        </p>
                        <div className="text-sm ">
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
