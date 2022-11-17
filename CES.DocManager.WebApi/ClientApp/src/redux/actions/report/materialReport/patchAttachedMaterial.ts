import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../../../http/loginHttp';
import { IPatchAttachedMaterialRequest, IPatchAttachedMaterialResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const patchAttachedMaterial = createAsyncThunk<
IPatchAttachedMaterialResponse, IPatchAttachedMaterialRequest, { rejectValue: FetchTodosError }>(
  'patchAttachedMaterial',
  async (material: IPatchAttachedMaterialRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_PATCH_ATTACHED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.patch<IPatchAttachedMaterialResponse>(
        `${process.env.REACT_APP_PATCH_ATTACHED_MATERIAL}/${material.id}`,
        material.data,
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: err.message,
        });
      }
      return rejectWithValue({
        message: 'Материал не отредактирован',
      });
    }
  },
);

export default patchAttachedMaterial;
