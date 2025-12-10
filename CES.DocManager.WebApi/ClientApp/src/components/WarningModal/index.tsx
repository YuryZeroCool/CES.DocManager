import React, { memo } from 'react';
import {
  Button, Flex, Modal, Stack, Title,
} from '@mantine/core';

interface WarningModalProps {
  warningModalOpened: boolean;
  cofirmAction: () => void;
  warningModalClose: () => void;
}

function WarningModal(props: WarningModalProps) {
  const { warningModalOpened, warningModalClose, cofirmAction } = props;

  return (
    <Modal
      opened={warningModalOpened}
      onClose={warningModalClose}
      centered
      lockScroll={false}
      withCloseButton
    >
      <Stack>
        <Title size="h3" mb={3} ta="center">
          Вы уверены, что хотите удалить эту запись?
        </Title>
        <Flex gap={3} direction="row" justify="space-evenly">
          <Button
            onClick={warningModalClose}
            variant="light"
            w={150}
          >
            Отменить
          </Button>
          <Button
            onClick={cofirmAction}
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            w={150}
          >
            Удалить
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}

export default memo(WarningModal);
