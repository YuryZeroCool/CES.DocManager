import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { changeRowActiveId } from '../../redux/reducers/report/materialsReducer';
import { IModal } from '../../types/type';
import MaterialReportPageComponent from './MaterialReportPage.component';

function MaterialReportPageContainer() {
  const [productsTableError, setProductsTableError] = useState<string>('');

  const { isMaterialReportDialogOpen, isCarAttachmentModalOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (isMaterialReportDialogOpen) {
      dispatch(toggleMaterialReportDialog(false));
      dispatch(changeRowActiveId(0));
    }
  };

  return (
    <MaterialReportPageComponent
      productsTableError={productsTableError}
      setProductsTableError={setProductsTableError}
      handleClick={handleClick}
      isCarAttachmentModalOpen={isCarAttachmentModalOpen}
    />
  );
}

export default MaterialReportPageContainer;
