import { DocumentField } from "./DocumentFields";

export type DocumentTypeText = {
    id: number;
    name: string;
    text: string;
    documentTypeId: number;
    fields: DocumentField[];
};
