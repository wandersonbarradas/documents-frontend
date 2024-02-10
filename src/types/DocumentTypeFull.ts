import { DocumentType } from "./DocumentType";
import { DocumentTypeText } from "./DocumentTypeText";

export interface DocumentTypeFull extends DocumentType {
    texts: DocumentTypeText[];
}
