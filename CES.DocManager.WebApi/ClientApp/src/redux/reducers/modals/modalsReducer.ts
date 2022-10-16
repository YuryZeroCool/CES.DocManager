import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../../types/type';

const initial: IModal = {
  isMaterialReportDialogOpen: false,
  isCarAttachmentModalOpen: false,
  isAddDriverModalOpen: false,
  isAddMedicalCertificateModalOpen: false,
  isAddDriverLicenseModalOpen: false,
  isAddMaterialsWriteOffModalOpen: false,
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
    toggleAddDriverModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddDriverModalOpen: action.payload };
      return stateCopy;
    },
    toggleAddMedicalCertificateModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddMedicalCertificateModalOpen: action.payload };
      return stateCopy;
    },
    toggleAddDriverLicenseModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddDriverLicenseModalOpen: action.payload };
      return stateCopy;
    },
    toggleAddMaterialsWriteOffModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddMaterialsWriteOffModalOpen: action.payload };
      return stateCopy;
    },
  },
  extraReducers: () => {},
});

export const {
  toggleMaterialReportDialog,
  toggleCarAttachmentModal,
  toggleAddDriverModal,
  toggleAddMedicalCertificateModal,
  toggleAddDriverLicenseModal,
  toggleAddMaterialsWriteOffModal,
} = modalsReducer.actions;
export default modalsReducer.reducer;
