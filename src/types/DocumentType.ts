import { DocumentTypeText } from "./DocumentTypeText";

export type DocumentType = {
    id: number;
    name: string;
    validityPeriod: number;
    texts: DocumentTypeText[];
};
