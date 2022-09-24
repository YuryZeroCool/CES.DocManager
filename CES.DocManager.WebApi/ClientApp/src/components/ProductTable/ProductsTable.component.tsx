import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ProductTable.style.scss';
import { AllMaterialsResponse, Product } from '../../types/ReportTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
  materials: AllMaterialsResponse | undefined;
}

export default function ProductsTable({ materials }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Материал</StyledTableCell>
            <StyledTableCell align="left">Ед. изм.</StyledTableCell>
            <StyledTableCell align="left">Партия</StyledTableCell>
            <StyledTableCell align="left">Дата</StyledTableCell>
            <StyledTableCell align="left">Цена</StyledTableCell>
            <StyledTableCell align="left">Кол-во</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materials && materials.map((material: Product) => (
            <StyledTableRow key={material.id}>
              <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
                {material.name}
              </StyledTableCell>
              <StyledTableCell align="left">{material.unit}</StyledTableCell>
              <StyledTableCell align="left">{material.party[0].partyName}</StyledTableCell>
              <StyledTableCell align="left">{material.party[0].partyDate}</StyledTableCell>
              <StyledTableCell align="left">{material.party[0].price}</StyledTableCell>
              <StyledTableCell align="left">{material.party[0].count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
