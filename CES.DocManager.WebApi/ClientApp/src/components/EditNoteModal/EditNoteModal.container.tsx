import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import EditNoteModalComponent from './EditNoteModal.component';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editAllNotes } from '../../redux/reducers/mes/mesReducer';
import { toggleEditNoteModal } from '../../redux/reducers/modals/modalsReducer';
import { IModal } from '../../types/type';
import { EditNoteRequest, INotesState } from '../../types/MesTypes';
import editExistedNote from '../../redux/actions/mes/editExistedNote';

const defaultFormValues: EditNoteRequest = {
  id: 0,
  comment: '',
  date: '',
  isChecked: false,
  noteContactsInfo: [],
};

function EditNoteModalContainer() {
  const [formState, setFormState] = useState<EditNoteRequest>(defaultFormValues);
  const [counter, setCounter] = useState<number>(1);
  const [modalError, setModalError] = useState<string>('');

  const {
    isEditNoteModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const {
    allNotes,
    selectedNoteId,
    editedNoteId,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    const elem = allNotes.filter((el) => el.id === selectedNoteId)[0];
    setFormState({
      id: elem.id,
      date: elem.date,
      comment: elem.comment,
      isChecked: elem.isChecked,
      noteContactsInfo: [
        {
          id: counter,
          address: '',
          tel: '',
        },
      ],
    });
    setCounter((prevCounter) => (prevCounter + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    dispatch(toggleEditNoteModal(false));
    dispatch(changeSelectedNoteId(0));
  };

  useEffect(() => {
    if (editedNoteId !== 0) {
      dispatch(editAllNotes(editedNoteId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedNoteId]);

  const handleTextAreaChange = (value: string) => {
    setFormState((prevFormState) => ({ ...prevFormState, comment: value }));
  };

  const handleAddressChange = (value: string, index: number) => {
    const stateCopy = formState;
    const newArr = stateCopy.noteContactsInfo.map((el, i) => {
      if (i === index) {
        const elem = el;
        elem.address = value;
        return elem;
      }
      return el;
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [...newArr],
    }));
  };

  const handleTelChange = (value: string, index: number) => {
    const stateCopy = formState;
    const newArr = stateCopy.noteContactsInfo.map((el, i) => {
      if (i === index) {
        const elem = el;
        elem.tel = value;
        return elem;
      }
      return el;
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [...newArr],
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stateCopy = formState;
    stateCopy.noteContactsInfo = stateCopy.noteContactsInfo.filter((el) => el.address !== '');
    dispatch(editExistedNote(stateCopy))
      .then(() => handleClose())
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          setModalError(error.message);
        }
      });
  };

  const handleAddButtonClick = () => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [
        ...prevFormState.noteContactsInfo,
        {
          id: counter,
          address: '',
          tel: '',
        },
      ],
    }));
    setCounter((prevCounter) => (prevCounter + 1));
  };

  const handleDeleteButtonClick = (id: number) => {
    const stateCopy = formState;
    if (stateCopy.noteContactsInfo.length > 1) {
      const newArr = stateCopy.noteContactsInfo.filter((el) => el.id !== id);
      setFormState((prevFormState) => ({
        ...prevFormState,
        noteContactsInfo: [...newArr],
      }));
    }
  };

  return (
    <EditNoteModalComponent
      isEditNoteModalOpen={isEditNoteModalOpen}
      formState={formState}
      handleTextAreaChange={handleTextAreaChange}
      handleAddressChange={handleAddressChange}
      handleTelChange={handleTelChange}
      handleClose={handleClose}
      handleAddButtonClick={handleAddButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      onSubmit={onSubmit}
    />
  );
}

export default EditNoteModalContainer;
