import axios from 'axios';
import { FetchTodosError } from 'types/type';

type ApiErrorBody = {
  errorMessage?: string;
  ErrorMessage?: string;
};

export async function parseApiErrorMessage(
  err: unknown,
  fallbackMessage: string,
): Promise<string> {
  if (axios.isAxiosError(err) && err.response?.data instanceof Blob) {
    try {
      const text = await err.response.data.text();
      const body = JSON.parse(text) as ApiErrorBody;
      return body.errorMessage ?? body.ErrorMessage ?? fallbackMessage;
    } catch {
      return fallbackMessage;
    }
  }

  if (axios.isAxiosError(err) && err.response?.data) {
    const body = err.response.data as ApiErrorBody;
    return body.errorMessage ?? body.ErrorMessage ?? fallbackMessage;
  }

  return fallbackMessage;
}

export function getThunkErrorMessage(error: unknown, fallbackMessage: string): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as FetchTodosError).message);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
