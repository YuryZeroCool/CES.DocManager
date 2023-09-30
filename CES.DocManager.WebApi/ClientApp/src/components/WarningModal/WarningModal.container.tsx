import React from 'react';
import WarningModalComponent from './WarningModal.component';

interface WarningModalContainerProps {
  open: boolean;
  cofirmAction: () => void;
  handleClose: () => void;
}

function WarningModalContainer(props: WarningModalContainerProps) {
  const { open, handleClose, cofirmAction } = props;

  return (
    <WarningModalComponent
      open={open}
      handleClose={handleClose}
      cofirmAction={cofirmAction}
    />
  );
}

export default WarningModalContainer;
