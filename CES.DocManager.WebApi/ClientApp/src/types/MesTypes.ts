export interface INote {
  id: number;
  date: string;
  comment: string;
  isChecked: boolean;
}

export interface ContactInfo {
  id: number;
  street: string;
  entrance: string;
  houseNumber: string;
  tel: string;
}

export interface INoteContactInfo {
  id: number;
  street: string;
  entrance: number;
  houseNumber: string;
  tel: string;
}

export interface EditNoteRequest {
  id: number;
  date: string;
  comment: string;
  isChecked: boolean;
  noteContactsInfo: ContactInfo[];
}

export interface IFullNoteData extends INote {
  street: string;
  entrance: number;
  houseNumber: string;
  tel: string;
}

export interface Organization {
  name: string;
  payerAccountNumber: string;
  address: string;
  email: string;
  phone: string;
}

export interface OrganizationResponse extends Organization {
  id: number;
}

export interface ISearchOrganization {
  totalPage: number;
  organizations: OrganizationResponse[];
}

export interface INotesState {
  allNotes: INote[];
  allFullNoteData: IFullNoteData[];
  editedNoteId: number;
  selectedNoteId: number;
  requestStatus: string;
  createdOrganization: OrganizationResponse;
  allOrganizations: ISearchOrganization;
  allOrganizationsBySearch: string[],
  deletedOrganizationId: number;
  editedOrganization: OrganizationResponse;
  selectedOrganizationId: number;
  mesPageType: string;
  notesWithoutAct: IFullNoteData[];
  actTypesFromFile: ActTypesFromFileResponse[];
  actDataFromFile: ActDataFromFileResponse;
  totalActSumm: number;
  deletedNoteId: number;
  vat: number;
  streetsBySearch: string[];
  createdActId: number;
  actsList: ActsList[];
  totalActsListCount: number;
  deletedActId: number;
}

export interface SearchOrganization {
  title: string;
  page: number;
  limit: number;
}

export interface HeadSearchCell {
  id: string;
  name: string;
}

export interface SearchValueType {
  id: string;
  value: string;
}

export interface ActTypesFromFileResponse {
  actType: string;
  season: string;
  fileName: string;
}

export interface ActDataFromFileResponse {
  actType: string;
  season: string;
  act: Act[];
}

export interface Act {
  type: string;
  works: Work[];
}

export interface Work {
  name: string;
  unit: string;
  price: number;
  count: string;
  totalSumm: number;
}

export interface UpdateActDataFromFileReq {
  workName: string;
  value: string;
  type: string;
}

export interface AddNewActReq {
  organization: string;
  vehicle: string;
  driver: string;
  actAdditionDate: Date;
  actType: string;
  completedWorks: Work[];
  notesWithoutAct: IFullNoteData[];
  totalActSumm: number;
  vat: number;
}

export interface GetActsListReq {
  min: string;
  max: string;
  page: number;
  limit: number;
}

export interface ActsList {
  id: number;
  actDateOfCreation: string;
  dateOfWorkCompletion: string;
  organization: string;
  total: number;
  vat: number;
  driver: string;
  numberPlateOfCar: string;
  actType: string;
  works: Work[];
  notesWithoutAct: INoteContactInfo[];
}

export interface ActsListRes {
  actsList: ActsList[];
  totalActsListPagesCount: number;
}
