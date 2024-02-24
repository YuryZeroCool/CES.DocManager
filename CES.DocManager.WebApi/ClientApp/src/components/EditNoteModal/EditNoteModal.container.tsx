import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditNoteModalComponent from './EditNoteModal.component';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editAllNotes } from '../../redux/reducers/mes/mesReducer';
import editExistedNote from '../../redux/actions/mes/editExistedNote';
import getStreetsBySearch from '../../redux/actions/mes/getStreetsBySearch';
import { EditNoteRequest, INotesState } from '../../types/MesTypes';
import handleError from '../../utils';

const defaultFormValues: EditNoteRequest = {
  id: 0,
  comment: '',
  date: '',
  isChecked: false,
  noteContactsInfo: [],
};

interface EditNoteModalContainerProps {
  noteModalOpened: boolean;
  isEditModal: boolean;
  noteModalClose: () => void;
}

function EditNoteModalContainer(props: EditNoteModalContainerProps) {
  const { noteModalOpened, isEditModal, noteModalClose } = props;

  const [formState, setFormState] = useState<EditNoteRequest>(defaultFormValues);
  const [counter, setCounter] = useState<number>(1);
  const [modalError, setModalError] = useState<string>('');

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
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [
        ...prevFormState.noteContactsInfo,
        {
          id: counter,
          street: '',
          entrance: '',
          houseNumber: '',
          tel: '',
        },
      ],
    }));
    setCounter((prevCounter) => (prevCounter + 1));
  };

  useEffect(() => {
    if (isEditModal && allNotes.length !== 0 && noteModalOpened) {
      const elem = allNotes.filter((el) => el.id === selectedNoteId)[0];
      setFormState({
        id: elem.id,
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
    setFormState((prevFormState) => ({ ...prevFormState, comment: value }));
  };

  const handleStreetSearchChange = (value: string, index: number) => {
    if (formState.noteContactsInfo[index].street !== value) {
      dispatch(getStreetsBySearch(value))
        .then(() => {
          setFormState((prevFormState) => {
            const updatedContacts = formState.noteContactsInfo.map((el, i) => {
              if (i === index) {
                return { ...el, street: value };
              }
              return el;
            });

            return {
              ...prevFormState,
              noteContactsInfo: updatedContacts,
            };
          });
        })
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  const handleEntranceChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, entrance: value };
      }
      return el;
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [...newArr],
    }));
  };

  const handleHouseNumberChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, houseNumber: value };
      }
      return el;
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [...newArr],
    }));
  };

  const handleTelChange = (value: string, index: number) => {
    const newArr = formState.noteContactsInfo.map((el, i) => {
      if (i === index) {
        return { ...el, tel: value };
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
    stateCopy.noteContactsInfo = stateCopy.noteContactsInfo.filter((el) => el.street !== '');
    dispatch(editExistedNote(stateCopy))
      .then(() => handleClose())
      .catch((error) => {
        handleError(error, setModalError);
      });
  };

  const handleAddButtonClick = () => {
    addEmptyContactsInfoBlock();
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
      noteModalOpened={noteModalOpened}
      formState={formState}
      streetsBySearch={streetsBySearch}
      isEditModal={isEditModal}
      handleTextAreaChange={handleTextAreaChange}
      handleStreetSearchChange={handleStreetSearchChange}
      handleEntranceChange={handleEntranceChange}
      handleHouseNumberChange={handleHouseNumberChange}
      handleTelChange={handleTelChange}
      handleClose={handleClose}
      handleAddButtonClick={handleAddButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      onSubmit={onSubmit}
    />
  );
}

export default EditNoteModalContainer;
