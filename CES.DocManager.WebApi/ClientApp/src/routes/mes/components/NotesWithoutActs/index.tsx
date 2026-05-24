import {
  Button,
  Divider,
  Flex, Group, rem, Stack, Text, Tooltip,
} from '@mantine/core';
import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { format, getDaysInMonth } from 'date-fns';

import WarningModal from 'components/WarningModal';
import { RootState } from 'redux/reducers/combineReducers';
import { IAuthResponseType } from 'redux/store/configureStore';
import getActTypesFromFile from 'redux/actions/mes/getActTypesFromFile';
import getNotesWithoutActs from 'redux/actions/mes/notesWithoutAct/getNotesWithoutActs';
import getActDataFromFile from 'redux/actions/mes/getActDataFromFile';
import deleteNoteWithoutAct from 'redux/actions/mes/notesWithoutAct/deleteNoteWithoutAct';
import { changeSelectedNoteId, editNotesWithoutActAfterAddAct } from 'redux/reducers/mes/notesWithoutActReducer';
import { INotesState } from 'types/MesTypes';
import { NotesWithoutActsParams, NotesWithoutActState } from 'types/mes/NotesWithoutActTypes';

import ActTypesSelect from './components/ActTypesSelect';
import ExistedNoteModal from './components/ExistedNoteModal';
import NotesWithoutActsListHeader from './components/NotesWithoutActsListHeader';
import NotesWithoutActsTable from './components/NotesWithoutActsTable';

const LIMIT = 10;
const SELECT_NOTE_MESSAGE = 'Сначала выберите заявку';
const INCOMPLETE_NOTE_EDIT_MESSAGE = 'Заполните адрес заявки через иконку редактирования в таблице';
const SELECT_SINGLE_NOTE_MESSAGE = 'Выберите одну заявку';

const isNoteAddressComplete = (street: string, houseNumber: string) => (
  Boolean(street?.trim() && houseNumber?.trim())
);

interface NotesWithoutActsProps {
  selectedNotesId: number[];
  handleAddActBtnClick: (value: string) => void;
  handleSelectNote: (newValue: number[]) => void;
}

