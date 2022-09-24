export interface IMedicalCertificate {
  fullName: string,
  serialNumber: string,
  issueDate: Date | null,
  expiryDate: Date | null,
}

export interface INoDriverMedicalCertificate {
  id: number,
  firstName: string,
  lastName: string,
}

export interface IMedicalCertificateRequest {
  firstName: string,
  lastName: string,
  serialNumber: string,
  issueDate: Date | null,
  expiryDate: Date | null,
}

export type FullName = {
  id: number,
  driversFullName: string,
};

export type Medical = {
  currentValue: string;
  fullName: FullName[];
};
