import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { AddNewActReq } from '../../../types/MesTypes';

const createNewAct = createAsyncThunk<number,
AddNewActReq, { rejectValue: FetchTodosError }>(
  'createNewAct',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_NEW_ACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<number>(
        process.env.REACT_APP_CREATE_NEW_ACT,
        req,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось создать новый акт.',
      });
    }
  },
);

export default createNewAct;
