import React, { memo } from 'react';
import { Modal, Stack, Text } from '@mantine/core';

interface ContractModalProps {
  addContractModalOpened: boolean;
  addContractModalClose: () => void;
}

function ContractModal(props: ContractModalProps) {
  const { addContractModalOpened, addContractModalClose } = props;

  return (
    <Modal
      opened={addContractModalOpened}
      onClose={addContractModalClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      lockScroll={false}
      title="Добавить договор"
      styles={{
        content: { flex: '0 0 600px', borderRadius: 10 },
      }}
    >
      <Stack>
        <Text>Добавить договор</Text>
      </Stack>
    </Modal>
  );
}

export default memo(ContractModal);
