import React from 'react';
import DetailsInfoPanelComponent from './DetailsInfoPanel.component';
import { ActsList } from '../../types/MesTypes';

interface DetailsInfoPanelContainerProps {
  currentAct: ActsList | null;
  detailsInfoPanelOpen: boolean;
  handleDrawerClose: () => void;
}

function DetailsInfoPanelContainer(props: DetailsInfoPanelContainerProps) {
  const { currentAct, detailsInfoPanelOpen, handleDrawerClose } = props;

  return (
    <DetailsInfoPanelComponent
      currentAct={currentAct}
      detailsInfoPanelOpen={detailsInfoPanelOpen}
      handleDrawerClose={handleDrawerClose}
    />
  );
}

export default DetailsInfoPanelContainer;
