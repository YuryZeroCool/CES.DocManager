import * as React from 'react';
import {
  Checkbox,
  Group,
  LoadingOverlay,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { Search } from '@mui/icons-material';
import { RotatingLines } from 'react-loader-spinner';
import { IFullNoteData, SearchValueType } from '../../types/MesTypes';
import { headCells, headSearchCells } from './NotesWithoutActsTable.config';
import classes from './NotesWithoutActsTable.module.scss';

interface Props {
  notesWithoutAct: IFullNoteData[];
  baseNotesWithoutAct: IFullNoteData[];
  mesError: string;
  requestStatus: string;
  searchValues: SearchValueType[];
  isSearch: boolean;
  isSelected: (id: number) => boolean;
  handleClick: (id: number, isChecked: boolean) => void;
  handleChangeSearch: (id: string, value: string) => void;
}

export default function NotesWithoutActsTableComponent(props: Props) {
  const {
    notesWithoutAct,
    baseNotesWithoutAct,
    mesError,
    requestStatus,
    searchValues,
    isSearch,
    isSelected,
    handleClick,
    handleChangeSearch,
  } = props;

  const renderSearchNotesError = () => (
    notesWithoutAct.length === 0
      && requestStatus === 'fulfilled'
      && isSearch
      && notesWithoutAct.length !== baseNotesWithoutAct.length && (
        <Stack align="center" justify="center" w="100%">
          <Text style={{ fontSize: 18, color: 'red' }}>
            Совпадений не найдено
          </Text>
        </Stack>
    )
  );

  const renderError = () => (
    mesError !== '' && (
      <Stack align="center" justify="center" w="100%">
        <Text style={{ fontSize: 18, color: 'red' }}>
          {mesError}
        </Text>
      </Stack>
    )
  );

  const renderRowWithSearch = () => (
    <Table.Tr>
      <Table.Td />
      {headSearchCells.map((headSearchCell, index) => (
        <Table.Td key={headSearchCell.id}>
          {searchValues.length !== 0 && (
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              rightSection={<Search />}
              label="Поиск"
              value={searchValues[index].value}
              onChange={(ev) => handleChangeSearch(headSearchCell.id, ev.target.value)}
            />
          )}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const renderTableHead = () => (
    <Table.Tr>
      {headCells.map((headCell) => (
        <Table.Th key={headCell.id}>{headCell.label}</Table.Th>
      ))}
    </Table.Tr>
  );

  const renderTableBody = () => (
    notesWithoutAct.length !== 0 && notesWithoutAct.map((row) => {
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
    })
  );

  const renderTable = () => (
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
          {renderTableHead()}
        </Table.Thead>
        <Table.Tbody>
          {renderRowWithSearch()}
          {notesWithoutAct.length !== 0 && (
            renderTableBody()
          )}
        </Table.Tbody>
      </Table>

      {renderError()}
      {renderSearchNotesError()}
    </Group>
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

  return (
    <div className="notes-table">
      {renderTable()}
      {notesWithoutAct.length === 0 && requestStatus !== 'fulfilled' && mesError === '' && !isSearch && renderLoaderModal()}
    </div>
  );
}
