import { DocumentType } from "./DocumentType";

export type Document = {
    id: number;
    number?: string;
    text: string;
    date: string;
    user_id: number;
    document_type_id: number;
    document_type_text_id: number;
    created_at: string;
    updated_at: string | null;
    last_updated_by: number | null;
    document_type: DocumentType;
};

export type AddDocument = {
    date: Date;
    document_type_id: number;
    document_type_text_id: number;
    text: string;
    created_at: Date;
};

export type UpdateDocument = Omit<
    AddDocument,
    "document_type_id" | "created_at"
> & {
    number?: string;
    updated_at: Date;
};
