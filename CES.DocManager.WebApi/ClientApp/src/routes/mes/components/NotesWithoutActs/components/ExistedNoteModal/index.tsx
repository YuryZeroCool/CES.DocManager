import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInputState } from '@mantine/hooks';
import { format } from 'date-fns';
import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatesProvider, DateTimePicker } from '@mantine/dates';

import { RootState } from 'redux/reducers/combineReducers';
import { IAuthResponseType } from 'redux/store/configureStore';
import {
  resetStreetsBySearch,
  changeSelectedNoteId,
  editNotesAfterUpdate,
} from 'redux/reducers/mes/notesWithoutActReducer';
import {
  createExistedNote,
  createStreet,
  getStreetsBySearch,
  editExistedNote,
} from 'redux/actions/mes';
import { ExistedNote, NotesWithoutActState } from 'types/mes/NotesWithoutActTypes';
import handleError from 'utils';

import NoteContactsInfo from './components/NoteContactsInfo';
import classes from './styles.module.css';

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

function ExistedNoteModal(props: ExistedNoteModalContainerProps) {
  const { noteModalOpened, isEditModal, noteModalClose } = props;

  const [formState, setFormState] = useInputState<ExistedNote>(defaultFormValues);
  const [counter, setCounter] = useState<number>(1);
  const [noteId, setNoteId] = useState<number>(1);
  const [modalError, setModalError] = useState<string>('');
  const [noteDate, setNoteDate] = useState<Date>();
  const [newStreet, setNewStreet] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    notesWithoutAct,
    selectedNoteId,
    streetsBySearch,
  } = useSelector<RootState, NotesWithoutActState>(
    (state) => state.notesWithoutAct,
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
    if (isEditModal && notesWithoutAct.length !== 0 && noteModalOpened) {
      const elem = notesWithoutAct.filter((el) => el.id === selectedNoteId)[0];

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
    setNoteDate(undefined);
    setCounter(1);
    setNewStreet('');
    setIsLoading(false);
  };

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
    setIsLoading(true);

    if (isEditModal) {
      dispatch(editExistedNote({ ...stateCopy, id: noteId }))
        .unwrap()
        .then((payload) => {
          if (payload && Array.isArray(payload)) {
            dispatch(editNotesAfterUpdate(payload));
            handleClose();
          }
        })
        .catch((error) => {
          handleError(error, setModalError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (noteDate) {
        stateCopy.date = format(noteDate, 'dd-MM-yyyy HH:mm:ss');
      }

      stateCopy.isChecked = true;
      dispatch(createExistedNote(stateCopy))
        .unwrap()
        .then((payload) => {
          if (payload && Array.isArray(payload)) {
            dispatch(editNotesAfterUpdate(payload));
            handleClose();
          }
        })
        .catch((error) => {
          handleError(error, setModalError);
        })
        .finally(() => {
          setIsLoading(false);
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
    <Modal
      opened={noteModalOpened}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      lockScroll={false}
      title={isEditModal ? 'Отредактировать заявку' : 'Добавить заявку'}
      size="xl"
      classNames={{
        title: classes.modalTitle,
      }}
    >
      <Stack>
        <form onSubmit={(event) => onSubmit(event)}>
          <Stack gap={15}>
            <Group wrap="nowrap">
              {!isEditModal && (
                <DatesProvider
                  settings={{
                    locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
                  }}
                >
                  <DateTimePicker
                    label="Дата принятие заявки"
                    placeholder="Выберите дату"
                    value={noteDate}
                    onChange={(value: Date | null) => handleNoteDateChange(value)}
                    clearable
                    w="50%"
                  />
                </DatesProvider>
              )}
            </Group>

            <Textarea
              value={formState.comment}
              autosize
              minRows={2}
              onChange={(event) => handleTextAreaChange(event.target.value)}
            />

            <NoteContactsInfo
              noteContactsInfo={formState.noteContactsInfo}
              streetsBySearch={streetsBySearch}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEntranceChange={handleEntranceChange}
              handleHouseNumberChange={handleHouseNumberChange}
              handleStreetChange={handleStreetChange}
              handleTelChange={handleTelChange}
            />

            <Flex justify="space-between">
              <Group wrap="nowrap" align="flex-end" w="60%">
                <TextInput
                  label="Добавить новую улицу"
                  value={newStreet}
                  onChange={(event) => handleNewStreetChange(event.currentTarget.value)}
                  style={{ flexGrow: 1 }}
                />
                <Button
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                  onClick={handleAddStreet}
                >
                  Добавить
                </Button>
              </Group>

              <Flex gap="2%" justify="end" align="flex-end" style={{ flexGrow: 1 }}>
                <Button
                  onClick={handleClose}
                  variant="outline"
                >
                  Отмена
                </Button>
                <Button
                  disabled={formState.noteContactsInfo.filter((el) => el.street !== '').length === 0 || isLoading}
                  loading={isLoading}
                  type="submit"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                >
                  Сохранить
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}

export default memo(ExistedNoteModal);
