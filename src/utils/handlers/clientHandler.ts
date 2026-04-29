import { AxiosError } from "axios";
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
} from "@/utils/toast.util";
import { ERROR_MESSAGES } from "@/constants/error-messages.constant";

function normalizeError(error: unknown): Error {
  if (error instanceof AxiosError) {
    const isNetworkError = !error.response;
    return {
      name: "AxiosError",
      message: isNetworkError
        ? "Error de conexión"
        : error.response?.data?.error?.message || error.message,
      stack: error.response?.data?.error?.stack || error.stack,
    };
  }

  if (error && typeof error === "object" && !("message" in error)) {
    return new Error(ERROR_MESSAGES.FORM_VALIDATION);
  }

  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);

  if (error && typeof error === "object") {
    if (
      "message" in error &&
      typeof (error as Record<string, unknown>).message === "string"
    ) {
      return new Error((error as Record<string, unknown>).message as string);
    }
    return new Error(JSON.stringify(error));
  }

  return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
}

export function clientErrorHandler(
  error: unknown,
  callback = () => {},
  {
    logToConsole = true,
    showToast = true,
    messagePrefix = "",
    defaultMessage = "Error desconocido",
  }: {
    logToConsole?: boolean;
    showToast?: boolean;
    messagePrefix?: string;
    defaultMessage?: string;
  } = {},
): void {
  const normalizedError = normalizeError(error);

  if (logToConsole) console.error(normalizedError);
  if (showToast) {
    const displayMessage = normalizedError.message || defaultMessage;
    toastError(`${messagePrefix}${displayMessage}`);
  }

  callback();
}

export function clientSuccessHandler(
  message: string,
  callback = () => {},
  {
    showToast = true,
    messagePrefix = "",
  }: {
    showToast?: boolean;
    messagePrefix?: string;
  } = {},
): void {
  if (showToast) {
    toastSuccess(`${messagePrefix}${message}`);
  }

  callback();
}

export function clientWarningHandler(
  message: string,
  callback = () => {},
  {
    logToConsole = true,
    showToast = true,
    messagePrefix = "",
  }: {
    logToConsole?: boolean;
    showToast?: boolean;
    messagePrefix?: string;
  } = {},
): void {
  if (logToConsole) console.warn(message);
  if (showToast) {
    toastWarning(`${messagePrefix}${message}`);
  }

  callback();
}

export function clientInfoHandler(
  message: string,
  callback = () => {},
  {
    showToast = true,
    messagePrefix = "",
  }: {
    showToast?: boolean;
    messagePrefix?: string;
  } = {},
): void {
  if (showToast) {
    toastInfo(`${messagePrefix}${message}`);
  }

  callback();
}

export default clientErrorHandler;
