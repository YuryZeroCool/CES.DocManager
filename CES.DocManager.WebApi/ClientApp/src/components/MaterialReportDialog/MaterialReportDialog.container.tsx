import { AxiosError } from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import printJS from 'print-js';
import deleteAttachedMaterial from '../../redux/actions/report/materialReport/deleteAttachedMaterial';
import deleteDecommissionedMaterial from '../../redux/actions/report/materialReport/deleteDecommissionedMaterial';
import deleteMaterial from '../../redux/actions/report/materialReport/deleteMaterial';
import deleteUsedMaterial from '../../redux/actions/report/materialReport/deleteUsedMaterial';
import getDefectiveSheet from '../../redux/actions/report/materialReport/getDefectiveSheet';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  deleteFromAttachedMaterials,
  deleteFromDecommissionedMaterials,
  deleteFromMaterials,
  deleteFromUsedMaterials,
  resetDefectiveSheet,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import { UserState } from '../../types/UserTypes';
import MaterialReportDialogComponent from './MaterialReportDialog.component';
import {
  toggleAddUsedMaterialModal,
  toggleCarAttachmentModal,
  toggleDetailedInformationModal,
  toggleEditAttachedMaterialModal,
  toggleMaterialReportDialog,
} from '../../redux/reducers/modals/modalsReducer';

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
    period,
    attachedMaterial,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();
  const { role } = useSelector<RootState, UserState>((state) => state.login);
  const canAttachCar = role.toLowerCase() !== 'superadmin';

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
        dispatch(toggleAddUsedMaterialModal(true));
      }
      if (value === 'Удалить' && currentGroupAccount && materialsTableType === 'Свободные' && pageType === 'Материалы') {
        await dispatch(deleteMaterial(rowActiveId));
        dispatch(deleteFromMaterials(rowActiveId));
      }
      if (value === 'Удалить' && materialsTableType === 'Прикрепленные' && pageType === 'Материалы') {
        await dispatch(deleteAttachedMaterial(rowActiveId));
        dispatch(deleteFromAttachedMaterials(rowActiveId));
      }
      if (value === 'Удалить' && materialsTableType === 'Списанные' && pageType === 'Материалы') {
        if (!period || !attachedMaterial.party) {
          throw Error('Упс, что-то пошло не так...');
        }
        await dispatch(deleteUsedMaterial({
          id: rowActiveId,
          nameParty: attachedMaterial.party,
          month: period.month() + 1,
          year: period.year(),
        }));
        dispatch(deleteFromUsedMaterials({ id: rowActiveId, nameParty: attachedMaterial.party }));
      }
      if (value === 'Удалить' && pageType === 'История ремонтов') {
        await dispatch(deleteDecommissionedMaterial(rowActiveId));
        dispatch(deleteFromDecommissionedMaterials(rowActiveId));
      }
      if (value === 'Распечатать' && pageType === 'История ремонтов') {
        await dispatch(getDefectiveSheet(rowActiveId));
      }
      if (value === 'Редактировать' && materialsTableType === 'Прикрепленные' && pageType === 'Материалы') {
        dispatch(toggleEditAttachedMaterialModal(true));
      }
      if (value === 'Прикрепить авто') {
        dispatch(toggleCarAttachmentModal(true));
      }
      if (value === 'Подробнее') {
        dispatch(toggleDetailedInformationModal(true));
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
      canAttachCar={canAttachCar}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClose={handleClose}
    />
  );
}

export default MaterialReportDialogContainer;
