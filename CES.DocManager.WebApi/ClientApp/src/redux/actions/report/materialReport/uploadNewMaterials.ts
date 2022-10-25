import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { FetchTodosError } from '../../../../types/type';

const uploadNewMaterials = createAsyncThunk<string,
FormData, { rejectValue: FetchTodosError }>(
  'uploadNewMaterials',
  async (data: FormData, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_UPLOAD_NEW_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const postHeaders = {
        'Content-type': 'multipart/form-data',
      };
      const response = await $api.post<string>(process.env.REACT_APP_UPLOAD_NEW_MATERIALS, data, {
        headers: postHeaders,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Файл не загружен',
      });
    }
  },
);
export default uploadNewMaterials;
