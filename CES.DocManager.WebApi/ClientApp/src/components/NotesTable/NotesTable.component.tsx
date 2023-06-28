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
import { INote } from '../../types/MesTypes';

interface HeadCell {
  id: number;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 1,
    numeric: false,
    label: 'Комментарий',
  },
  {
    id: 2,
    numeric: true,
    label: 'Дата создания',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  bgcolor: 'transparent',
  border: 'none',
  outline: 'none',
};

interface Props {
  allNotes: INote[];
  mesError: string;
  requestStatus: string;
  handleEditIconClick: (id: number) => void;
}

export default function ProductsTableComponent(props: Props) {
  const {
    allNotes,
    mesError,
    requestStatus,
    handleEditIconClick,
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
      {allNotes.length === 0 && requestStatus !== 'fulfilled' && renderLoaderModal()}
    </div>
  );
}