import React from 'react';
import {
  Box,
  Button,
  Modal,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IAllDecommissionedMaterials, IMaterialAttachedResponse } from '../../types/ReportTypes';

interface DetailedInformationModalProps {
  isDetailedInformationModalOpen: boolean;
  repairInfo: IAllDecommissionedMaterials;
  handleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '20px 32px',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: 'bold',
    borderLeft: '1px solid #fff',
    borderRight: '1px solid #fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: 'relative',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.active': {
    backgroundColor: '#007bff',
  },
}));

export default function DetailedInformationModalComponent(props: DetailedInformationModalProps) {
  const {
    isDetailedInformationModalOpen,
    repairInfo,
    handleClose,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Подробная информация
    </Typography>
  );

  const renderTableHeader = () => (
    <TableRow>
      <StyledTableCell align="center">№</StyledTableCell>
      <StyledTableCell align="center">Материал</StyledTableCell>
      <StyledTableCell align="center">Ед. изм.</StyledTableCell>
      <StyledTableCell align="center">Партия</StyledTableCell>
      <StyledTableCell align="center">Дата</StyledTableCell>
      <StyledTableCell align="center">Цена</StyledTableCell>
      <StyledTableCell align="center">Кол-во</StyledTableCell>
      <StyledTableCell align="center">Авто</StyledTableCell>
    </TableRow>
  );

  const renderRows = () => (
    repairInfo.materials.map(
      (el: IMaterialAttachedResponse, index: number) => (
        <StyledTableRow
          key={el.id}
        >
          <StyledTableCell align="center">{index + 1}</StyledTableCell>
          <StyledTableCell align="center" component="th" scope="row">
            {el.nameMaterial}
          </StyledTableCell>
          <StyledTableCell align="center">{el.unit}</StyledTableCell>
          <StyledTableCell align="center">{el.nameParty}</StyledTableCell>
          <StyledTableCell align="center" sx={{ width: 100 }}>{el.partyDate.replace(/T/gi, ' ').split(' ')[0]}</StyledTableCell>
          <StyledTableCell align="center">{el.price}</StyledTableCell>
          <StyledTableCell align="center">{el.count}</StyledTableCell>
          <StyledTableCell align="center">{`${el.vehicleBrand} (${el.numberPlateCar})`}</StyledTableCell>
        </StyledTableRow>
      ),
    )
  );

  const renderTable = () => (
    <Paper sx={{ width: '100%', marginBottom: '20px' }}>
      <TableContainer
        sx={{
          position: 'relative',
          maxHeight: '350px',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {renderTableHeader()}
          </TableHead>
          <TableBody>
            {renderRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  return (
    <Modal
      open={isDetailedInformationModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {renderTitle()}
        <h6>
          <b>Механик:&ensp;</b>
          {repairInfo.carMechanic}
        </h6>
        <h6>
          <b>Дата ремонта:&ensp;</b>
          {repairInfo.currentDate?.toString().replace(/T/gi, ' ').split(' ')[0]}
        </h6>
        {renderTable()}
        <Button
          sx={{ left: '91%' }}
          variant="contained"
          size="small"
          onClick={() => {
            handleClose();
          }}
        >
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
