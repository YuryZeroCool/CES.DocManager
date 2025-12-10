import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex, rem, Stack, Tabs,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNoteOff,
  IconComet,
  IconClipboardList,
  IconFileText,
} from '@tabler/icons-react';

import { IAuthResponseType } from 'redux/store/configureStore';
import { changeMesPageType, resetTotalActSummVat } from 'redux/reducers/mes/mesReducer';
import { RootState } from 'redux/reducers/combineReducers';
import {
  Act,
  INotesState,
} from 'types/MesTypes';
import ActModal from 'components/ActModal';

import Contracts from './components/Contracts';
import ActsHistory from './components/ActsHistory';
import NotesWithoutActs from './components/NotesWithoutActs';
import Organizations from './components/Organizations';
import classes from './styles.module.css';

const iconStyle = { width: rem(20), height: rem(20) };

function MesPageContainer() {
  const [selectedNotesId, setSelectedNotesId] = useState<number[]>([]);
  const [type, setType] = useState<string>('');
  const [currentActData, setCurrentActData] = useState<Act>({ type: '', works: [] });

  const [
    addActModalOpened,
    { open: addActModalOpen, close: addActModalClose },
  ] = useDisclosure(false);

  const [
    editActModalOpened,
    { open: editActModalOpen, close: editActModalClose },
  ] = useDisclosure(false);

  const {
    mesPageType,
    actDataFromFile,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (type) {
      const res = actDataFromFile.act.filter((el) => el.type === type)[0];
      setCurrentActData(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (type) {
      const res = actDataFromFile.act.filter((el) => el.type === type)[0];
      setCurrentActData(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actDataFromFile.act]);

  const changeType = (value: string) => {
    setType(value);
  };

  const handleAddActBtnClick = (value: string) => {
    dispatch(resetTotalActSummVat());
    changeType(value);
    addActModalOpen();
  };

  const handleChangeMesPageType = (value: string) => {
    dispatch(changeMesPageType(value));
    localStorage.setItem('mesPageType', value);
  };

  const handleSelectNote = (newValue: number[]) => {
    setSelectedNotesId(newValue);
  };

  const resetCurrentActData = () => {
    setCurrentActData({ type: '', works: [] });
  };

  return (
    <Stack className={classes.mesPageSection}>
      <Flex h={50} gap={10} pl={10} align="center">
        <Tabs
          value={mesPageType}
          onChange={(value) => handleChangeMesPageType(value ?? '')}
          classNames={{
            tabLabel: classes.tabLabel,
            tab: classes.tab,
          }}
          w="100%"
        >
          <Tabs.List>
            <Tabs.Tab value="Организации" leftSection={<IconComet style={iconStyle} />}>
              Организации
            </Tabs.Tab>
            <Tabs.Tab value="Заявки без актов" leftSection={<IconNoteOff style={iconStyle} />}>
              Заявки без актов
            </Tabs.Tab>
            <Tabs.Tab value="История актов" leftSection={<IconClipboardList style={iconStyle} />}>
              История актов
            </Tabs.Tab>
            <Tabs.Tab value="Договоры" leftSection={<IconFileText style={iconStyle} />}>
              Договоры
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Flex>
      {mesPageType === 'Организации' && <Organizations />}
      {mesPageType === 'Заявки без актов' && (
        <NotesWithoutActs
          selectedNotesId={selectedNotesId}
          handleAddActBtnClick={handleAddActBtnClick}
          handleSelectNote={handleSelectNote}
        />
      )}
      {mesPageType === 'История актов' && (
        <ActsHistory
          editActModalOpen={editActModalOpen}
        />
      )}
      {mesPageType === 'Договоры' && (
        <Contracts />
      )}

      {(addActModalOpened || editActModalOpened) && (
        <ActModal
          selectedNotesId={selectedNotesId}
          currentActData={currentActData}
          type={type}
          addActModalOpened={addActModalOpened}
          editActModalOpened={editActModalOpened}
          addActModalClose={addActModalClose}
          editActModalClose={editActModalClose}
          resetCurrentActData={resetCurrentActData}
          changeType={changeType}
          handleSelectNote={handleSelectNote}
        />
      )}
    </Stack>
  );
}

export default MesPageContainer;
