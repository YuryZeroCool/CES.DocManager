import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../../types/type';

const initial: IModal = {
  isMaterialReportDialogOpen: false,
  isCarAttachmentModalOpen: false,
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
    toggleCarAttachmentModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isCarAttachmentModalOpen: action.payload };
      return stateCopy;
    },
  },
  extraReducers: () => {},
});

export const {
  toggleMaterialReportDialog,
  toggleCarAttachmentModal,
} = modalsReducer.actions;
export default modalsReducer.reducer;
