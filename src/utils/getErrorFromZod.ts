import { ZodError } from "zod";
import { ErrorItem } from "@/types/ErrorItem";
export const getErrorFromZod = (error: ZodError) => {
    const errorList: ErrorItem[] = [];
    for (let i in error.errors) {
        errorList.push({
            field: error.errors[i].path[0].toString(),
            message: error.errors[i].message,
        });
    }
    return errorList;
};
