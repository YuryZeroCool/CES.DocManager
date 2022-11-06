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
  totalSum: number;
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

export interface AllMaterialsResponse {
  totalCount: string;
  totalSum: string;
  data: Product[];
}

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

export interface ITableAttachedMaterials extends IMaterialAttachedResponse {
  currentCount: number;
}

export interface ISearch {
  materialsSearchValue: string;
  attachedMaterialsSearchValue: string;
  decommissionedMaterialsSearchValue: string;
}

export interface IMaterialsResponse {
  uploadMaterialsMessage: string;
  isUploadNewMaterialsLoader: boolean;
  getAllMaterials: Product[];
  totalCount: string;
  totalSum: string;
  allAttachedMaterials: IMaterialAttachedResponse[];
  deletedMaterialId: number;
  getAllGroupAccounts?: AllGroupAccountsResponse;
  currentGroupAccount?: CurrentGroupAccountResponse;
  status: string;
  rowActiveId: number;
  accordionHeight: number;
  attachedMaterial: MaterialAttached;
  createdAttachedMaterial: IMaterialAttachedResponse;
  pageType: string;
  materialsTableType: string;
  deletedAttachedMaterialId: number;
  allMechanics: AllMechanicsResponse[];
  decommissionedMaterial: IDecommissionedMaterialRequest;
  allDecommissionedMaterials: IAllDecommissionedMaterials[];
  defectiveSheet: string;
  actOfWriteoffOfSpareParts: string;
  searchValue: ISearch;
  usedMaterial: IAddUsedMaterialResponse;
}

export interface AccountsGroupState {
  name: string;
  checked: boolean;
}

export interface IMaterialsWriteOffForm {
  currentDate: Date | null;
  mechanic: string;
  car: string;
  materialsByCar: string[];
}

export interface AllMechanicsResponse {
  id: number;
  fio: string;
}

export interface IDecommissionedMaterialRequest {
  carMechanic: string;
  currentDate: Date | null;
  materials: IMaterialAttachedResponse[];
}

export interface IAllDecommissionedMaterials extends IDecommissionedMaterialRequest {
  id: number;
}

export type ReportErrors = {
  reportNameError: boolean;
  periodError: boolean;
};

export type IPeriod = {
  month: number;
  year: number;
};

export interface IAddUsedMaterialRequest {
  partyName: string;
  count: number;
}

export interface IAddUsedMaterialResponse {
  count: number;
  id: number;
  nameMaterial: string;
  nameParty: string;
  partyDate: string;
  price: number;
  unit: string;
}
