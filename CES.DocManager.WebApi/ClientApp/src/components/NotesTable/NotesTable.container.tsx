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
  handleChangeErrorMessage: (value: string) => void;
}

function NotesTableContainer(props: Props) {
  const { mesError, handleChangeErrorMessage } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    dispatch(toggleEditNoteModal(true));
  };

  const handleDeleteIconClick = (id: number) => {
    handleOpen();
    dispatch(changeSelectedNoteId(id));
  };

  const cofirmAction = () => {
    dispatch(deleteNote(selectedNoteId))
      .then(() => {
        dispatch(editNotesAfterDelete(selectedNoteId));
        handleClose();
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
      open={open}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
      handleClose={handleClose}
      cofirmAction={cofirmAction}
    />
  );
}

export default NotesTableContainer;
