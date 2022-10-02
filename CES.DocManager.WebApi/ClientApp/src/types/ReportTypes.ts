export interface Division {
  id: number;
  division: string;
}

export interface IDivisionWorkSchedule {
  id: number;
}

export interface IDivisionWorkScheduleRequest {
  division?: string;
  dates?: string[];
}

export interface ICreateDivisionWorkScheduleResponse extends IDivisionWorkScheduleRequest {
  id: number;
}

export type IAllDivisionWorkSchedulesResponse = ICreateDivisionWorkScheduleResponse[];

export interface DivisionWorkScheduleResponse {
  delete?: IDivisionWorkSchedule;
  create?: ICreateDivisionWorkScheduleResponse;
  getAll?: IAllDivisionWorkSchedulesResponse;
}

export interface Party {
  partyId: number;
  partyName: string;
  partyDate: string;
  price: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  party: Party[];
  unit: string;
}

export interface GroupAccount {
  id: number;
  name: string;
}

export type AllMaterialsResponse = Product[];

export type AllGroupAccountsResponse = GroupAccount[];

export type CurrentGroupAccountResponse = string[];

export interface IMaterialsResponse {
  getAllMaterials?: AllMaterialsResponse;
  deleteMaterialId: number;
  getAllGroupAccounts?: AllGroupAccountsResponse;
  currentGroupAccount?: CurrentGroupAccountResponse;
  status: string;
  rowActiveId: number;
  accordionHeight: number;
}

export interface AccountsGroupState {
  name: string;
  checked: boolean;
}
