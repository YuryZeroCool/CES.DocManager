export enum ContractTypes {
  oneTime = 'Разовый',
  yearly = 'Годовой',
}

export interface ContractState {
  contractError: string;
  requestStatus: string;
  createdContractId: number | null;
}

export interface SearchContractParams {
  contractType: string;
}

export interface AddContractParams {
  organization: string;
  creationDate: Date;
  startDateOfWork?: Date;
  endDateOfWork?: Date;
  expirationDate?: Date;
  contractNumber: string;
  contractType: string;
}

export interface CreateContractRequest {
  organizationName: string;
  creationDate: string;
  startDateOfWork?: string;
  endDateOfWork?: string;
  expirationDate?: string;
  contractNumber: string;
  contractType: string;
}

export interface CreateContractResponse {
  id: number;
}
