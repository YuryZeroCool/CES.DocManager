import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import getAllNotes from '../../actions/mes/getAllNotes';
import getAllFullNoteData from '../../actions/mes/getAllFullNoteData';
import { INotesState } from '../../../types/MesTypes';

const initial: INotesState = {
  allNotes: [],
  allFullNoteData: [],
  editedNoteId: 0,
};

const vehicleReducer = createSlice({
  name: 'notes',
  initialState: initial,
  reducers: {
    changeEditedNoteId: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, editedNoteId: action.payload };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allNotes: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllFullNoteData.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allFullNoteData: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllFullNoteData.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  changeEditedNoteId,
} = vehicleReducer.actions;

export default vehicleReducer.reducer;
