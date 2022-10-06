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
import {
  AllMaterialsResponse,
  IMaterialAttachedResponse,
  Party,
  Product,
} from '../../types/ReportTypes';
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
  allAttachedMaterials: IMaterialAttachedResponse[];
  status: string;
  productsTableError: string;
  handleContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id?: number | undefined,
    el?: Party | undefined,
  ) => void;
  rowActiveId: number;
  offSetX: number;
  offSetTop: number;
  accordionHeight: number;
  isMaterialReportDialogOpen: boolean;
  materialsTableType: string;
}

export default function ProductsTable(props: Props) {
  const {
    materials,
    allAttachedMaterials,
    status,
    productsTableError,
    handleContextMenu,
    rowActiveId,
    offSetX,
    offSetTop,
    accordionHeight,
    isMaterialReportDialogOpen,
    materialsTableType,
  } = props;

  const renderError = () => {
    if (productsTableError !== '') {
      return (<p className="error-message">{productsTableError}</p>);
    }
    if (materialsTableType === 'Прикрепленные' && allAttachedMaterials?.length === 0 && status === 'fulfilled') {
      return (<p className="error-message">Нет закрепленных материалов</p>);
    }
    return materialsTableType === 'Свободные' && materials?.length === 0 && status === 'fulfilled' && (
      <p className="error-message">По этому счету нет материалов</p>
    );
  };

  const renderAttachedMaterialsRows = () => (
    allAttachedMaterials && allAttachedMaterials.length > 0 && allAttachedMaterials.map(
      (material: IMaterialAttachedResponse) => (
        <StyledTableRow
          className={rowActiveId === material.id ? 'active' : ''}
          key={material.id}
          onContextMenu={(event) => handleContextMenu(event, material.id)}
        >
          <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
            {material.nameMaterial}
          </StyledTableCell>
          <StyledTableCell align="left">{material.unit}</StyledTableCell>
          <StyledTableCell align="left">{material.nameParty}</StyledTableCell>
          <StyledTableCell align="left">{material.partyDate.replace(/T/gi, ' ')}</StyledTableCell>
          <StyledTableCell align="left">{material.price}</StyledTableCell>
          <StyledTableCell align="left">{material.count}</StyledTableCell>
          <StyledTableCell align="left">
            {material.vehicleBrand}
            (
            {material.numberPlateCar}
            )
          </StyledTableCell>
        </StyledTableRow>
      ),
    )
  );

  const renderMaterialsRows = () => (
    materials && materials?.length > 0 && materials.map(
      (material: Product) => material.party.map((el) => (
        <StyledTableRow
          className={rowActiveId === el.partyId ? 'active' : ''}
          key={el.partyId}
          onContextMenu={(event) => handleContextMenu(event, undefined, el)}
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
      )),
    )
  );

  const renderTable = () => (
    productsTableError === '' && ((materialsTableType === 'Свободные' && materials && materials?.length > 0)
    || (materialsTableType === 'Прикрепленные' && allAttachedMaterials && allAttachedMaterials.length > 0))
    && (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          sx={{
            position: 'relative',
            maxHeight: `calc(100vh - ${HEADER_WIDTH} - ${TABLE_HEADER_WIDTH} - ${MARGIN} - ${materialsTableType === 'Свободные' ? accordionHeight : 0}px)`,
          }}
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
                {materialsTableType === 'Прикрепленные' && <StyledTableCell align="left">Авто</StyledTableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {materialsTableType === 'Свободные' && renderMaterialsRows()}
              {materialsTableType === 'Прикрепленные' && renderAttachedMaterialsRows()}
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
