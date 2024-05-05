import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { FetchTodosError } from '../../../../types/type';

const uploadFuelWorkCard = createAsyncThunk<undefined,
FormData, { rejectValue: FetchTodosError }>(
  'uploadFuelWorkCard',
  async (data: FormData, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_UPLOAD_FUEL_WORK_CARD === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const postHeaders = {
        'Content-type': 'multipart/form-data',
      };
      const response = await $api.post<undefined>(
        process.env.REACT_APP_UPLOAD_FUEL_WORK_CARD,
        data,
        {
          headers: postHeaders,
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Файл не загружен',
      });
    }
  },
);
export default uploadFuelWorkCard;
