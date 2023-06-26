import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleEditNoteModal } from '../../redux/reducers/modals/modalsReducer';
import NotesTableComponent from './NotesTable.component';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId } from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';

interface Props {
  mesError: string;
}

function NotesTableContainer(props: Props) {
  const { mesError } = props;

  const {
    allNotes,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedNoteId(id));
    dispatch(toggleEditNoteModal(true));
  };

  return (
    <NotesTableComponent
      allNotes={allNotes}
      mesError={mesError}
      requestStatus={requestStatus}
      handleEditIconClick={handleEditIconClick}
    />
  );
}

export default NotesTableContainer;
