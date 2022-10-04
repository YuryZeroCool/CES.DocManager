import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteMaterial from '../../redux/actions/report/materialReport/deleteMaterial';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import MaterialReportDialogComponent from './MaterialReportDialog.component';

interface Props {
  offSetX: number;
  offSetTop: number;
}

function MaterialReportDialogContainer({ offSetX, offSetTop }: Props) {
  const [selectedValue, setSelectedValue] = useState('');

  const { isMaterialReportDialogOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    rowActiveId,
    currentGroupAccount,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const handleClose = async (value: string) => {
    if (value === 'Удалить' && currentGroupAccount) {
      try {
        await dispatch(deleteMaterial(rowActiveId));
        await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          console.log(error.message);
        }
      }
    }
    dispatch(toggleMaterialReportDialog(false));
    setSelectedValue(value);
  };

  return (
    <MaterialReportDialogComponent
      isMaterialReportDialogOpen={isMaterialReportDialogOpen}
      selectedValue={selectedValue}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClose={handleClose}
      offSetX={offSetX}
      offSetTop={offSetTop}
    />
  );
}

export default MaterialReportDialogContainer;
