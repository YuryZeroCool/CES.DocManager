import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import EditNoteModalComponent from './EditNoteModal.component';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editAllNotes } from '../../redux/reducers/mes/mesReducer';
import editExistedNote from '../../redux/actions/mes/editExistedNote';
import getStreetsBySearch from '../../redux/actions/mes/getStreetsBySearch';
import { EditNoteRequest, INotesState } from '../../types/MesTypes';

const defaultFormValues: EditNoteRequest = {
  id: 0,
  comment: '',
  date: '',
  isChecked: false,
  noteContactsInfo: [],
};

interface EditNoteModalContainerProps {
  editNoteModalOpened: boolean;
  editNoteModalClose: () => void;
}

function EditNoteModalContainer(props: EditNoteModalContainerProps) {
  const { editNoteModalOpened, editNoteModalClose } = props;

  const [formState, setFormState] = useState<EditNoteRequest>(defaultFormValues);
  const [counter, setCounter] = useState<number>(1);
  const [modalError, setModalError] = useState<string>('');
  const [address, setAddress] = useState<string | null>(null); // remove in the future

  const {
    allNotes,
    selectedNoteId,
    editedNoteId,
    streetsBySearch,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (allNotes.length !== 0 && editNoteModalOpened) {
      const elem = allNotes.filter((el) => el.id === selectedNoteId)[0];
      setAddress(elem.address); // remove later
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
            tel: elem.tel ?? '',
          },
        ],
      });
      setCounter((prevCounter) => (prevCounter + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNoteModalOpened]);

  const handleClose = () => {
    editNoteModalClose();
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
          if (error instanceof Error || error instanceof AxiosError) {
            setModalError(error.message);
          }
        });
    }
  };

  const handleEntranceChange = (value: string, index: number) => {
    const stateCopy = formState;
    const newArr = stateCopy.noteContactsInfo.map((el, i) => {
      if (i === index) {
        const elem = el;
        elem.entrance = value;
        return elem;
      }
      return el;
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      noteContactsInfo: [...newArr],
    }));
  };

  const handleHouseNumberChange = (value: string, index: number) => {
    const stateCopy = formState;
    const newArr = stateCopy.noteContactsInfo.map((el, i) => {
      if (i === index) {
        const elem = el;
        elem.houseNumber = value;
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
    stateCopy.noteContactsInfo = stateCopy.noteContactsInfo.filter((el) => el.street !== '');
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
          street: '',
          entrance: '',
          houseNumber: '',
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
      editNoteModalOpened={editNoteModalOpened}
      formState={formState}
      streetsBySearch={streetsBySearch}
      address={address} // remove in the future
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
