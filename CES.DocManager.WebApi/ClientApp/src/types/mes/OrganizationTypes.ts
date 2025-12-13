import { ContractTypes } from './ContractTypes';

export interface Organization {
  name: string;
  payerAccountNumber: string;
  address: string;
  email: string;
  phone: string;
  organizationType: string | null;
}

export interface OrganizationList {
  totalPage: number;
  organizations: OrganizationResponse[];
}

export interface OrganizationResponse extends Organization {
  id: number;
}

export interface SearchOrganizationParams {
  title: string;
  page: number;
  limit: number;
}

export interface OrganizationType {
  id: number;
  name: string;
}

export interface OrganizationState {
  organizationError: string;
  requestStatus: string;
  createdOrganization: OrganizationResponse;
  allOrganizations: OrganizationList;
  allOrganizationsBySearch: string[],
  deletedOrganizationId: number;
  editedOrganization: OrganizationResponse;
  selectedOrganizationId: number;
  organizationTypes: OrganizationType[];
  nextContractNumber: GetNextContractNumberResponse | null;
}

export interface GetNextContractNumberResponse {
  exist: boolean;
  nextContractNumber?: number;
}

export interface GetNextContractNumberParams {
  organizationName: string;
  date: string;
  contractType: ContractTypes;
}
