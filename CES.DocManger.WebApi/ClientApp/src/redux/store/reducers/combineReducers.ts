import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import exringDriverLicenseReducer from './home/driverLicenseReducer';
import exringMedicalCertificatesReducer from './home/medicalCertificatesReducer';
import driversWithoutMedicalCertificateReducer from './documents/driversWithoutMedicalCertificateReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  exringDriverLicense: exringDriverLicenseReducer,
  exringMedicalCertificates: exringMedicalCertificatesReducer,
  driversWithoutMedicalCertificate: driversWithoutMedicalCertificateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
