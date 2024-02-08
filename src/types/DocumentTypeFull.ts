import { DocumentType } from "./DocumentType";
import { DocumentTypeField } from "./DocumentTypeField";
import { DocumentTypeText } from "./DocumentTypeText";

export interface DocumentTypeFull extends DocumentType {
    documentTypeField: DocumentTypeField[];
    texts: DocumentTypeText[];
}
