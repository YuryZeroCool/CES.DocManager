import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Checkbox,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-icon.svg';
import { headCells, style } from './NotesTable.config';
import { INote } from '../../types/MesTypes';
import WarningModalContainer from '../WarningModal/WarningModal.container';

export interface Props {
  allNotes: INote[];
  mesError: string;
  requestStatus: string;
  open: boolean;
  handleEditIconClick: (id: number) => void;
  handleDeleteIconClick: (id: number) => void;
  handleClose: () => void;
  cofirmAction: () => void;
}

export default function NotesTableComponent(props: Props) {
  const {
    allNotes,
    mesError,
    requestStatus,
    open,
    handleEditIconClick,
    handleDeleteIconClick,
    handleClose,
    cofirmAction,
  } = props;

  const renderError = () => (
    mesError !== '' && (
      <p className="error-message">{mesError}</p>
    )
  );

  const renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sx={{ border: '1px solid rgb(224, 224, 224)', fontWeight: '700', fontSize: '16px' }}
          >
            <TableSortLabel>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );

  const renderTableBody = () => (
    <TableBody>
      {allNotes.map((row) => (
        <TableRow
          hover
          tabIndex={-1}
          key={row.id}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={row.isChecked}
            />
          </TableCell>
          <TableCell
            component="th"
            scope="row"
          >
            {row.comment}
          </TableCell>
          <TableCell width="180px">{row.date.replace('T', ' ')}</TableCell>
          <TableCell width="30px">
            <EditIcon
              width={20}
              height={20}
              onClick={() => handleEditIconClick(row.id)}
            />
          </TableCell>
          <TableCell width="30px">
            <DeleteIcon
              width={20}
              height={20}
              onClick={() => handleDeleteIconClick(row.id)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const renderLoaderModal = () => (
    <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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

  const renderTable = () => (
    allNotes.length !== 0 && (
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
          </TableContainer>
        </Paper>
      </Box>
    )
  );

  return (
    <div className="notes-table">
      {renderError()}
      {renderTable()}
      <WarningModalContainer
        open={open}
        handleClose={handleClose}
        cofirmAction={cofirmAction}
      />
      {allNotes.length === 0 && requestStatus !== 'fulfilled' && renderLoaderModal()}
    </div>
  );
}
