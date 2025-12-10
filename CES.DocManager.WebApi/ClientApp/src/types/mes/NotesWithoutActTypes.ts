export interface NoteWithoutAct {
  id: number;
  date: string;
  comment: string;
  isChecked: boolean;
  street: string;
  entrance: number;
  houseNumber: string;
  tel: string;
}

export interface NotesWithoutActState {
  notesWithoutActError: string;
  requestStatus: string;
  notesWithoutAct: NoteWithoutAct[];
  selectedNoteId: number;
  streetsBySearch: string[];
}

export interface NotesWithoutActsReq {
  minDate: string;
  maxDate: string;
  filter: string;
  searchValue: string;
  page: number;
  limit: number;
}

export interface NotesWithoutActsParams {
  minDate: Date;
  maxDate: Date;
  filter: string;
  searchValue: string;
  page: number;
  limit: number;
}

export interface ContactInfo {
  id: number;
  street: string;
  entrance: string;
  houseNumber: string;
  tel: string;
}

export interface NoteFullContactInfo {
  id: number;
  street: string;
  entrance: number;
  houseNumber: string;
  tel: string;
  date: string;
}

export interface ExistedNote {
  date: string;
  comment: string;
  isChecked: boolean;
  noteContactsInfo: ContactInfo[];
}

export interface EditNoteRequest extends ExistedNote {
  id: number;
}

export type CreateNoteRequest = ExistedNote;

export interface StreetResponse {
  id: number;
  street: string
}
