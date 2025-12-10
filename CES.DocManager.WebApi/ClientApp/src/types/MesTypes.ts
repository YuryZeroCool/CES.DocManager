import {
  NoteFullContactInfo,
  NotesWithoutActsParams,
  NoteWithoutAct,
} from './mes/NotesWithoutActTypes';

export interface INotesState {
  mesError: string;
  requestStatus: string;
  mesPageType: string;
  actTypesFromFile: ActTypesFromFileResponse[];
  actDataFromFile: ActDataFromFileResponse;
  totalActSumm: string;
  deletedNoteId: number;
  vat: string;
  createdActId: number;
  actsList: ActsList[];
  totalActsListCount: number;
  selectedActId: number;
  deletedActId: number;
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

export interface ActModalFormState {
  selectedNotes: NoteWithoutAct[];
  organization: string;
  car: string;
  driver: string | null;
  isSigned: boolean;
  actAdditionDate: Date | null;
}

export interface AddNewActReq {
  organization: string;
  vehicle: string;
  driver: string;
  actAdditionDate: string;
  actType: string;
  completedWorks: Work[];
  notesWithoutAct: NoteWithoutAct[];
  totalActSumm: number;
  vat: number;
  isSigned: boolean;
}

export interface GetActsListReq {
  min: string;
  max: string;
  page: number;
  limit: number;
  searchValue: string;
  filter: string;
  organizationType: string;
}

export interface ActsList {
  id: number;
  actDateOfCreation: string;
  dateOfWorkCompletion: string;
  organization: string;
  payerAccountNumber: string;
  total: number;
  vat: number;
  driver: string;
  numberPlateOfCar: string;
  actType: string;
  works: Work[];
  notesWithoutAct: NoteFullContactInfo[];
  isSigned: boolean;
  contractNumber: string;
}

export interface ActsListRes {
  actsList: ActsList[];
  totalActsListPagesCount: number;
}

export interface ActsHistoryParams extends NotesWithoutActsParams {
  organizationType: string;
}
