export interface INote {
  id: number;
  date: string;
  comment: string;
  isChecked: boolean;
}

export interface ContactInfo {
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

export interface INotesState {
  allNotes: INote[];
  allFullNoteData: IFullNoteData[];
  editedNoteId: number;
}