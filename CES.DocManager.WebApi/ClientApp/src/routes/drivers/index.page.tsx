import React from 'react';
import {
  Button,
  Container,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddDriverModal from './components/AddDriverModal';

function DriversPage() {
  const [
    addDriverModalOpened,
    { open: addDriverModalOpen, close: addDriverModalClose },
  ] = useDisclosure(false);

  const handleAddDriverBtnClick = () => {
    addDriverModalOpen();
  };

  return (
    <Container
      size={1440}
      display="flex"
      style={{ flexDirection: 'column', gap: 40 }}
      pt={30}
    >
      <Title c="#FFF" fz={18}>Водители</Title>

      <Group>
        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={handleAddDriverBtnClick}
        >
          Добавить водителя
        </Button>
      </Group>

      {addDriverModalOpened && (
        <AddDriverModal
          addDriverModalOpened={addDriverModalOpened}
          addDriverModalClose={addDriverModalClose}
        />
      )}
    </Container>
  );
}

export default DriversPage;