function NotesWithoutActs(props: NotesWithoutActsProps) {
  const {
    selectedNotesId,
    handleAddActBtnClick,
    handleSelectNote,
  } = props;

  const [actTypeSelectValue, setActTypeSelectValue] = useState<string>('');
  const minDate = new Date();
  minDate.setDate(1);

  const maxDate = new Date();
  maxDate.setDate(getDaysInMonth(maxDate));

  const [notesWithoutActsParams, setNotesWithoutActsParams] = useState<NotesWithoutActsParams>({
    minDate,
    maxDate,
    filter: '',
    searchValue: '',
    page: 1,
    limit: LIMIT,
  });
  const [isEditModal, setIsEditModal] = useState<boolean>(false);

  const [
    noteModalOpened,
    { open: noteModalOpen, close: noteModalClose },
  ] = useDisclosure(false);

  const [
    warningModalOpened,
    { open: warningModalOpen, close: warningModalClose },
  ] = useDisclosure(false);

  const {
    actDataFromFile,
    actTypesFromFile,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const { notesWithoutAct } = useSelector<RootState, NotesWithoutActState>(
    (state) => state.notesWithoutAct,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const hasSelectedNotes = selectedNotesId.length > 0;

  const canEditSelectedNote = useMemo(() => {
    if (selectedNotesId.length !== 1) return false;

    const note = notesWithoutAct.find((item) => item.id === selectedNotesId[0]);
    if (!note) return false;

    return isNoteAddressComplete(note.street, note.houseNumber);
  }, [selectedNotesId, notesWithoutAct]);

  const editNoteButtonTooltip = useMemo(() => {
    if (selectedNotesId.length === 0) return SELECT_NOTE_MESSAGE;
    if (selectedNotesId.length > 1) return SELECT_SINGLE_NOTE_MESSAGE;

    const note = notesWithoutAct.find((item) => item.id === selectedNotesId[0]);
    if (note && !isNoteAddressComplete(note.street, note.houseNumber)) {
      return INCOMPLETE_NOTE_EDIT_MESSAGE;
    }

    return '';
  }, [selectedNotesId, notesWithoutAct]);

  const showErrorNotification = (message: string) => {
    showNotification({
      title: message,
      message: 'Произошла ошибка.',
      icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
      styles: { icon: { background: 'red' } },
    });
  };

  useEffect(() => {
    dispatch(getActTypesFromFile())
      .catch(() => showErrorNotification('Список типов актов не был получен'));
    dispatch(getNotesWithoutActs({
      ...notesWithoutActsParams,
      minDate: format(notesWithoutActsParams.minDate, 'dd-MM-yyyy HH:mm:ss'),
      maxDate: format(notesWithoutActsParams.maxDate, 'dd-MM-yyyy HH:mm:ss'),
    }))
      .catch(() => showErrorNotification('Список заявок не был получен'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (actTypeSelectValue !== '') {
      const { fileName } = actTypesFromFile.filter((el) => (
        `${el.actType} (${el.season.toLocaleLowerCase()})` === actTypeSelectValue
      ))[0];

      dispatch(getActDataFromFile(fileName))
        .catch(() => {
          showErrorNotification('Данные акта не были получены');
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actTypeSelectValue]);

  const updateNotesWithoutActsParams = <K extends keyof NotesWithoutActsParams>(
    key: K,
    value: NotesWithoutActsParams[K],
  ) => {
    setNotesWithoutActsParams((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleActTypeSelectChange = (value: string) => {
    setActTypeSelectValue(value);
  };

  const handleActTypeButtonClick = (actType: string) => {
    if (!hasSelectedNotes) {
      showNotification({
        title: 'Внимание',
        message: SELECT_NOTE_MESSAGE,
        color: 'orange',
      });
      return;
    }

    handleAddActBtnClick(actType);
  };

  const handleGetNotesWithoutActsBtnClick = () => {
    dispatch(getNotesWithoutActs({
      ...notesWithoutActsParams,
      minDate: format(notesWithoutActsParams.minDate, 'dd-MM-yyyy HH:mm:ss'),
      maxDate: format(notesWithoutActsParams.maxDate, 'dd-MM-yyyy HH:mm:ss'),
    }))
      .catch(() => showErrorNotification('Список заявок не был получен'));
  };

  const handleDeleteNoteBtnClick = () => {
    if (selectedNotesId.length === 0) {
      showNotification({
        title: 'Внимание',
        message: SELECT_NOTE_MESSAGE,
        color: 'orange',
      });
      return;
    }
    if (selectedNotesId.length > 1) {
      showErrorNotification('Невозможно удалить несколько заявок одновременно');
      return;
    }
    warningModalOpen();
  };

  const handleEditNoteBtnClick = () => {
    if (selectedNotesId.length === 0) {
      showNotification({
        title: 'Внимание',
        message: SELECT_NOTE_MESSAGE,
        color: 'orange',
      });
      return;
    }
    if (selectedNotesId.length > 1) {
      showErrorNotification('Невозможно редактировать несколько заявок одновременно');
      return;
    }

    dispatch(changeSelectedNoteId(selectedNotesId[0]));
    setIsEditModal(true);
    noteModalOpen();
  };

  const handleAddNoteBtnClick = () => {
    setIsEditModal(false);
    noteModalOpen();
  };

  const cofirmDeleteNoteAction = () => {
    dispatch(deleteNoteWithoutAct(selectedNotesId[0]))
      .then(() => {
        warningModalClose();
        dispatch(editNotesWithoutActAfterAddAct(selectedNotesId));
        handleSelectNote([]);
      })
      .catch(() => {
        warningModalClose();
        showErrorNotification('Заявка не была удалена');
      });
  };

  return (
    <>
      <Flex
        py={20}
        gap={15}
        mih="9vh"
      >
        <Stack gap={20} w="100%">
          <Stack>
            <Text fw={600}>Поиск заявок</Text>
            <NotesWithoutActsListHeader
              notesWithoutActsParams={notesWithoutActsParams}
              updateNotesWithoutActsParams={updateNotesWithoutActsParams}
              handleGetNotesWithoutActsBtnClick={handleGetNotesWithoutActsBtnClick}
            />
          </Stack>

          <Divider style={{ background: 'linear-gradient(#7950f2 0%, #15aabf 100%)', height: 3 }} />

          <Stack>
            <Text fw={600}>Добавить акт</Text>
            <Group>
              <ActTypesSelect
                actTypeSelectValue={actTypeSelectValue}
                handleActTypeSelectChange={handleActTypeSelectChange}
              />
              {actDataFromFile.act.length !== 0 && actDataFromFile.act.map((act) => (
                <Tooltip
                  key={act.type}
                  label={SELECT_NOTE_MESSAGE}
                  disabled={hasSelectedNotes}
                  withArrow
                >
                  <span style={{ display: 'inline-block' }}>
                    <Button
                      variant="gradient"
                      gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                      disabled={!hasSelectedNotes}
                      onClick={() => handleActTypeButtonClick(act.type)}
                    >
                      {act.type}
                    </Button>
                  </span>
                </Tooltip>
              ))}
            </Group>
          </Stack>

          <Divider style={{ background: 'linear-gradient(#7950f2 0%, #15aabf 100%)', height: 3 }} />

          <Group gap={10}>
            <Button
              w={250}
              variant="gradient"
              gradient={{ from: 'violet', to: 'blue', deg: 90 }}
              onClick={() => handleAddNoteBtnClick()}
            >
              Добавить заявку
            </Button>

            <Button
              w={250}
              variant="gradient"
              gradient={{ from: 'violet', to: 'blue', deg: 90 }}
              onClick={() => handleDeleteNoteBtnClick()}
            >
              Удалить заявку
            </Button>

            <Tooltip
              label={editNoteButtonTooltip}
              disabled={canEditSelectedNote}
              withArrow
            >
              <span style={{ display: 'inline-block' }}>
                <Button
                  w={250}
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                  disabled={!canEditSelectedNote}
                  onClick={() => handleEditNoteBtnClick()}
                >
                  Отредактировать
                </Button>
              </span>
            </Tooltip>
          </Group>
        </Stack>
      </Flex>

      <NotesWithoutActsTable
        selectedNotesId={selectedNotesId}
        handleSelectNote={handleSelectNote}
        noteModalOpen={noteModalOpen}
        changeIsEditModal={setIsEditModal}
      />

      <WarningModal
        warningModalOpened={warningModalOpened}
        warningModalClose={warningModalClose}
        cofirmAction={cofirmDeleteNoteAction}
      />

      <ExistedNoteModal
        noteModalOpened={noteModalOpened}
        isEditModal={isEditModal}
        noteModalClose={noteModalClose}
        handleSelectNote={handleSelectNote}
      />
    </>
  );
}

export default memo(NotesWithoutActs);
