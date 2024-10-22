import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  Checkbox, Group, LoadingOverlay, Stack, Table, Text,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';
import { INotesState } from '../../../../../../types/MesTypes';
import { RootState } from '../../../../../../redux/reducers/combineReducers';
import classes from './NotesWithoutActsTable.module.css';
import headCells from './NotesWithoutActsTable.config';

interface Props {
  selectedNotesId: number[];
  handleSelectNote: (newValue: number[]) => void;
}

function NotesWithoutActsTable(props: Props) {
  const {
    selectedNotesId,
    handleSelectNote,
  } = props;

  const {
    notesWithoutAct,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const handleClick = (id: number, isChecked: boolean) => {
    const newSelected = isChecked
      ? [...selectedNotesId, id]
      : selectedNotesId.filter((el) => el !== id);

    handleSelectNote(newSelected);
  };

  const isSelected = (id: number) => selectedNotesId.indexOf(id) !== -1;

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
                strokeColor="white"
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
