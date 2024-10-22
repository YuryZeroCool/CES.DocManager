import {
  Button,
  Divider,
  Flex, Group, rem, Stack, Text,
} from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { format, getDaysInMonth } from 'date-fns';
import NotesWithoutActsListHeader from './components/NotesWithoutActsListHeader';
import { INotesState, NotesWithoutActsParams } from '../../../../types/MesTypes';
import ActTypesSelect from './components/ActTypesSelect';
import getActTypesFromFile from '../../../../redux/actions/mes/getActTypesFromFile';
import getNotesWithoutActs from '../../../../redux/actions/mes/getNotesWithoutActs';
import { IAuthResponseType } from '../../../../redux/store/configureStore';
import { RootState } from '../../../../redux/reducers/combineReducers';
import getActDataFromFile from '../../../../redux/actions/mes/getActDataFromFile';
import NotesWithoutActsTable from './components/NotesWithoutActsTable';
import LIMIT from '../../MesPage.config';

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
    filter: [],
    searchValue: '',
    page: 1,
    limit: LIMIT,
  });

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
      [key]: Array.isArray(prevState[key])
        ? [...(prevState[key] as string[]), ...(Array.isArray(value) ? value : [value])]
        : value,
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
        </Stack>
      </Flex>

      <NotesWithoutActsTable
        selectedNotesId={selectedNotesId}
        handleSelectNote={handleSelectNote}
      />
    </>
  );
}

export default memo(NotesWithoutActs);
