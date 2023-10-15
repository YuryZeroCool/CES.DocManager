export interface INote {
  id: number;
  date: string;
  comment: string;
  isChecked: boolean;
}

export interface ContactInfo {
  id: number;
  address: string;
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
  address: string;
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
  count: number;
  totalSumm: number;
}

export interface UpdateActDataFromFileReq {
  workName: string;
  value: string;
  type: string;
}
