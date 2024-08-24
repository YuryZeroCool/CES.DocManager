import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../../types/type';

const initial: IModal = {
  isMaterialReportDialogOpen: false,
  isCarAttachmentModalOpen: false,
  isAddMaterialsWriteOffModalOpen: false,
  isDetailedInformationModalOpen: false,
  isAddUsedMaterialModalOpen: false,
  isLoaderModalOpen: false,
  isEditAttachedMaterialModalOpen: false,
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
    toggleAddMaterialsWriteOffModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddMaterialsWriteOffModalOpen: action.payload };
      return stateCopy;
    },
    toggleDetailedInformationModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isDetailedInformationModalOpen: action.payload };
      return stateCopy;
    },
    toggleAddUsedMaterialModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddUsedMaterialModalOpen: action.payload };
      return stateCopy;
    },
    toggleLoaderModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isLoaderModalOpen: action.payload };
      return stateCopy;
    },
    toggleEditAttachedMaterialModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isEditAttachedMaterialModalOpen: action.payload };
      return stateCopy;
    },
  },
  extraReducers: () => {},
});

export const {
  toggleMaterialReportDialog,
  toggleCarAttachmentModal,
  toggleAddMaterialsWriteOffModal,
  toggleDetailedInformationModal,
  toggleAddUsedMaterialModal,
  toggleLoaderModal,
  toggleEditAttachedMaterialModal,
} = modalsReducer.actions;

export default modalsReducer.reducer;
