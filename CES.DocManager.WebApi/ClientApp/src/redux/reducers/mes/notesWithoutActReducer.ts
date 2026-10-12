/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteNoteWithoutAct, getNotesWithoutActs, getStreetsBySearch,
} from 'redux/actions/mes';
import { NotesWithoutActState, NoteWithoutAct } from 'types/mes/NotesWithoutActTypes';

const initial: NotesWithoutActState = {
  notesWithoutActError: '',
  requestStatus: '',
  notesWithoutAct: [],
  selectedNoteId: 0,
  streetsBySearch: [],
};

const notesWithoutActReducer = createSlice({
  name: 'notesWithoutAct',
  initialState: initial,
  reducers: {
    editNotesAfterUpdate: (state, action: PayloadAction<NoteWithoutAct[]>) => {
      const updatedNotesWithoutAct = [...state.notesWithoutAct];

      action.payload.forEach((updatedNote) => {
        const existingIndex = updatedNotesWithoutAct.findIndex(
          (note) => note.id === updatedNote.id,
        );

        if (existingIndex !== -1) {
          updatedNotesWithoutAct[existingIndex] = updatedNote;
        } else {
          updatedNotesWithoutAct.push(updatedNote);
        }
      });

      updatedNotesWithoutAct.sort((a, b) => new Date(b.date).getTime()
        - new Date(a.date).getTime());

      state.notesWithoutAct = updatedNotesWithoutAct;
    },
    editNotesWithoutActAfterAddAct: (state, action: PayloadAction<number[]>) => {
      state.notesWithoutAct = state.notesWithoutAct.filter(
        (obj) => !action.payload.includes(obj.id),
      );
    },
    changeSelectedNoteId: (state, action: PayloadAction<number>) => {
      state.selectedNoteId = action.payload;
    },
    resetStreetsBySearch: (state) => {
      state.streetsBySearch = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesWithoutActs.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(getNotesWithoutActs.fulfilled, (state, action) => {
      state.notesWithoutAct = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getNotesWithoutActs.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.notesWithoutActError = action.payload?.message || 'Список заявок не был получен';
    });

    builder.addCase(deleteNoteWithoutAct.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(deleteNoteWithoutAct.rejected, (state, action) => {
      state.notesWithoutActError = action.payload?.message || 'Заявка не была удалена';
    });

    builder.addCase(getStreetsBySearch.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(getStreetsBySearch.fulfilled, (state, action) => {
      state.streetsBySearch = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getStreetsBySearch.rejected, (state, action) => {
      state.streetsBySearch = [];
      state.notesWithoutActError = action.payload?.message || 'Нет данных по запросу';
    });
  },
});

export const {
  editNotesAfterUpdate,
  editNotesWithoutActAfterAddAct,
  changeSelectedNoteId,
  resetStreetsBySearch,
} = notesWithoutActReducer.actions;

export default notesWithoutActReducer.reducer;
