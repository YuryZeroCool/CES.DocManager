import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from '../../../types/type';

const initial: IModal = {
  isMaterialReportDialogOpen: false,
  isCarAttachmentModalOpen: false,
  isAddDriverModalOpen: false,
  isAddMedicalCertificateModalOpen: false,
  isAddDriverLicenseModalOpen: false,
  isAddMaterialsWriteOffModalOpen: false,
  isDetailedInformationModalOpen: false,
  isAddUsedMaterialModalOpen: false,
  isLoaderModalOpen: false,
  isEditAttachedMaterialModalOpen: false,
  isAddActModalOpen: false,
  isEditNoteModalOpen: false,
  isAddOrganizationModalOpen: false,
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
    toggleAddActModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddActModalOpen: action.payload };
      return stateCopy;
    },
    toggleEditNoteModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isEditNoteModalOpen: action.payload };
      return stateCopy;
    },
    toggleAddOrganizationModal: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IModal = state;
      stateCopy = { ...stateCopy, isAddOrganizationModalOpen: action.payload };
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
  toggleDetailedInformationModal,
  toggleAddUsedMaterialModal,
  toggleLoaderModal,
  toggleEditAttachedMaterialModal,
  toggleAddActModal,
  toggleEditNoteModal,
  toggleAddOrganizationModal,
} = modalsReducer.actions;
export default modalsReducer.reducer;
