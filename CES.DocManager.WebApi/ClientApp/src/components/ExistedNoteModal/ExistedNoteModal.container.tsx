import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInputState } from '@mantine/hooks';

import ExistedNoteModalComponent from './ExistedNoteModal.component';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editAllNotes, resetStreetsBySearch } from '../../redux/reducers/mes/mesReducer';
import editExistedNote from '../../redux/actions/mes/editExistedNote';
import getStreetsBySearch from '../../redux/actions/mes/getStreetsBySearch';
import { ExistedNote, INotesState } from '../../types/MesTypes';
import handleError from '../../utils';
import createExistedNote from '../../redux/actions/mes/createExistedNote';
import createStreet from '../../redux/actions/mes/createStreet';

const defaultFormValues: ExistedNote = {
  comment: '',
  date: '',
  isChecked: false,
  noteContactsInfo: [],
};

interface ExistedNoteModalContainerProps {
  noteModalOpened: boolean;
  isEditModal: boolean;
  noteModalClose: () => void;
}

function ExistedNoteModalContainer(props: ExistedNoteModalContainerProps) {
  const { noteModalOpened, isEditModal, noteModalClose } = props;

  const [formState, setFormState] = useInputState<ExistedNote>(defaultFormValues);
  const [counter, setCounter] = useState<number>(1);
  const [noteId, setNoteId] = useState<number>(1);
  const [modalError, setModalError] = useState<string>('');
  const [noteDate, setNoteDate] = useState<Date>();
  const [newStreet, setNewStreet] = useState<string>('');

  const {
    allNotes,
    selectedNoteId,
    editedNoteId,
    streetsBySearch,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const addEmptyContactsInfoBlock = () => {
    setFormState({
      ...formState,
      noteContactsInfo: [
        ...formState.noteContactsInfo,
        {
          id: counter,
          street: '',
          entrance: '',
          houseNumber: '',
          tel: '',
        },
      ],
    });
    setCounter((prevCounter) => (prevCounter + 1));
  };

  useEffect(() => {
    if (isEditModal && allNotes.length !== 0 && noteModalOpened) {
      const elem = allNotes.filter((el) => el.id === selectedNoteId)[0];

      setNoteId(elem.id);
      setFormState({
        date: elem.date,
        comment: elem.comment,
        isChecked: elem.isChecked,
        noteContactsInfo: [
          {
            id: counter,
            street: '',
            entrance: '',
            houseNumber: '',
            tel: '',
          },
        ],
      });
      setCounter((prevCounter) => (prevCounter + 1));
    }

    if (!isEditModal && noteModalOpened) {
      addEmptyContactsInfoBlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteModalOpened]);

  const handleClose = () => {
    noteModalClose();
    dispatch(changeSelectedNoteId(0));
    setFormState(defaultFormValues);
    setCounter(1);
  };

  useEffect(() => {
    if (editedNoteId !== 0) {
      dispatch(editAllNotes(editedNoteId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedNoteId]);

  const handleTextAreaChange = (value: string) => {
    const updatedFormState = {
      ...formState,
      comment: value,
    };
    setFormState(updatedFormState);
  };

  const updateStreetInFormState = (value: string, index: number) => {
    const updatedContacts = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, street: value };
      }
      return el;
    });

    setFormState({
      ...formState,
      noteContactsInfo: updatedContacts,
    });
  };

  const handleStreetChange = (value: string | null, index: number) => {
    if (value === null) {
      updateStreetInFormState('', index);
      dispatch(resetStreetsBySearch());
      return;
    }
    if (value.length === 1) {
      dispatch(getStreetsBySearch(value))
        .catch((error) => {
          handleError(error, setModalError);
        });

      updateStreetInFormState(value, index);
      return;
    }
    if (value.length === 0) {
      updateStreetInFormState('', index);
      dispatch(resetStreetsBySearch());
      return;
    }

    updateStreetInFormState(value, index);
  };

  const handleEntranceChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, entrance: value };
      }
      return el;
    });
    setFormState({
      ...formState,
      noteContactsInfo: [...newArr],
    });
  };

  const handleHouseNumberChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, houseNumber: value };
      }
      return el;
    });
    setFormState({
      ...formState,
      noteContactsInfo: [...newArr],
    });
  };

  const handleTelChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, tel: value };
      }
      return el;
    });
    setFormState({
      ...formState,
      noteContactsInfo: [...newArr],
    });
  };

  const handleNoteDateChange = (value: Date | null) => {
    if (value) {
      setNoteDate(value);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stateCopy = formState;
    stateCopy.noteContactsInfo = stateCopy.noteContactsInfo.filter((el) => el.street !== '');
    if (isEditModal) {
      dispatch(editExistedNote({ ...stateCopy, id: noteId }))
        .then(() => handleClose())
        .catch((error) => {
          handleError(error, setModalError);
        });
    } else {
      if (noteDate) {
        stateCopy.date = noteDate.toLocaleString('en-GB', { timeZone: 'Europe/Minsk' });
      }

      dispatch(createExistedNote(stateCopy))
        .then(() => handleClose())
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  const handleAddButtonClick = () => {
    addEmptyContactsInfoBlock();
  };

  const handleDeleteButtonClick = (id: number) => {
    const stateCopy = formState;
    if (stateCopy.noteContactsInfo.length > 1) {
      const newArr = stateCopy.noteContactsInfo.filter((el) => el.id !== id);
      setFormState({
        ...formState,
        noteContactsInfo: [...newArr],
      });
    }
  };

  const handleNewStreetChange = (value: string) => {
    setNewStreet(value);
  };

  const handleAddStreet = () => {
    dispatch(createStreet(newStreet))
      .then(() => setNewStreet(''))
      .catch((error) => {
        handleError(error, setModalError);
      });
  };

  return (
    <ExistedNoteModalComponent
      noteModalOpened={noteModalOpened}
      formState={formState}
      streetsBySearch={streetsBySearch}
      isEditModal={isEditModal}
      noteDate={noteDate}
      newStreet={newStreet}
      handleNewStreetChange={handleNewStreetChange}
      handleTextAreaChange={handleTextAreaChange}
      handleStreetChange={handleStreetChange}
      handleEntranceChange={handleEntranceChange}
      handleHouseNumberChange={handleHouseNumberChange}
      handleTelChange={handleTelChange}
      handleClose={handleClose}
      handleAddButtonClick={handleAddButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleNoteDateChange={handleNoteDateChange}
      handleAddStreet={handleAddStreet}
      onSubmit={onSubmit}
    />
  );
}

export default ExistedNoteModalContainer;
