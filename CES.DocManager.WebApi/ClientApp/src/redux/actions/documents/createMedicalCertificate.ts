import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IDriverDocumentsRequest, IDriverDocumentsResponse } from '../../../types/DocumentType';
import { FetchTodosError } from '../../../types/type';

const createMedicalCertificate = createAsyncThunk<IDriverDocumentsResponse,
IDriverDocumentsRequest, { rejectValue: FetchTodosError }>(
  'createMedicalCertificate',
  async (medical: IDriverDocumentsRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<IDriverDocumentsResponse>(`${process.env.REACT_APP_CREATE_MEDICAL_CERTIFICATE}`, medical);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Медицинская справка не была создана',
      });
    }
  },
);

export default createMedicalCertificate;
