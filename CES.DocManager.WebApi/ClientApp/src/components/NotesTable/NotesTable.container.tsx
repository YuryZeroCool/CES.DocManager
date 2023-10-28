import React from 'react';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { RootState } from '../../redux/reducers/combineReducers';
import NotesTableComponent from './NotesTable.component';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editNotesAfterDelete } from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';
import deleteNote from '../../redux/actions/mes/deleteNote';

interface Props {
  mesError: string;
  handleChangeErrorMessage: (value: string) => void;
}

function NotesTableContainer(props: Props) {
  const { mesError, handleChangeErrorMessage } = props;
  const [
    warningModalOpened,
    { open: warningModalOpen, close: warningModalClose },
  ] = useDisclosure(false);

  const [
    editNoteModalOpened,
    { open: editNoteModalOpen, close: editNoteModalClose },
  ] = useDisclosure(false);

  const {
    allNotes,
    requestStatus,
    selectedNoteId,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedNoteId(id));
    editNoteModalOpen();
  };

  const handleDeleteIconClick = (id: number) => {
    warningModalOpen();
    dispatch(changeSelectedNoteId(id));
  };

  const cofirmAction = () => {
    dispatch(deleteNote(selectedNoteId))
      .then(() => {
        dispatch(editNotesAfterDelete(selectedNoteId));
        warningModalClose();
      })
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          handleChangeErrorMessage(error.message);
        }
      });
  };

  return (
    <NotesTableComponent
      allNotes={allNotes}
      mesError={mesError}
      requestStatus={requestStatus}
      warningModalOpened={warningModalOpened}
      editNoteModalOpened={editNoteModalOpened}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
      warningModalClose={warningModalClose}
      editNoteModalClose={editNoteModalClose}
      cofirmAction={cofirmAction}
    />
  );
}

export default NotesTableContainer;
