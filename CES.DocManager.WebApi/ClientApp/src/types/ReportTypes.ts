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

export interface MaterialAttached {
  party?: string;
  count?: number;
  numberPlateOfCar?: string;
  brand?: string;
}

export interface IMaterialAttachedResponse {
  id: number;
  nameMaterial: string;
  nameParty: string;
  partyDate: string;
  unit: string;
  price: number;
  count: number;
  dateCreated: string;
  vehicleBrand: string;
  vehicleModel: string;
  numberPlateCar: string;
  accountName: string;
}

export interface IMaterialsResponse {
  getAllMaterials?: AllMaterialsResponse;
  deleteMaterialId: number;
  getAllGroupAccounts?: AllGroupAccountsResponse;
  currentGroupAccount?: CurrentGroupAccountResponse;
  status: string;
  rowActiveId: number;
  accordionHeight: number;
  attachedMaterial: MaterialAttached;
  createdAttachedMaterial: IMaterialAttachedResponse;
}

export interface AccountsGroupState {
  name: string;
  checked: boolean;
}
