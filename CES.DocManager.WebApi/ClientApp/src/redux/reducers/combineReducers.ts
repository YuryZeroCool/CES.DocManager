import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import medicalCertificatesReducer from './documents/medicalCertificates/medicalCertificatesReducer';
import divisionsReducer from './divisionsReducer';
import fuelReportReducer from './report/fuelReportReducer';
import modalsReducer from './modals/modalsReducer';
import vehicleReducer from './vehicle/vehicleReducer';
import driversReducer from './drivers/driversReducer';
import driverLicenseReducer from './documents/driverLicense/driverLicenseReducer';
import materialsReducer from './report/materialsReducer';
import commonInfoReducer from './commonInfo/commonInfoReducer';
import mesReducer from './mes/mesReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  driverLicense: driverLicenseReducer,
  medicalCertificates: medicalCertificatesReducer,
  divisions: divisionsReducer,
  fuelReport: fuelReportReducer,
  materials: materialsReducer,
  modals: modalsReducer,
  vehicle: vehicleReducer,
  drivers: driversReducer,
  commonInfo: commonInfoReducer,
  mes: mesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
