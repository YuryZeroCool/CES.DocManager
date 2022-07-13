import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INoDriverMedicalCertificate } from '../../../../types/DocumentType';
import getDriversWithoutMedicalCertificate from '../../../actions/documents/driversWithoutMedicalCertificateRedux';

export type FullName = {
  id: number,
  driversFullName: string,
};

type Medical = {
  currentValue: string;
  fullName: FullName[];
};
const initial: Medical = {
  currentValue: '',
  fullName: [],
};
const driversWithoutMedicalCertificateReducer = createSlice({
  name: 'driversWithoutMedicalCertificate',
  initialState: initial,
  reducers: {
    deleteDriver: (state, action: PayloadAction<INoDriverMedicalCertificate>) => {
      const stateCopy = state;
      const date = stateCopy.fullName.filter((x: FullName) => x.driversFullName !== `${action.payload.lastName} ${action.payload.firstName}`);
      stateCopy.fullName = date;
      return stateCopy;
    },
    clearState: () => initial,
    changeCurrentValue: (state, action: PayloadAction<string>) => {
      const stateCopy = state;
      stateCopy.currentValue = action.payload;
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDriversWithoutMedicalCertificate.pending, (state) => {
      const stateCopy = state;
      console.log('loading');
    });
    builder.addCase(
      getDriversWithoutMedicalCertificate.fulfilled,
      (state, action: PayloadAction<INoDriverMedicalCertificate[]>) => {
        const stateCopy = state;
        if (typeof action.payload !== 'undefined') {
          console.log(action.payload);
          action.payload.map((x) => {
            const driverFullName: FullName = {
              id: x.id,
              driversFullName: `${x.lastName} ${x.firstName}`,
            };
            stateCopy.fullName.push(driverFullName);

            return stateCopy;
          });
        }
      },
    );
    builder.addCase(getDriversWithoutMedicalCertificate.rejected, (state, action) => {
    });
  },
});

export const {
  deleteDriver,
  clearState,
  changeCurrentValue,
} = driversWithoutMedicalCertificateReducer.actions;
export default driversWithoutMedicalCertificateReducer.reducer;
