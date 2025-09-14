import React, { memo } from 'react';
import {
  Drawer, Group, Stack, Table, Text,
} from '@mantine/core';
import { ActsList } from '../../../../../../types/MesTypes';
import classes from './styles.module.css';

interface ActDetailsInfoPanelProps {
  currentAct: ActsList | null;
  detailsInfoPanelOpen: boolean;
  handleDrawerClose: () => void;
}

function ActDetailsInfoPanel(props: ActDetailsInfoPanelProps) {
  const { currentAct, detailsInfoPanelOpen, handleDrawerClose } = props;

  const tableHead = (
    <Table.Tr>
      <Table.Th>Наименование работ</Table.Th>
      <Table.Th>Един. изм.</Table.Th>
      <Table.Th>Кол-во</Table.Th>
      <Table.Th>Отпускная цена, руб (с НДС)</Table.Th>
      <Table.Th>Всего к оплате, руб.</Table.Th>
    </Table.Tr>
  );

  const renderWorkName = (name: string) => {
    if (name.includes('&Oslash;')) {
      const strArr = name.split('&Oslash;');
      return (
        <Text>
          {strArr[0]}
          &Oslash;
          {strArr[1]}
        </Text>
      );
    }
    return (
      <Text>
        {name}
      </Text>
    );
  };

  const rows = currentAct?.works.map((work) => (
    <Table.Tr key={work.name}>
      <Table.Td>
        {renderWorkName(work.name)}
      </Table.Td>
      <Table.Td>{work.unit}</Table.Td>
      <Table.Td>{work.count}</Table.Td>
      <Table.Td>{work.price}</Table.Td>
      <Table.Td>{work.totalSumm}</Table.Td>
    </Table.Tr>
  ));

  const renderWorksTable = () => (
    <Table
      striped
      highlightOnHover
      withTableBorder
      classNames={{
        th: classes.tableHeadCell,
        td: classes.tableBodyCell,
      }}
    >
      <Table.Thead>{tableHead}</Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
    </Table>
  );

  return (
    <Drawer
      opened={detailsInfoPanelOpen}
      onClose={handleDrawerClose}
      title="Подробная информация"
      position="right"
      size="50%"
      styles={{
        title: { fontSize: 20, fontWeight: 600 },
        header: { padding: 20 },
        body: { padding: 20 },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
        },
      }}
    >
      <Stack gap={20}>
        <Stack gap={5}>
          <Text className={classes.detailedInfoTitle}>
            Дата создания акта:
          </Text>
          <Text className={classes.detailedInfoValue}>
            {currentAct?.actDateOfCreation}
          </Text>
        </Stack>

        <Stack gap={10}>
          <Text className={classes.detailedInfoTitle}>
            Тип акта:
          </Text>
          <Text className={classes.detailedInfoValue}>
            {currentAct?.actType}
          </Text>
        </Stack>

        <Stack gap={10}>
          <Text className={classes.detailedInfoTitle}>
            Адреса:
          </Text>
          {currentAct?.notesWithoutAct.map((note) => (
            <Group key={note.id} justify="space-between">
              <Text className={classes.detailedInfoValue}>
                {note.street && (
                  <>
                    {note.street}
                    ,&nbsp;
                  </>
                )}
                {note.houseNumber !== '' && note.houseNumber !== '0' && (
                  <>
                    д.&nbsp;
                    {note.houseNumber}
                    ,&nbsp;
                  </>
                )}
                {note.entrance !== 0 && (
                  <>
                    п.&nbsp;
                    {note.entrance}
                    ,&nbsp;
                  </>
                )}
                {note.tel !== '' && (
                  <>
                    т.&nbsp;
                    {note.tel}
                  </>
                )}
              </Text>
              {note.date && (
                <Text className={classes.detailedInfoValue}>
                  {note.date.replace('T', ' ')}
                </Text>
              )}
            </Group>
          ))}
        </Stack>

        <Stack gap={5}>
          <Text className={classes.detailedInfoTitle}>
            Водитель:
          </Text>
          <Text className={classes.detailedInfoValue}>
            {currentAct?.driver}
          </Text>
        </Stack>

        <Stack gap={5}>
          <Text className={classes.detailedInfoTitle}>
            Номер машины:
          </Text>
          <Text className={classes.detailedInfoValue}>
            {currentAct?.numberPlateOfCar}
          </Text>
        </Stack>

        <Stack>
          {renderWorksTable()}
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default memo(ActDetailsInfoPanel);
