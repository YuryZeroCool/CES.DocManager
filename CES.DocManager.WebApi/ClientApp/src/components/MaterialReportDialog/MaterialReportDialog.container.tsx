import { AxiosError } from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import printJS from 'print-js';
import deleteAttachedMaterial from '../../redux/actions/report/materialReport/deleteAttachedMaterial';
import deleteMaterial from '../../redux/actions/report/materialReport/deleteMaterial';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import getDefectiveSheet from '../../redux/actions/report/materialReport/getDefectiveSheet';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleCarAttachmentModal, toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { deleteFromAttachedMaterials, resetDefectiveSheet } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import MaterialReportDialogComponent from './MaterialReportDialog.component';

interface Props {
  offSetX: number;
  offSetTop: number;
  isDialogHightBigger: boolean;
}

function MaterialReportDialogContainer({ offSetX, offSetTop, isDialogHightBigger }: Props) {
  const {
    rowActiveId,
    materialsTableType,
    currentGroupAccount,
    pageType,
    defectiveSheet,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const [dialogError, setDialogError] = useState<string>('');

  useEffect(() => {
    if (defectiveSheet !== '') {
      printJS({ printable: defectiveSheet, type: 'pdf', base64: true });
      dispatch(resetDefectiveSheet());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defectiveSheet]);

  const handleClose = async (event: SyntheticEvent, value: string) => {
    event?.stopPropagation();
    try {
      if (value === 'Списать' && materialsTableType === 'Свободные' && pageType === 'Материалы') {
        console.log('write-off the material');
      }
      if (value === 'Удалить' && currentGroupAccount && materialsTableType === 'Свободные' && pageType === 'Материалы') {
        await dispatch(deleteMaterial(rowActiveId));
        await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
      }
      if (value === 'Удалить' && materialsTableType === 'Прикрепленные' && pageType === 'Материалы') {
        await dispatch(deleteAttachedMaterial(rowActiveId));
        dispatch(deleteFromAttachedMaterials(rowActiveId));
      }
      if (value === 'Удалить' && pageType === 'История ремонтов') {
        console.log('delete from history of repairs');
      }
      if (value === 'Распечатать' && pageType === 'История ремонтов') {
        await dispatch(getDefectiveSheet(rowActiveId));
      }
      if (value === 'Редактировать' && materialsTableType === 'Прикрепленные' && pageType === 'Материалы') {
        console.log('edit attached material');
      }
      if (value === 'Прикрепить авто') {
        dispatch(toggleCarAttachmentModal(true));
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setDialogError(error.message);
      }
    }
    dispatch(toggleMaterialReportDialog(false));
  };

  return (
    <MaterialReportDialogComponent
      materialsTableType={materialsTableType}
      offSetX={offSetX}
      offSetTop={offSetTop}
      isDialogHightBigger={isDialogHightBigger}
      pageType={pageType}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClose={handleClose}
    />
  );
}

export default MaterialReportDialogContainer;
