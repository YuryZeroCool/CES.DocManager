import {
  Button,
  Divider,
  Flex, Group, rem, Stack, Text,
} from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
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
import { editNotesWithoutActAfterAddAct } from 'redux/reducers/mes/notesWithoutActReducer';
import { INotesState } from 'types/MesTypes';
import { NotesWithoutActsParams } from 'types/mes/NotesWithoutActTypes';

import ActTypesSelect from './components/ActTypesSelect';
import ExistedNoteModal from './components/ExistedNoteModal';
import NotesWithoutActsListHeader from './components/NotesWithoutActsListHeader';
import NotesWithoutActsTable from './components/NotesWithoutActsTable';

const LIMIT = 10;

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

  const dispatch: IAuthResponseType = useDispatch();

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

  const handleGetNotesWithoutActsBtnClick = () => {
    dispatch(getNotesWithoutActs({
      ...notesWithoutActsParams,
      minDate: format(notesWithoutActsParams.minDate, 'dd-MM-yyyy HH:mm:ss'),
      maxDate: format(notesWithoutActsParams.maxDate, 'dd-MM-yyyy HH:mm:ss'),
    }))
      .catch(() => showErrorNotification('Список заявок не был получен'));
  };

  const handleDeleteNoteBtnClick = () => {
    if (selectedNotesId.length > 1) {
      showErrorNotification('Невозможно удалить несколько заявок одновременно');
    } else {
      warningModalOpen();
    }
  };

  const changeIsEditModal = (value: boolean) => {
    setIsEditModal(value);
  };

  const handleAddNoteBtnClick = () => {
    noteModalOpen();
    changeIsEditModal(false);
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
                <Button
                  key={act.type}
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                  onClick={() => handleAddActBtnClick(act.type)}
                >
                  {act.type}
                </Button>
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
          </Group>
        </Stack>
      </Flex>

      <NotesWithoutActsTable
        selectedNotesId={selectedNotesId}
        handleSelectNote={handleSelectNote}
        noteModalOpen={noteModalOpen}
        changeIsEditModal={changeIsEditModal}
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
      />
    </>
  );
}

export default memo(NotesWithoutActs);
