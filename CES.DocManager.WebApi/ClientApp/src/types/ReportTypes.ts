import { Dayjs } from 'dayjs';

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

export interface IWorkCard {
  id: number;
  division: string;
  mileagePerMonth: number;
  fuelPerMonth: number;
}

export interface IGetFuelReportInfoResponse {
  id: number;
  carNumber: string;
  workCards: IWorkCard[];
  sumMileage: number;
  sumFuel: number;
}

export interface DivisionData {
  id: number;
  divisionName: string;
  data: IGetFuelReportInfoResponse[];
}

export interface FuelReportResponse {
  deletedDivisionWorkSchedule: IDivisionWorkSchedule;
  createdDivisionWorkSchedule: ICreateDivisionWorkScheduleResponse;
  allDivisionWorkSchedule: IAllDivisionWorkSchedulesResponse;
  status: string;
  fuelReportInfo: IGetFuelReportInfoResponse[];
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

export interface MaterialAttached {
  party?: string;
  count?: number;
  numberPlateOfCar?: string;
  brand?: string;
  unit?: string;
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
  usedMaterialSearchValue: string;
}

export interface IMaterialsResponse {
  uploadMaterialsMessage: string;
  isUploadNewMaterialsLoader: boolean;
  allMaterials: Product[];
  totalCount: string;
  totalSum: string;
  allAttachedMaterials: IMaterialAttachedResponse[];
  deletedMaterialId: number;
  accountsList: AllGroupAccountsResponse;
  currentGroupAccount: string[];
  status: string;
  rowActiveId: number;
  attachedMaterial: MaterialAttached;
  createdAttachedMaterial: IMaterialAttachedResponse;
  pageType: string;
  materialsTableType: string;
  deletedAttachedMaterialId: number;
  allMechanics: AllMechanicsResponse[];
  decommissionedMaterial: IDecommissionedMaterialRequest;
  deletedDecommissionedMaterialId: number;
  allDecommissionedMaterials: IAllDecommissionedMaterials[];
  defectiveSheet: string;
  actOfWriteoffOfSpareParts: string;
  actOfWritingOffMaterials: string;
  searchValue: ISearch;
  usedMaterial: IUsedMaterialResponse;
  allUsedMaterials: IUsedMaterialResponse[];
  isCheckedByDate: boolean;
  editedAttachedMaterial: IMaterialAttachedResponse;
  period: Dayjs | null;
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

export interface IPeriod {
  month: number;
  year: number;
}

export interface IAddUsedMaterialRequest {
  partyName: string;
  count: number;
}

export interface IUsedMaterialResponse {
  count: number;
  id: number;
  nameMaterial: string;
  nameParty: string;
  partyDate: string;
  price: number;
  unit: string;
}

export interface IPatchAttachedMaterialData {
  op: string;
  path: string;
  value: string;
}

export interface IPatchAttachedMaterialRequest {
  id: number;
  data: IPatchAttachedMaterialData[];
}
