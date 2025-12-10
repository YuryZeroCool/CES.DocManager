import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox, Group, LoadingOverlay, Stack, Table, Text,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';

import { NotesWithoutActState } from 'types/mes/NotesWithoutActTypes';
import { RootState } from 'redux/reducers/combineReducers';
import { changeSelectedNoteId } from 'redux/reducers/mes/notesWithoutActReducer';
import { IAuthResponseType } from 'redux/store/configureStore';
import { ReactComponent as EditIcon } from 'assets/icons/edit-icon.svg';

import classes from './styles.module.css';
import headCells from './config';

interface NotesWithoutActsTableProps {
  selectedNotesId: number[];
  handleSelectNote: (newValue: number[]) => void;
  noteModalOpen: () => void;
  changeIsEditModal: (value: boolean) => void;
}

function NotesWithoutActsTable(props: NotesWithoutActsTableProps) {
  const {
    selectedNotesId,
    handleSelectNote,
    noteModalOpen,
    changeIsEditModal,
  } = props;

  const {
    requestStatus,
  } = useSelector<RootState, NotesWithoutActState>(
    (state) => state.notesWithoutAct,
  );

  const {
    notesWithoutAct,
  } = useSelector<RootState, NotesWithoutActState>(
    (state) => state.notesWithoutAct,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleClick = (id: number, isChecked: boolean) => {
    const newSelected = isChecked
      ? [...selectedNotesId, id]
      : selectedNotesId.filter((el) => el !== id);

    handleSelectNote(newSelected);
  };

  const isSelected = (id: number) => selectedNotesId.indexOf(id) !== -1;

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedNoteId(id));
    noteModalOpen();
    changeIsEditModal(true);
  };

  return (
    <div className="notes-table">
      <Group w="100%">
        <Table
          striped
          highlightOnHover
          withTableBorder
          classNames={{
            th: classes.tableHeadCell,
            td: classes.tableBodyCell,
            tr: classes.tableRow,
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {headCells.map((headCell) => (
                <Table.Th key={headCell.id}>{headCell.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {notesWithoutAct.length !== 0 && notesWithoutAct.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <Table.Tr
                  key={row.id}
                  bg={isItemSelected ? 'var(--mantine-color-blue-light)' : undefined}
                >
                  <Table.Td>
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleClick(row.id, event.currentTarget.checked)}
                    />
                  </Table.Td>
                  <Table.Td>
                    {row.street && (
                      <>
                        {row.street}
                        ,&nbsp;
                      </>
                    )}
                    {row.houseNumber && (
                      <>
                        д.&nbsp;
                        {row.houseNumber}
                      </>
                    )}
                    {row.entrance !== 0 && (
                      <>
                        ,&nbsp;
                        п.&nbsp;
                        {row.entrance}
                      </>
                    )}
                  </Table.Td>
                  <Table.Td miw={200}>{row.date.replace('T', ' ')}</Table.Td>
                  <Table.Td>{row.tel}</Table.Td>
                  <Table.Td>{row.comment}</Table.Td>
                  <Table.Td width="30px">
                    {(!row.street || !row.houseNumber) && (
                      <EditIcon
                        width={20}
                        height={20}
                        onClick={() => handleEditIconClick(row.id)}
                      />
                    )}
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>

        {notesWithoutAct.length === 0
          && requestStatus === 'fulfilled' && (
            <Stack align="center" justify="center" w="100%">
              <Text style={{ fontSize: 18, color: 'red' }}>
                Совпадений не найдено
              </Text>
            </Stack>
        )}
      </Group>

      {notesWithoutAct.length === 0 && requestStatus !== 'fulfilled' && (
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
        />
      )}
    </div>
  );
}

export default memo(NotesWithoutActsTable);
