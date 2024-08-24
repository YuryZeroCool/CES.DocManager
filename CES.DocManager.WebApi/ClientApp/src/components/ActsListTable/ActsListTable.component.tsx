import React from 'react';
import {
  ActionIcon,
  Group,
  LoadingOverlay,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { ActsList } from '../../types/MesTypes';
import DetailsInfoPanel from '../DetailsInfoPanel/DetailsInfoPanel.container';
import classes from './ActsListTable.module.css';

interface HeadCell {
  id: number;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 0,
    label: '№',
  },
  {
    id: 1,
    label: 'Дата',
  },
  {
    id: 2,
    label: 'Название организации',
  },
  {
    id: 3,
    label: 'УНП',
  },
  {
    id: 4,
    label: 'Сумма',
  },
  {
    id: 5,
    label: 'НДС',
  },
  {
    id: 6,
    label: '',
  },
  {
    id: 7,
    label: '',
  },
];

interface ActsListTableComponentProps {
  mesError: string;
  actsList: ActsList[];
  requestStatus: string;
  detailsInfoPanelOpen: boolean;
  currentAct: ActsList | null;
  totalActSumm: number;
  totalActVat: number;
  handleDrawerOpen: (actId: number) => void;
  handleDrawerClose: () => void;
  handleEditIconClick: (id: number) => void;
  handleDeleteIconClick: (id: number) => void;
}

function ActsListTableComponent(props: ActsListTableComponentProps) {
  const {
    actsList,
    mesError,
    requestStatus,
    detailsInfoPanelOpen,
    currentAct,
    totalActSumm,
    totalActVat,
    handleDrawerOpen,
    handleDrawerClose,
    handleEditIconClick,
    handleDeleteIconClick,
  } = props;

  const renderTableHead = () => (
    <Table.Tr>
      {headCells.map((headCell) => (
        <Table.Th key={headCell.id}>{headCell.label}</Table.Th>
      ))}
    </Table.Tr>
  );

  const renderTableBody = () => (
    <>
      {actsList.map((act, index) => (
        <Table.Tr key={act.id} onClick={() => handleDrawerOpen(act.id)}>
          <Table.Td align="center">{index + 1}</Table.Td>
          <Table.Td w="10%">{act.dateOfWorkCompletion.split(' ')[0]}</Table.Td>
          <Table.Td>{act.organization}</Table.Td>
          <Table.Td w="10%">{act.payerAccountNumber}</Table.Td>
          <Table.Td w="7%">{act.total}</Table.Td>
          <Table.Td w="7%">{act.vat !== 0 ? act.vat : ''}</Table.Td>
          <Table.Td w="5%" align="center">
            <ActionIcon
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                handleEditIconClick(act.id);
              }}
              variant="subtle"
            >
              <IconEdit
                width={25}
                height={25}
                color="#000"
              />
            </ActionIcon>
          </Table.Td>
          <Table.Td w="5%" align="center">
            <ActionIcon
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                handleDeleteIconClick(act.id);
              }}
              variant="subtle"
            >
              <IconTrash
                width={25}
                height={25}
                color="#000"
              />
            </ActionIcon>
          </Table.Td>
        </Table.Tr>
      ))}
      <Table.Tr>
        <Table.Td fw={900} align="center">ИТОГО</Table.Td>
        <Table.Td colSpan={7} fw={900} align="right">{totalActSumm}</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td fw={900} align="center">НДС</Table.Td>
        <Table.Td colSpan={7} fw={900} align="right">{totalActVat}</Table.Td>
      </Table.Tr>
    </>
  );

  const renderLoaderModal = () => (
    <LoadingOverlay
      visible
      loaderProps={{
        children: (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.5"
            width="80"
            visible
          />
        ),
      }}
    />
  );

  const renderTable = () => (
    actsList.length !== 0 && (
      <Group w="100%">
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          withRowBorders
          classNames={{
            th: classes.tableHeadCell,
            td: classes.tableBodyCell,
            thead: classes.thead,
          }}
        >
          <Table.Thead>{renderTableHead()}</Table.Thead>
          <Table.Tbody>
            {renderTableBody()}
          </Table.Tbody>
        </Table>
      </Group>
    )
  );

  const renderSearchNotesError = () => (
    actsList.length === 0
      && requestStatus === 'fulfilled'
      && (
        <Stack align="center" justify="center" w="100%">
          <Text style={{ fontSize: 18, color: 'red' }}>
            Совпадений не найдено
          </Text>
        </Stack>
      )
  );

  return (
    <Stack className="notes-table">
      {renderSearchNotesError()}
      {renderTable()}
      {actsList.length === 0 && requestStatus !== 'fulfilled' && mesError === '' && renderLoaderModal()}
      <DetailsInfoPanel
        currentAct={currentAct}
        detailsInfoPanelOpen={detailsInfoPanelOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </Stack>
  );
}

export default ActsListTableComponent;
