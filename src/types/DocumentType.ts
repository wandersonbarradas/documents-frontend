export type DocumentType = {
    id: number;
    user_id: number;
    name: string;
    title: string;
    validity: number;
    has_number: boolean;
    expires: boolean;
    created_at: string;
    updated_at: string | null;
    last_updated_by: number | null;
};

export type AddDocumentType = {
    name: string;
    title: string;
    validity: number;
    has_number: boolean;
    expires: boolean;
    created_at: Date;
};

export type UpdateDocumentType = Omit<AddDocumentType, "created_at"> & {
    updated_at: Date;
};
