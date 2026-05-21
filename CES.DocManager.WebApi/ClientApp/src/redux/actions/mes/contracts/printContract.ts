import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import buildContractFileName from 'utils/buildContractFileName';
import { parseApiErrorMessage } from 'utils/parseApiErrorMessage';

export interface PrintContractParams {
  contractId: number;
  contractNumber: string;
  organizationName: string;
  contractType: string;
}

export interface PrintContractResult {
  blob: Blob;
  fileName: string;
}

function parseFileNameFromContentDisposition(contentDisposition: string): string | null {
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    return decodeURIComponent(utf8Match[1]);
  }

  const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i);
  if (quotedMatch) {
    return quotedMatch[1];
  }

  const plainMatch = contentDisposition.match(/filename=([^;]+)/i);
  if (plainMatch) {
    return plainMatch[1].trim();
  }

  return null;
}

const printContract = createAsyncThunk<PrintContractResult,
PrintContractParams, { rejectValue: FetchTodosError }>(
  'printContract',
  async (params, { rejectWithValue }) => {
    const fallbackMessage = 'Не удалось сформировать договор для печати';
    const defaultFileName = buildContractFileName(
      params.contractNumber,
      params.organizationName,
      params.contractType,
    );

    try {
      if (process.env.REACT_APP_PRINT_CONTRACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<Blob>(
        `${process.env.REACT_APP_PRINT_CONTRACT}/${params.contractId}/print`,
        { responseType: 'blob' },
      );

      const contentType = response.headers['content-type'] ?? '';
      if (contentType.includes('application/json')) {
        const text = await response.data.text();
        const body = JSON.parse(text) as { errorMessage?: string; ErrorMessage?: string };
        return rejectWithValue({
          message: body.errorMessage ?? body.ErrorMessage ?? fallbackMessage,
        });
      }

      const contentDisposition = response.headers['content-disposition'] ?? '';
      const fileNameFromHeader = parseFileNameFromContentDisposition(contentDisposition);
      const fileName = fileNameFromHeader ?? defaultFileName;

      return {
        blob: response.data,
        fileName,
      };
    } catch (err) {
      const message = await parseApiErrorMessage(err, fallbackMessage);
      return rejectWithValue({ message });
    }
  },
);

export default printContract;
