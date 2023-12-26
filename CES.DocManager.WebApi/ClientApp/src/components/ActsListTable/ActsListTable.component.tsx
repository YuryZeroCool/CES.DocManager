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
    id: 1,
    label: 'Название организации',
  },
  {
    id: 2,
    label: 'Дата создания акта',
  },
  {
    id: 3,
    label: 'Водитель',
  },
  {
    id: 4,
    label: 'Номер машины',
  },
  {
    id: 5,
    label: 'Адрес заявки',
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
    handleDrawerOpen,
    handleDrawerClose,
    handleEditIconClick,
    handleDeleteIconClick,
  } = props;

  const renderError = () => (
    mesError !== '' && (
      <p className="error-message">{mesError}</p>
    )
  );

  const renderTableHead = () => (
    <Table.Tr>
      {headCells.map((headCell) => (
        <Table.Th key={headCell.id}>{headCell.label}</Table.Th>
      ))}
    </Table.Tr>
  );

  const renderTableBody = () => (
    <>
      {actsList.map((act) => (
        <Table.Tr key={act.id} onClick={() => handleDrawerOpen(act.id)}>
          <Table.Td w="30%">{act.organization}</Table.Td>
          <Table.Td w="15%">{act.actDateOfCreation}</Table.Td>
          <Table.Td w="10%">{act.driver}</Table.Td>
          <Table.Td w="10%">{act.numberPlateOfCar}</Table.Td>
          <Table.Td w="25%">
            {act.notesWithoutAct.map((note) => (
              <Text key={note.id} style={{ fontSize: 14 }}>
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
            ))}
          </Table.Td>
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

  return (
    <Stack className="notes-table">
      {renderError()}
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
