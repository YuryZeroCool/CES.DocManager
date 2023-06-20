import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllAttachedMaterials from '../../redux/actions/report/materialReport/getAllAttachedMaterials';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleEditNoteModal, toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterial,
  changePeriod,
  changeRowActiveId,
  editAllMaterialsAttachingMaterial,
  resetAllAttachedMaterials,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import NotesTableComponent from './NotesTable.component';
import { INotesState } from '../../types/MesTypes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeEditedNoteId } from '../../redux/reducers/mes/mesReducer';

interface Props {
  mesError: string;
}

function NotesTableContainer(props: Props) {
  const { mesError } = props;

  const { allNotes } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleEditIconClick = (id: number) => {
    dispatch(changeEditedNoteId(id));
    dispatch(toggleEditNoteModal(true));
  };

  return (
    <NotesTableComponent
      allNotes={allNotes}
      mesError={mesError}
      handleEditIconClick={handleEditIconClick}
    />
  );
}

export default NotesTableContainer;
