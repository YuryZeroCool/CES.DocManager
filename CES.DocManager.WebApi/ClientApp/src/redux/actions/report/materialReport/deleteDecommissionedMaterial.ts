import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../../../http/loginHttp';
import { FetchTodosError } from '../../../../types/type';

const deleteDecommissionedMaterial = createAsyncThunk<
number, number, { rejectValue: FetchTodosError }>(
  'deleteDecommissionedMaterial',
  async (MaterialId: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_DECOMMISSIONED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(`${process.env.REACT_APP_DELETE_DECOMMISSIONED_MATERIAL}/${MaterialId}`);
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: err.message,
        });
      }
      return rejectWithValue({
        message: 'Материал не найден',
      });
    }
  },
);

export default deleteDecommissionedMaterial;
