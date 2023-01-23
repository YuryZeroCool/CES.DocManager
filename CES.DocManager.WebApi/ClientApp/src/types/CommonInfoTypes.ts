export interface EmployeeInfo {
  id: number;
  garageNumber: number;
  vehicleModel: string;
  numberPlateOfCar: string;
  fio: string;
  personnelNumber: number;
  serialNumberOfDriverLicense: string;
  expiryDateOfDriverLicense: Date | null;
  isActiveDriverLicense: boolean;
  serialNumberOfMedicalCertificate: string;
  expiryDateOfMedicalCertificate: string;
  isActiveMedicalCertificate: boolean;
}

export interface CommonInfo {
  id: number;
  commonInfo: EmployeeInfo[];
  division: string;
}

export interface CommonInfoResponse {
  allcommonInfo: CommonInfo[];
}
