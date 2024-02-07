import { DocumentType } from "./DocumentType";

export type Document = {
    id: number;
    number: string;
    data: {
        text: string;
        fields: {
            [key: string]: any;
        };
    };
    date: Date;
    documentTypeId: number;
    documentType: DocumentType;
};
