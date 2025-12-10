import React, { memo, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import {
  ActionIcon, Group, LoadingOverlay, Stack, Table, Text,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { RootState } from 'redux/reducers/combineReducers';
import { IAuthResponseType } from 'redux/store/configureStore';
import { changeSelectedActId, editActsListAfterDelete } from 'redux/reducers/mes/mesReducer';
import deleteAct from 'redux/actions/mes/deleteAct';
import { ActsList, INotesState } from 'types/MesTypes';
import classes from './styles.module.css';
import ActDetailsInfoPanel from '../ActDetailsInfoPanel';

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
    label: 'Номер договора',
  },
  {
    id: 5,
    label: 'Сумма',
  },
  {
    id: 6,
    label: 'НДС',
  },
  {
    id: 7,
    label: '',
  },
  {
    id: 8,
    label: '',
  },
];

interface ActsListTableProps {
  editActModalOpen: () => void;
}

function ActsListTable(props: ActsListTableProps) {
  const {
    editActModalOpen,
  } = props;

  const [currentAct, setCurrentAct] = useState<ActsList | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [totalActSumm, setTotalActSumm] = useState(0);
  const [totalActVat, setTotalActVat] = useState(0);

  const dispatch: IAuthResponseType = useDispatch();

  const {
    mesError,
    actsList,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  useEffect(() => {
    let summ = 0;
    let vat = 0;
    if (actsList.length > 0) {
      actsList.forEach((el) => {
        summ += parseFloat(el.total.toString()) * 100;
        vat += parseFloat(el.vat.toString()) * 100;
      });

      setTotalActSumm(+(summ / 100).toFixed(2));
      setTotalActVat(+(vat / 100).toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actsList]);

  const handleDrawerOpen = (actId: number) => {
    const act = actsList.filter((el) => el.id === actId)[0];
    setCurrentAct(act);
    open();
  };

  const handleDrawerClose = () => {
    setCurrentAct(null);
    close();
  };

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedActId(id));
    editActModalOpen();
  };

  const handleDeleteIconClick = (id: number) => {
    dispatch(deleteAct(id))
      .then(() => dispatch(editActsListAfterDelete(id)))
      .catch(() => {});
  };

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
          <Table.Td
            w="10%"
            onClick={(e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
              e.stopPropagation();
            }}
          >
            {act.contractNumber}
          </Table.Td>
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

  const renderError = () => (
    mesError !== ''
      && (
        <Stack align="center" justify="center" w="100%" h={200}>
          <Text style={{ fontSize: 18, color: 'red' }}>
            {mesError}
          </Text>
        </Stack>
      )
  );

  const renderLoaderModal = () => (
    <LoadingOverlay
      visible
      loaderProps={{
        children: (
          <RotatingLines
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.5"
            width="80"
            visible
          />
        ),
      }}
      overlayProps={{
        color: 'black',
        blur: 2,
        opacity: 0.4,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    />
  );

  return (
    <Stack className="notes-table">
      {renderError()}
      {renderTable()}
      {requestStatus === 'pending' && mesError === '' && renderLoaderModal()}
      {opened && (
        <ActDetailsInfoPanel
          currentAct={currentAct}
          detailsInfoPanelOpen={opened}
          handleDrawerClose={handleDrawerClose}
        />
      )}
    </Stack>
  );
}

export default memo(ActsListTable);
