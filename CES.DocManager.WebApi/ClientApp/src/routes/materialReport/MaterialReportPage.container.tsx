import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllDecommissionedMaterials from '../../redux/actions/report/materialReport/getAllDecommissionedMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { changePageType, changeRowActiveId } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import MaterialReportPageComponent from './MaterialReportPage.component';

function MaterialReportPageContainer() {
  const [productsTableError, setProductsTableError] = useState<string>('');

  const {
    isMaterialReportDialogOpen,
    isCarAttachmentModalOpen,
    isAddMaterialsWriteOffModalOpen,
  } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    materialsTableType,
    pageType,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getDecommissionedMaterials(): Promise<void> {
      if (pageType === 'История ремонтов') {
        try {
          await dispatch(getAllDecommissionedMaterials(''));
        } catch (error) {
          if (error instanceof Error || error instanceof AxiosError) {
            setProductsTableError(error.message);
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDecommissionedMaterials();
  }, [dispatch, pageType]);

  const handleClick = () => {
    if (isMaterialReportDialogOpen) {
      dispatch(toggleMaterialReportDialog(false));
      dispatch(changeRowActiveId(0));
    }
  };

  const handleHistoryBtnClick = () => {
    dispatch(changePageType('История ремонтов'));
  };

  const handleMaterialsBtnClick = () => {
    dispatch(changePageType('Материалы'));
  };

  return (
    <MaterialReportPageComponent
      productsTableError={productsTableError}
      setProductsTableError={setProductsTableError}
      handleClick={handleClick}
      isCarAttachmentModalOpen={isCarAttachmentModalOpen}
      isAddMaterialsWriteOffModalOpen={isAddMaterialsWriteOffModalOpen}
      materialsTableType={materialsTableType}
      pageType={pageType}
      handleHistoryBtnClick={handleHistoryBtnClick}
      handleMaterialsBtnClick={handleMaterialsBtnClick}
    />
  );
}

export default MaterialReportPageContainer;
