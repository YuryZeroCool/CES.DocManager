import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../../types/type';

const initial: IModal = {
  isMaterialReportDialogOpen: false,
  isMaterialReportModalOpen: false,
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState: initial,
  reducers: {
    toggleMaterialReportDialog: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isMaterialReportDialogOpen: action.payload };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleMaterialReportDialog,
} = modalsReducer.actions;
export default modalsReducer.reducer;
