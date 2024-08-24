import React from 'react';
import {
  Button,
  Container,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddDriverDocumentsModal from './components/AddDriverDocumentsModal';

function DocumentsPage() {
  const [
    addMedicalCertificateModalOpened,
    { open: addMedicalCertificateModalOpen, close: addMedicalCertificateModalClose },
  ] = useDisclosure(false);

  const [
    addDriverLicenseModalOpened,
    { open: addDriverLicenseModalOpen, close: addDriverLicenseModalClose },
  ] = useDisclosure(false);

  const handleMedicalCertificateBtnClick = () => {
    addMedicalCertificateModalOpen();
  };

  const handleDriverLicenseBtnClick = () => {
    addDriverLicenseModalOpen();
  };

  return (
    <Container
      size={1440}
      display="flex"
      style={{ flexDirection: 'column', gap: 40 }}
      pt={30}
    >
      <Title c="#FFF" fz={18}>Документы</Title>

      <Group>
        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={handleMedicalCertificateBtnClick}
        >
          Добавить мед.справку
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={handleDriverLicenseBtnClick}
        >
          Добавить водит. удостоверение
        </Button>
      </Group>

      {(addMedicalCertificateModalOpened || addDriverLicenseModalOpened) && (
        <AddDriverDocumentsModal
          addMedicalCertificateModalOpened={addMedicalCertificateModalOpened}
          addDriverLicenseModalOpened={addDriverLicenseModalOpened}
          addMedicalCertificateModalClose={addMedicalCertificateModalClose}
          addDriverLicenseModalClose={addDriverLicenseModalClose}
        />
      )}
    </Container>
  );
}

export default DocumentsPage;
