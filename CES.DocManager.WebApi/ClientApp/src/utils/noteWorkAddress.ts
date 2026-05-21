import { NoteWithoutAct } from 'types/mes/NotesWithoutActTypes';

export interface NoteWorkAddress {
  street: string;
  houseNumber: string;
}

const normalize = (value: string) => value.trim().toLowerCase();

export function getSharedNotesWorkAddress(notes: NoteWithoutAct[]): NoteWorkAddress | null {
  if (notes.length === 0) {
    return null;
  }

  const firstStreet = normalize(notes[0].street);
  const firstHouse = normalize(notes[0].houseNumber);

  if (!firstStreet || !firstHouse) {
    return null;
  }

  const allSame = notes.every(
    (note) => normalize(note.street) === firstStreet
      && normalize(note.houseNumber) === firstHouse,
  );

  if (!allSame) {
    return null;
  }

  return {
    street: notes[0].street.trim(),
    houseNumber: notes[0].houseNumber.trim(),
  };
}
