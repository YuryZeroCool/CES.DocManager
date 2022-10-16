import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IDecommissionedMaterialRequest } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const addDecommissionedMaterial = createAsyncThunk<IDecommissionedMaterialRequest,
IDecommissionedMaterialRequest, { rejectValue: FetchTodosError }>(
  'addDecommissionedMaterial',
  async (data: IDecommissionedMaterialRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ADD_DECOMMISSIONED_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<
      IDecommissionedMaterialRequest>(process.env.REACT_APP_ADD_DECOMMISSIONED_MATERIALS, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Введены неверные данные',
      });
    }
  },
);
export default addDecommissionedMaterial;
