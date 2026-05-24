import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { ActsList, UpdateActReq } from 'types/MesTypes';

const updateAct = createAsyncThunk<ActsList,
UpdateActReq, { rejectValue: FetchTodosError }>(
  'updateAct',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_UPDATE_ACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const { id, ...body } = req;
      const response = await $api.put<ActsList>(
        `${process.env.REACT_APP_UPDATE_ACT}/${id}`,
        body,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось обновить акт.',
      });
    }
  },
);

export default updateAct;
