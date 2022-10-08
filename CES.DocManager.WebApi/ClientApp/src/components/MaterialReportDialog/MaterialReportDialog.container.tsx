import { AxiosError } from 'axios';
import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteAttachedMaterial from '../../redux/actions/report/materialReport/deleteAttachedMaterial';
import deleteMaterial from '../../redux/actions/report/materialReport/deleteMaterial';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleCarAttachmentModal, toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { deleteFromAttachedMaterials } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import MaterialReportDialogComponent from './MaterialReportDialog.component';

interface Props {
  offSetX: number;
  offSetTop: number;
}

function MaterialReportDialogContainer({ offSetX, offSetTop }: Props) {
  const {
    rowActiveId,
    materialsTableType,
    currentGroupAccount,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const handleClose = async (event: SyntheticEvent, value: string) => {
    event?.stopPropagation();
    try {
      if (value === 'Удалить' && currentGroupAccount && materialsTableType === 'Свободные') {
        await dispatch(deleteMaterial(rowActiveId));
        await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
      }
      if (value === 'Удалить' && materialsTableType === 'Прикрепленные') {
        await dispatch(deleteAttachedMaterial(rowActiveId));
        dispatch(deleteFromAttachedMaterials(rowActiveId));
      }
      if (value === 'Прикрепить авто') {
        dispatch(toggleCarAttachmentModal(true));
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        console.log(error.message);
      }
    }
    dispatch(toggleMaterialReportDialog(false));
  };

  return (
    <MaterialReportDialogComponent
      materialsTableType={materialsTableType}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClose={handleClose}
      offSetX={offSetX}
      offSetTop={offSetTop}
    />
  );
}

export default MaterialReportDialogContainer;
