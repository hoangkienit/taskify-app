import { AxiosError } from "axios";
import { showTopToast } from "../components/toast/toast";

export const handleApiError = (err: unknown, fallbackMessage = "Unexpected error occurred") => {
    const error = err as AxiosError<{ message?: string }>;
    const message = error.response?.data?.message || error.message || fallbackMessage;
    showTopToast(message, "error", 5000);
};
