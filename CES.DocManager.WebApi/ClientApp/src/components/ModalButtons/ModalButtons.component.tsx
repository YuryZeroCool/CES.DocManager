import React from 'react';
import { Button, Flex } from '@mantine/core';

interface ModalButtonsComponentProps {
  confirmBtnTitle: string;
  cancelBtnTitle: string;
  disabled: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ModalButtonsComponent(props: ModalButtonsComponentProps) {
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
