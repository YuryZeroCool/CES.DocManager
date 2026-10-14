import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/loginHttp';
import { FetchTodosError } from 'types/type';
import { parseApiErrorMessage } from 'utils/parseApiErrorMessage';

export interface IDeleteUsedMaterialRequest {
  id: number;
  nameParty: string;
  month: number;
  year: number;
}

const deleteUsedMaterial = createAsyncThunk<
number, IDeleteUsedMaterialRequest, { rejectValue: FetchTodosError }>(
  'deleteUsedMaterial',
  async (data, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_USED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(process.env.REACT_APP_DELETE_USED_MATERIAL, {
        params: {
          id: data.id,
          nameParty: data.nameParty,
          month: data.month,
          year: data.year,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: await parseApiErrorMessage(err, 'Материал не найден'),
      });
    }
  },
);

export default deleteUsedMaterial;
