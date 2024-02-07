import { toast } from "react-toastify";

export const addAlert = (
    type: "success" | "error" | "warning",
    message: string,
) => {
    const configAlert = {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };
    toast[type](message, configAlert);
};
