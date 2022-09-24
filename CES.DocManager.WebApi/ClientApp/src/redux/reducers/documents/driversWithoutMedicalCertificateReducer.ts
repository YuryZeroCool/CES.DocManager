import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullName, INoDriverMedicalCertificate, Medical } from '../../../types/DocumentType';
import getDriversWithoutMedicalCertificate from '../../actions/documents/getDriversWithoutMedicalCertificate';

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
    builder.addCase(
      getDriversWithoutMedicalCertificate.fulfilled,
      (state, action: PayloadAction<INoDriverMedicalCertificate[]>) => {
        const stateCopy = state;
        if (typeof action.payload !== 'undefined') {
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
      throw Error(action.payload?.message);
    });
  },
});

export const {
  deleteDriver,
  clearState,
  changeCurrentValue,
} = driversWithoutMedicalCertificateReducer.actions;
export default driversWithoutMedicalCertificateReducer.reducer;
