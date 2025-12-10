import React, { memo } from 'react';
import { Button, Flex } from '@mantine/core';

interface ModalButtonsProps {
  confirmBtnTitle: string;
  cancelBtnTitle: string;
  disabled: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

function ModalButtons(props: ModalButtonsProps) {
  const {
    confirmBtnTitle,
    cancelBtnTitle,
    disabled,
    handleConfirm,
    handleCancel,
  } = props;

  return (
    <Flex justify="flex-end" gap={10}>
      <Button
        variant="outline"
        onClick={handleCancel}
      >
        {cancelBtnTitle}
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
        onClick={handleConfirm}
        disabled={disabled}
      >
        {confirmBtnTitle}
      </Button>
    </Flex>
  );
}

export default memo(ModalButtons);
