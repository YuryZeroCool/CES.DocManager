import * as React from 'react';
import {
  Box,
  Checkbox,
  InputAdornment,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { RotatingLines } from 'react-loader-spinner';
import { HeadSearchCell, IFullNoteData, SearchValueType } from '../../types/MesTypes';
import { headCells, headSearchCells, styles } from './NotesWithoutActsTable.config';

interface Props {
  notesWithoutAct: IFullNoteData[];
  baseNotesWithoutAct: IFullNoteData[];
  mesError: string;
  requestStatus: string;
  searchValues: SearchValueType[];
  isSearch: boolean;
  isSelected: (id: number) => boolean;
  handleClick: (id: number) => void;
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
        <p className="error-message">Совпадений не найдено</p>
    )
  );

  const renderError = () => (
    mesError !== '' && (
      <p className="error-message">{mesError}</p>
    )
  );

  const renderRowWithSearch = () => (
    <TableRow>
      <TableCell padding="checkbox" />
      {headSearchCells.map((headSearchCell: HeadSearchCell, index) => (
        <TableCell
          key={headSearchCell.id}
          align="center"
          padding="normal"
          sx={{ border: '1px solid rgb(224, 224, 224)', fontWeight: '700', fontSize: '16px' }}
        >
          {searchValues.length !== 0 && (
            <TextField
              id="outlined-basic"
              value={searchValues[index].value}
              onChange={(ev) => handleChangeSearch(headSearchCell.id, ev.target.value)}
              size="small"
              variant="outlined"
              label="Поиск"
              name={headSearchCell.name}
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sx={{ border: '1px solid rgb(224, 224, 224)', fontWeight: '700', fontSize: '16px' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
      {renderRowWithSearch()}
    </TableHead>
  );

  const renderTableBody = () => (
    <TableBody>
      {notesWithoutAct.length !== 0 && notesWithoutAct.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={row.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleClick(row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <TableCell align="left">
              {row.street}
              {row.houseNumber}
              {row.entrance}
            </TableCell>
            <TableCell sx={{ minWidth: 200 }} align="center">{row.date.replace('T', ' ')}</TableCell>
            <TableCell align="center">{row.tel}</TableCell>
            <TableCell align="left">{row.comment}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  const renderTable = () => (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ width: '100%' }}
            aria-labelledby="tableTitle"
          >
            {renderTableHead()}
            {renderTableBody()}
          </Table>
          {renderSearchNotesError()}
        </TableContainer>
      </Paper>
    </Box>
  );

  const renderLoaderModal = () => (
    <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles}>
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.5"
          width="80"
          visible
        />
      </Box>
    </Modal>
  );

  return (
    <div className="notes-table">
      {renderError()}
      {renderTable()}
      {notesWithoutAct.length === 0 && requestStatus !== 'fulfilled' && mesError === '' && !isSearch && renderLoaderModal()}
    </div>
  );
}
