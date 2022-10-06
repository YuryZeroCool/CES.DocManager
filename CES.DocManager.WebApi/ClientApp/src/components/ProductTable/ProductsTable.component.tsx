import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MaterialReportDialog from '../MaterialReportDialog/MaterialReportDialog.container';
import { AllMaterialsResponse, Party, Product } from '../../types/ReportTypes';
import './ProductTable.style.scss';

const HEADER_WIDTH = '10vh';
const TABLE_HEADER_WIDTH = '9vh';
const MARGIN = '3vh';

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

interface Props {
  materials: AllMaterialsResponse | undefined;
  status: string;
  productsTableError: string;
  handleContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    el: Party,
  ) => void;
  rowActiveId: number;
  offSetX: number;
  offSetTop: number;
  accordionHeight: number;
  isMaterialReportDialogOpen: boolean;
}

export default function ProductsTable(props: Props) {
  const {
    materials,
    status,
    productsTableError,
    handleContextMenu,
    rowActiveId,
    offSetX,
    offSetTop,
    accordionHeight,
    isMaterialReportDialogOpen,
  } = props;

  const renderError = () => {
    if (productsTableError !== '') {
      return (<p className="error-message">{productsTableError}</p>);
    }
    return materials?.length === 0 && status === 'fulfilled' && (
      <p className="error-message">По этому счету нет материалов</p>
    );
  };

  const renderTable = () => (
    productsTableError === '' && materials && materials?.length > 0 && (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          sx={{ position: 'relative', maxHeight: `calc(100vh - ${HEADER_WIDTH} - ${TABLE_HEADER_WIDTH} - ${MARGIN} - ${accordionHeight}px)` }}
        >
          <Table stickyHeader aria-label="sticky table" className="materials-table">
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
              {materials.map((material: Product) => material.party.map((el) => (
                <StyledTableRow
                  className={rowActiveId === el.partyId ? 'active' : ''}
                  key={el.partyId}
                  onContextMenu={(event) => handleContextMenu(event, el)}
                >
                  <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
                    {material.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{material.unit}</StyledTableCell>
                  <StyledTableCell align="left">{el.partyName}</StyledTableCell>
                  <StyledTableCell align="left">{el.partyDate.replace(/T/gi, ' ')}</StyledTableCell>
                  <StyledTableCell align="left">{el.price}</StyledTableCell>
                  <StyledTableCell align="left">{el.count}</StyledTableCell>
                </StyledTableRow>
              )))}
            </TableBody>
          </Table>
          {isMaterialReportDialogOpen && (
            <MaterialReportDialog
              offSetX={offSetX}
              offSetTop={offSetTop}
            />
          )}
        </TableContainer>
      </Paper>
    )
  );

  return (
    <>
      {renderError()}
      {renderTable()}
    </>
  );
}
