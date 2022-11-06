export type ShowWindow = {
  isOpen: boolean;
  drLicenseIsOpen: boolean;
  medicalCertificate: boolean;
};

export type FetchTodosError = {
  message: string;
};

export interface IModal {
  isMaterialReportDialogOpen: boolean;
  isCarAttachmentModalOpen: boolean;
  isAddDriverModalOpen: boolean;
  isAddMedicalCertificateModalOpen: boolean;
  isAddDriverLicenseModalOpen: boolean;
  isAddMaterialsWriteOffModalOpen: boolean;
  isDetailedInformationModalOpen: boolean;
  isAddUsedMaterialModalOpen: boolean;
  isLoaderModalOpen: boolean;
}
