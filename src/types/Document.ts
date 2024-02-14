import { DocumentType } from "./DocumentType";

export type Document = {
    id: number;
    number: string;
    text: string;
    date: string;
    documentTypeId: number;
    documentTypeTextId: number;
    documentType: DocumentType;
};

export type AddDocument = {
    date: Date;
    documentTypeId: number;
    documentTypeTextId: number;
    text: string;
};

export type UpdateDocument = AddDocument & {
    number: string;
};
