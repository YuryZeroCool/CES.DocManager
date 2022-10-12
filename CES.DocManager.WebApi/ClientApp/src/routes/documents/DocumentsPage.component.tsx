import Button from '@mui/material/Button';
import React from 'react';
import AddDriverDocumentsModal from '../../components/AddDriverDocumentsModal/AddDriverDocumentsModal.container';

interface Props {
  handleClick: () => void;
  onClick: () => void;
  isAddMedicalCertificateModalOpen: boolean;
  isAddDriverLicenseModalOpen: boolean;
}

export default function DocumentsPageComponent(props: Props) {
  const {
    handleClick,
    onClick,
    isAddMedicalCertificateModalOpen,
    isAddDriverLicenseModalOpen,
  } = props;

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>Добавить мед.справку</Button>
      <Button variant="contained" onClick={onClick}>Добавить водит. удостоверение</Button>
      {
        (isAddMedicalCertificateModalOpen || isAddDriverLicenseModalOpen)
        && <AddDriverDocumentsModal />
      }
    </div>
  );
}
