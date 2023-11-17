import React from 'react';
import ModalButtonsComponent from './ModalButtons.component';

interface ModalButtonsContainerProps {
  confirmBtnTitle: string;
  cancelBtnTitle: string;
  disabled: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ModalButtonsContainer(props: ModalButtonsContainerProps) {
  const {
    confirmBtnTitle,
    cancelBtnTitle,
    disabled,
    handleConfirm,
    handleCancel,
  } = props;

  return (
    <ModalButtonsComponent
      confirmBtnTitle={confirmBtnTitle}
      cancelBtnTitle={cancelBtnTitle}
      disabled={disabled}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
    />
  );
}
