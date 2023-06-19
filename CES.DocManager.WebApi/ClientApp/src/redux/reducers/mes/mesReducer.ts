import { createSlice } from '@reduxjs/toolkit';
import getAllNotes from '../../actions/mes/getAllNotes';
import getAllFullNoteData from '../../actions/mes/getAllFullNoteData';
import { INotesState } from '../../../types/MesTypes';

const initial: INotesState = {
  allNotes: [],
  allFullNoteData: [],
};

const vehicleReducer = createSlice({
  name: 'notes',
  initialState: initial,
  reducers: {},
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

export default vehicleReducer.reducer;
