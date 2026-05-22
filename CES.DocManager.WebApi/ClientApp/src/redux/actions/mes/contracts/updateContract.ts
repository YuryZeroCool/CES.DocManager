import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/loginHttp';
import { FetchTodosError } from 'types/type';
import {
  Contract,
  CreateContractRequest,
  UpdateContractRequest,
} from 'types/mes/ContractTypes';

const updateContract = createAsyncThunk<Contract,
UpdateContractRequest, { rejectValue: FetchTodosError }>(
  'updateContract',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_UPDATE_CONTRACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const { id, ...body } = req;
      const requestBody: CreateContractRequest = {
        contractType: body.contractType,
        organizationName: body.organizationName,
        contractNumber: body.contractNumber,
        creationDate: body.creationDate,
        startDateOfWork: body.startDateOfWork,
        endDateOfWork: body.endDateOfWork,
        expirationDate: body.expirationDate,
        isPrinted: false,
      };
      const response = await $api.put<Contract>(
        `${process.env.REACT_APP_UPDATE_CONTRACT}/${id}`,
        requestBody,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось обновить договор.',
      });
    }
  },
);

export default updateContract;
