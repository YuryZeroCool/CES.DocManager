import React from 'react';
import {
  Button,
  Flex,
  Modal,
  Stack,
  Title,
} from '@mantine/core';

interface WarningModalComponentProps {
  warningModalOpened: boolean;
  warningModalClose: () => void;
  cofirmAction: () => void;
}

export default function WarningModalComponent(props: WarningModalComponentProps) {
  const {
    warningModalOpened,
    warningModalClose,
    cofirmAction,
  } = props;

  return (
    <Modal
      opened={warningModalOpened}
      onClose={warningModalClose}
      centered
      withCloseButton
    >
      <Stack>
        <Title variant="h6" order={2} mb={3}>
          Вы уверены, что хотите удалить эту запись?
        </Title>
        <Flex gap={3} direction="row" justify="space-evenly">
          <Button
            onClick={warningModalClose}
            variant="outlined"
            w={150}
          >
            Отменить
          </Button>
          <Button
            onClick={cofirmAction}
            variant="contained"
            w={150}
          >
            Удалить
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
