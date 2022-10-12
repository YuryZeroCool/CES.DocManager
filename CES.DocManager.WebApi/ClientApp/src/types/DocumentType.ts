export interface IDriverDocumentsForm {
  fullName: string,
  serialNumber: string,
  issueDate: Date | null,
  expiryDate: Date | null,
  category?: string | undefined,
}

export interface IDriverWithoutDocuments {
  id: number,
  firstName: string,
  lastName: string,
}

export interface IDriverDocumentsRequest {
  firstName: string,
  lastName: string,
  serialNumber: string,
  issueDate: Date | null,
  expiryDate: Date | null,
  category?: string | undefined,
}

export interface IDriverDocumentsResponse extends IDriverDocumentsRequest {
  id: number;
}

export type FullName = {
  id: number,
  driversFullName: string,
};

export interface IExpiringDocumentsResponse {
  id: number;
  bthDate: string;
  expiryDate: string;
  divisionNumber: string;
  firstName: string;
  lastName: string;
}

export interface IMedicalCertificates {
  expiringMedicalCertificate: IExpiringDocumentsResponse[];
  createdMedicalCertificate: IDriverDocumentsResponse;
  driversWithoutMedicalCertificates: FullName[];
}

export interface IDriverLicenses {
  expiringDriverLicenses: IExpiringDocumentsResponse[];
  createdDriverLicense: IDriverDocumentsResponse;
  driversWithoutDriverLicense: FullName[];
}
