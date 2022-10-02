import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import medicalCertificatesReducer from './medicalCertificates/medicalCertificatesReducer';
import driversWithoutMedicalCertificateReducer from './documents/driversWithoutMedicalCertificateReducer';
import divisionsReducer from './divisionsReducer';
import divisionWorkScheduleReducer from './report/divisionWorkScheduleReducer';
import driverLicenseReducer from './driverLicense/driverLicenseReducer';
import materialsReducer from './report/materialsReducer';
import modalsReducer from './modals/modalsReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  driverLicense: driverLicenseReducer,
  medicalCertificates: medicalCertificatesReducer,
  driversWithoutMedicalCertificate: driversWithoutMedicalCertificateReducer,
  divisions: divisionsReducer,
  divisionWorkSchedule: divisionWorkScheduleReducer,
  materials: materialsReducer,
  modals: modalsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
