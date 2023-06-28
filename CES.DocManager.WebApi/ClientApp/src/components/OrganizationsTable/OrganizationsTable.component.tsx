import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import {
  Box,
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
import { OrganizationResponse } from '../../types/MesTypes';

interface HeadCell {
  id: number;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 1,
    numeric: false,
    label: 'Название организации',
  },
  {
    id: 2,
    numeric: true,
    label: 'Адрес',
  },
  {
    id: 3,
    numeric: true,
    label: 'Email',
  },
  {
    id: 4,
    numeric: true,
    label: 'Телефон',
  },
  {
    id: 5,
    numeric: true,
    label: 'УНП',
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
  allOrganizations: OrganizationResponse[];
  mesError: string;
  requestStatus: string;
  handleEditIconClick: (id: number) => void;
  handleDeleteIconClick: (id: number) => void;
}

export default function OrganizationsTableComponent(props: Props) {
  const {
    allOrganizations,
    mesError,
    requestStatus,
    handleEditIconClick,
    handleDeleteIconClick,
  } = props;

  const renderError = () => (
    mesError !== '' && (
      <p className="error-message">{mesError}</p>
    )
  );

  const renderTableHead = () => (
    <TableHead>
      <TableRow>
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
      {allOrganizations.map((row) => (
        <TableRow
          hover
          tabIndex={-1}
          key={row.id}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell
            component="th"
            scope="row"
          >
            {row.name}
          </TableCell>
          <TableCell>{row.address}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.payerAccountNumber}</TableCell>
          <TableCell width="30px">
            <EditIcon
              width={20}
              height={20}
              // onClick={() => handleEditIconClick(row.id)}
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
    allOrganizations.length !== 0 && (
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
      {allOrganizations.length === 0 && requestStatus !== 'fulfilled' && mesError === '' && renderLoaderModal()}
    </div>
  );
}
