export type DocumentTypeText = {
    id: number;
    user_id: number;
    name: string;
    text: string;
    document_type_id: number;
    created_at: string;
    updated_at: string | null;
    last_updated_by: number | null;
};

export type AddDocumentTypeText = {
    name: string;
    text: string;
    created_at: Date;
};

export type UpdateDocumentTypeText = Omit<AddDocumentTypeText, "created_at"> & {
    updated_at: Date;
};
