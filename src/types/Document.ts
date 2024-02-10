import { DocumentField } from "./DocumentField";
import { DocumentType } from "./DocumentType";

export type Document = {
    id: number;
    number: string;
    text: string;
    date: Date;
    documentTypeId: number;
    documentTypeTextId: number;
    documentType: DocumentType;
    fields: DocumentField[];
};

export type AddDocument = {
    date: Date;
    documentTypeId: number;
    documentTypeTextId: number;
    text: string;
    fields?: Omit<DocumentField, "id" | "documentId">[];
};
