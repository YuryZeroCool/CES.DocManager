import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../../http/loginHttp';
import { FetchTodosError } from '../../../types/type';
import { INumbersPlateOfCarResponse } from '../../../types/VehicleTypes';

const getNumbersPlateOfCar = createAsyncThunk<INumbersPlateOfCarResponse,
string, { rejectValue: FetchTodosError }>(
  'getNumbersPlateOfCar',
  async (brandName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_NUMBERS_PLATE_OF_CAR === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<INumbersPlateOfCarResponse>(
        `${process.env.REACT_APP_GET_NUMBERS_PLATE_OF_CAR}?brand=${brandName}`,
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: err.message,
        });
      }
      return rejectWithValue({
        message: 'Нет данных',
      });
    }
  },
);

export default getNumbersPlateOfCar;
