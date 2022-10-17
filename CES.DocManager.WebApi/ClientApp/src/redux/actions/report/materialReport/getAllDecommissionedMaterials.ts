import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IAllDecommissionedMaterials } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllDecommissionedMaterials = createAsyncThunk<IAllDecommissionedMaterials[],
string, { rejectValue: FetchTodosError }>(
  'getAllDecommissionedMaterials',
  async (str: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_DECOMMISSIONED_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IAllDecommissionedMaterials[]>(
        process.env.REACT_APP_GET_ALL_DECOMMISSIONED_MATERIALS,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных',
      });
    }
  },
);

export default getAllDecommissionedMaterials;
