import React, {
  memo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  ContactInfo, ExistedNote, NotesWithoutActState,
} from 'types/mes/NotesWithoutActTypes';

import NoteContactsInfo from './components/NoteContactsInfo';
import classes from './styles.module.css';

const createEmptyContact = (id: number): ContactInfo => ({
  id,
  street: '',
  entrance: '',
  houseNumber: '',
  tel: '',
});

const createEmptyForm = (): ExistedNote => ({
  comment: '',
  date: '',
  isChecked: false,
  noteContactsInfo: [],
});

interface ExistedNoteModalContainerProps {
  noteModalOpened: boolean;
  isEditModal: boolean;
  noteModalClose: () => void;
  handleSelectNote: (newValue: number[]) => void;
}

function ExistedNoteModal(props: ExistedNoteModalContainerProps) {
  const {
    noteModalOpened, isEditModal, noteModalClose, handleSelectNote,
  } = props;

  const [formState, setFormState] = useState<ExistedNote>(createEmptyForm);
  const [loadedFormKey, setLoadedFormKey] = useState<number | null>(null);
  const [noteId, setNoteId] = useState<number>(1);
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
  const lastStreetSearchFetchRef = useRef<string | null>(null);
  const loadedFormKeyRef = useRef<number | null>(null);

  let formKey: number | null = null;
  if (noteModalOpened) {
    formKey = isEditModal ? selectedNoteId : 0;
  }

  if (formKey !== loadedFormKey) {
    const noteToEdit = formKey
      ? notesWithoutAct.find((el) => el.id === formKey)
      : undefined;

    if (formKey === null || formKey === 0 || noteToEdit) {
      loadedFormKeyRef.current = formKey;
      setLoadedFormKey(formKey);

      if (!noteToEdit) {
        setNoteId(1);
        setNoteDate(undefined);
        setFormState(formKey === 0
          ? { ...createEmptyForm(), noteContactsInfo: [createEmptyContact(1)] }
          : createEmptyForm());
      } else {
        setNoteId(noteToEdit.id);
        setNoteDate(undefined);
        setFormState({
          date: noteToEdit.date,
          comment: noteToEdit.comment,
          isChecked: noteToEdit.isChecked,
          noteContactsInfo: [
            {
              id: 1,
              street: noteToEdit.street ?? '',
              entrance: noteToEdit.entrance ? String(noteToEdit.entrance) : '',
              houseNumber: noteToEdit.houseNumber ?? '',
              tel: noteToEdit.tel ?? '',
            },
          ],
        });
      }
    }
  } else {
    loadedFormKeyRef.current = loadedFormKey;
  }

  const updateForm = (
    noteKey: number | null,
    recipe: (current: ExistedNote) => ExistedNote,
  ) => {
    setFormState((current) => {
      if (loadedFormKeyRef.current !== noteKey) return current;
      return recipe(current);
    });
  };

  const addEmptyContactsInfoBlock = () => {
    updateForm(formKey, (current) => {
      const nextId = current.noteContactsInfo.reduce(
        (maxId, contact) => Math.max(maxId, contact.id),
        0,
      ) + 1;

      return {
        ...current,
        noteContactsInfo: [...current.noteContactsInfo, createEmptyContact(nextId)],
      };
    });
  };

  const handleClose = () => {
    noteModalClose();
    dispatch(changeSelectedNoteId(0));
    lastStreetSearchFetchRef.current = null;
    dispatch(resetStreetsBySearch());
    setNewStreet('');
    setIsLoading(false);
  };

  const handleTextAreaChange = (value: string) => {
    updateForm(formKey, (current) => ({
      ...current,
      comment: value,
    }));
  };

  const updateStreetInFormState = (value: string, index: number) => {
    updateForm(formKey, (current) => ({
      ...current,
      noteContactsInfo: current.noteContactsInfo.map((el, i) => (
        i === index ? { ...el, street: value } : el
      )),
    }));
  };

  const handleStreetSearchChange = (value: string, index: number) => {
    if (value.length === 0) {
      lastStreetSearchFetchRef.current = null;
      dispatch(resetStreetsBySearch());
      return;
    }

    updateStreetInFormState(value, index);

    if (value.length === 1) {
      if (lastStreetSearchFetchRef.current === value) {
        return;
      }
      lastStreetSearchFetchRef.current = value;
      dispatch(getStreetsBySearch(value)).catch(() => {});
    }
  };

  const handleStreetSelectChange = (value: string | null, index: number) => {
    if (value === null) {
      lastStreetSearchFetchRef.current = null;
      updateStreetInFormState('', index);
      dispatch(resetStreetsBySearch());
      return;
    }

    updateStreetInFormState(value, index);
  };

  const updateContactField = (
    index: number,
    field: 'entrance' | 'houseNumber' | 'tel',
    value: string,
  ) => {
    updateForm(formKey, (current) => ({
      ...current,
      noteContactsInfo: current.noteContactsInfo.map((el, i) => (
        i === index ? { ...el, [field]: value } : el
      )),
    }));
  };

  const handleEntranceChange = (value: string, index: number) => {
    updateContactField(index, 'entrance', value);
  };

  const handleHouseNumberChange = (value: string, index: number) => {
    updateContactField(index, 'houseNumber', value);
  };

  const handleTelChange = (value: string, index: number) => {
    updateContactField(index, 'tel', value);
  };

  const handleNoteDateChange = (value: Date | null) => {
    if (value) {
      setNoteDate(value);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stateCopy: ExistedNote = {
      ...formState,
      noteContactsInfo: formState.noteContactsInfo
        .filter((el) => el.street !== '')
        .map((el) => ({ ...el })),
    };
    setIsLoading(true);

    if (isEditModal) {
      dispatch(editExistedNote({ ...stateCopy, id: noteId }))
        .unwrap()
        .then((payload) => {
          if (payload && Array.isArray(payload)) {
            dispatch(editNotesAfterUpdate(payload));
            handleSelectNote([]);
            handleClose();
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(() => {});
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
        .finally(() => {
          setIsLoading(false);
        })
        .catch(() => {});
    }
  };

  const handleAddButtonClick = () => {
    addEmptyContactsInfoBlock();
  };

  const handleDeleteButtonClick = (id: number) => {
    updateForm(formKey, (current) => {
      if (current.noteContactsInfo.length <= 1) return current;

      return {
        ...current,
        noteContactsInfo: current.noteContactsInfo.filter((el) => el.id !== id),
      };
    });
  };

  const handleNewStreetChange = (value: string) => {
    setNewStreet(value);
  };

  const handleAddStreet = () => {
    dispatch(createStreet(newStreet))
      .unwrap()
      .then(() => setNewStreet(''))
      .catch(() => {});
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
              instanceKey={formKey ?? 'closed'}
              noteContactsInfo={formState.noteContactsInfo}
              streetsBySearch={streetsBySearch}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEntranceChange={handleEntranceChange}
              handleHouseNumberChange={handleHouseNumberChange}
              handleStreetSearchChange={handleStreetSearchChange}
              handleStreetSelectChange={handleStreetSelectChange}
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
