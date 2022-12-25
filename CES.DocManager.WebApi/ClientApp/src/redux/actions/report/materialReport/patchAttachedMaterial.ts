import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../../../http/loginHttp';
import { IMaterialAttachedResponse, IPatchAttachedMaterialRequest } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const patchAttachedMaterial = createAsyncThunk<
IMaterialAttachedResponse, IPatchAttachedMaterialRequest, { rejectValue: FetchTodosError }>(
  'patchAttachedMaterial',
  async (material: IPatchAttachedMaterialRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_PATCH_ATTACHED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.patch<IMaterialAttachedResponse>(
        `${process.env.REACT_APP_PATCH_ATTACHED_MATERIAL}/${material.id}`,
        material.data,
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: 'Материал не отредактирован',
        });
      }
      return rejectWithValue({
        message: 'Материал не отредактирован',
      });
    }
  },
);

export default patchAttachedMaterial;
