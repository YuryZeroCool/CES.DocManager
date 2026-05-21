import { Organization } from './OrganizationTypes';
import ContractTypes from './ContractTypesEnum';

export { ContractTypes };

export interface Contract {
  id: number;
  contractType: string;
  organizationName: string;
  contractNumber: string;
  creationDate: string;
  startDateOfWork?: string;
  endDateOfWork?: string;
  expirationDate?: string;
  isPrinted: boolean;
  hasLinkedAct?: boolean;
  actsCount?: number;
  organization?: Organization;
}

export interface ContractState {
  contractError: string;
  requestStatus: string;
  contractsList: Contract[];
  contractsListForSelect: Contract[];
  selectedContractType: ContractTypes;
}

export interface SearchContractParams {
  contractType: string;
  minDate: Date;
  maxDate: Date;
  searchValue: string;
  filter: string;
}

export interface GetContractsListReq {
  min: string;
  max: string;
  searchValue: string;
  filter: string;
  contractType: string;
}

export interface ContractsListRes {
  contractsList: Contract[];
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

export type CreateContractRequest = Omit<Contract, 'id' | 'hasLinkedAct'>;

export type CreateContractResponse = Contract;

export interface GetContractsListForSelectReq {
  organizationName: string;
  date: string;
  street?: string;
  houseNumber?: string;
}

export interface GetContractsListForSelectRes {
  contracts: Contract[];
}
