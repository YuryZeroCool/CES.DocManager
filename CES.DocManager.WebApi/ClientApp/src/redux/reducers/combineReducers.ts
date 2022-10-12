import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import medicalCertificatesReducer from './documents/medicalCertificates/medicalCertificatesReducer';
import divisionsReducer from './divisionsReducer';
import divisionWorkScheduleReducer from './report/divisionWorkScheduleReducer';
import materialsReducer from './report/materialsReducer';
import modalsReducer from './modals/modalsReducer';
import vehicleReducer from './vehicle/vehicleReducer';
import driversReducer from './drivers/driversReducer';
import driverLicenseReducer from './documents/driverLicense/driverLicenseReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  driverLicense: driverLicenseReducer,
  medicalCertificates: medicalCertificatesReducer,
  divisions: divisionsReducer,
  divisionWorkSchedule: divisionWorkScheduleReducer,
  materials: materialsReducer,
  modals: modalsReducer,
  vehicle: vehicleReducer,
  drivers: driversReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
