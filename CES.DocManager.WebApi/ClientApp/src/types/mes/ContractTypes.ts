export enum ContractTypes {
  oneTime = 'Разовый',
  yearly = 'Годовой',
}

export interface SearchContractParams {
  contractType: string;
}

export interface AddContractParams {
  creationDate: Date | null;
  startDateOfWork: Date | null;
  endDateOfWork: Date | null;
  contractNumber: string;
  contractType: string;
}
