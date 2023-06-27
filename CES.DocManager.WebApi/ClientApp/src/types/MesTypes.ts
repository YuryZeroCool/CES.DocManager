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

export interface INotesState {
  allNotes: INote[];
  allFullNoteData: IFullNoteData[];
  editedNoteId: number;
  selectedNoteId: number;
  requestStatus: string;
  createdOrganization: Organization;
}
