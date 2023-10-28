import React from 'react';
import WarningModalComponent from './WarningModal.component';

interface WarningModalContainerProps {
  warningModalOpened: boolean;
  cofirmAction: () => void;
  warningModalClose: () => void;
}

function WarningModalContainer(props: WarningModalContainerProps) {
  const { warningModalOpened, warningModalClose, cofirmAction } = props;

  return (
    <WarningModalComponent
      warningModalOpened={warningModalOpened}
      warningModalClose={warningModalClose}
      cofirmAction={cofirmAction}
    />
  );
}

export default WarningModalContainer;
