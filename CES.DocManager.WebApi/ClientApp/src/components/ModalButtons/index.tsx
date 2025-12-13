import React, { memo } from 'react';
import { Button, ButtonProps, Flex } from '@mantine/core';

interface ModalButtonsProps extends ButtonProps {
  confirmBtnTitle: string;
  cancelBtnTitle: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

function ModalButtons(props: ModalButtonsProps) {
  const {
    confirmBtnTitle,
    cancelBtnTitle,
    handleConfirm,
    handleCancel,
    ...rest
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
        disabled={rest.disabled || rest.loading}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...rest}
      >
        {confirmBtnTitle}
      </Button>
    </Flex>
  );
}

export default memo(ModalButtons);
