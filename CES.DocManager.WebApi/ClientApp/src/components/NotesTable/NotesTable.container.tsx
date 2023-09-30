import React from 'react';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleEditNoteModal } from '../../redux/reducers/modals/modalsReducer';
import NotesTableComponent from './NotesTable.component';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editNotesAfterDelete } from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';
import deleteNote from '../../redux/actions/mes/deleteNote';

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

  const handleDeleteIconClick = (id: number) => {
    dispatch(deleteNote(id))
      .then(() => dispatch(editNotesAfterDelete(id)))
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          // handleChangeErrorMessage(error.message);
        }
      });
  };

  return (
    <NotesTableComponent
      allNotes={allNotes}
      mesError={mesError}
      requestStatus={requestStatus}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
    />
  );
}

export default NotesTableContainer;
