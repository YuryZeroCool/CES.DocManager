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
  IAllDecommissionedMaterials,
  IMaterialAttachedResponse,
  Party,
  Product,
} from '../../types/ReportTypes';
import './ProductTable.style.scss';

const HEADER_WIDTH = '10vh';
const REPORT_PAGE_NAVIGATION = '40px';
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
  pageType: string;
  productsTableError: string;
  rowActiveId: number;
  offSetX: number;
  offSetTop: number;
  accordionHeight: number;
  isMaterialReportDialogOpen: boolean;
  materialsTableType: string;
  isDialogHightBigger: boolean;
  divElRef: React.RefObject<HTMLDivElement>;
  allDecommissionedMaterials: IAllDecommissionedMaterials[];
  tableIndexArr: number[];
  handleContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id?: number | undefined,
    el?: Party | undefined,
    material?: IAllDecommissionedMaterials | undefined,
  ) => void;
}

type ProductsTableProps = {
  children: React.ReactNode;
};

const ProductsTableWrapper = React.forwardRef<HTMLDivElement, ProductsTableProps>(
  (props, ref) => (
    <div ref={ref}>
      {props.children}
    </div>
  ),
);

export default function ProductsTable(props: Props) {
  const {
    materials,
    allAttachedMaterials,
    allDecommissionedMaterials,
    pageType,
    status,
    productsTableError,
    rowActiveId,
    offSetX,
    offSetTop,
    accordionHeight,
    isMaterialReportDialogOpen,
    materialsTableType,
    isDialogHightBigger,
    divElRef,
    tableIndexArr,
    handleContextMenu,
  } = props;

  const renderError = () => {
    if (productsTableError !== '') {
      return (<p className="error-message">{productsTableError}</p>);
    }
    if (pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && allAttachedMaterials?.length === 0 && status === 'fulfilled') {
      return (<p className="error-message">Нет закрепленных материалов</p>);
    }
    if (pageType === 'История ремонтов' && allDecommissionedMaterials?.length === 0 && status === 'fulfilled') {
      return (<p className="error-message">Нет закрепленных материалов</p>);
    }
    return pageType === 'Материалы' && materialsTableType === 'Свободные' && materials?.length === 0 && status === 'fulfilled' && (
      <p className="error-message">По этому счету нет материалов</p>
    );
  };

  const renderHeaderByMaterialsPage = () => (
    <TableRow>
      <StyledTableCell align="center">№</StyledTableCell>
      <StyledTableCell>Материал</StyledTableCell>
      <StyledTableCell align="left">Ед. изм.</StyledTableCell>
      <StyledTableCell align="left">Партия</StyledTableCell>
      <StyledTableCell align="left">Дата</StyledTableCell>
      <StyledTableCell align="left">Цена</StyledTableCell>
      <StyledTableCell align="left">Кол-во</StyledTableCell>
      {pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && <StyledTableCell align="left">Авто</StyledTableCell>}
    </TableRow>
  );

  const renderHeaderByHistoryPage = () => (
    <TableRow>
      <StyledTableCell align="center">№</StyledTableCell>
      <StyledTableCell align="left">Слесарь</StyledTableCell>
      <StyledTableCell align="left">Дата ремонта</StyledTableCell>
      <StyledTableCell align="left">Машина</StyledTableCell>
    </TableRow>
  );

  const renderAttachedMaterialsRows = () => (
    allAttachedMaterials && allAttachedMaterials.length > 0 && allAttachedMaterials.map(
      (material: IMaterialAttachedResponse, index: number) => (
        <StyledTableRow
          className={rowActiveId === material.id ? 'active' : ''}
          key={material.id}
          onContextMenu={(event) => handleContextMenu(event, material.id)}
        >
          <StyledTableCell align="center">{index + 1}</StyledTableCell>
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
      (material: Product, index: number) => material.party.map((el) => (
        <StyledTableRow
          className={rowActiveId === el.partyId ? 'active' : ''}
          key={el.partyId}
          onContextMenu={(event) => handleContextMenu(event, undefined, el)}
        >
          <StyledTableCell align="center">{tableIndexArr ? tableIndexArr[index] : '0'}</StyledTableCell>
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

  const renderDecommissionedMaterialsRows = () => (
    allDecommissionedMaterials
    && allDecommissionedMaterials.length > 0
    && allDecommissionedMaterials.map(
      (el: IAllDecommissionedMaterials, index: number) => (
        <StyledTableRow
          className={rowActiveId === el.id ? 'active' : ''}
          key={el.id}
          onContextMenu={(event) => handleContextMenu(event, undefined, undefined, el)}
        >
          <StyledTableCell align="center">{index + 1}</StyledTableCell>
          <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
            {el.carMechanic}
          </StyledTableCell>
          <StyledTableCell align="left">{el.currentDate?.toString().replace(/T/gi, ' ').split(' ')[0]}</StyledTableCell>
          <StyledTableCell align="left">{`${el.materials[0].vehicleBrand} (${el.materials[0].numberPlateCar})`}</StyledTableCell>
        </StyledTableRow>
      ),
    )
  );

  const renderTable = () => (
    productsTableError === '' && ((pageType === 'Материалы' && materialsTableType === 'Свободные' && materials && materials?.length > 0)
    || (pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && allAttachedMaterials && allAttachedMaterials.length > 0)
    || (pageType === 'История ремонтов' && allDecommissionedMaterials && allDecommissionedMaterials.length > 0))
    && (
      <ProductsTableWrapper>
        <Paper sx={{ width: '100%' }}>
          <TableContainer
            ref={divElRef}
            sx={{
              position: 'relative',
              overflow: isDialogHightBigger ? 'visible' : 'auto',
              maxHeight:
                `calc(100vh - ${HEADER_WIDTH} - ${REPORT_PAGE_NAVIGATION} - ${TABLE_HEADER_WIDTH} - ${MARGIN} - ${
                  pageType === 'Материалы' && materialsTableType === 'Свободные' ? accordionHeight : 0}px)`,
            }}
          >
            <Table stickyHeader aria-label="sticky table" className="materials-table">
              <TableHead>
                {pageType === 'Материалы' && renderHeaderByMaterialsPage()}
                {pageType === 'История ремонтов' && renderHeaderByHistoryPage()}
              </TableHead>
              <TableBody>
                {pageType === 'Материалы' && materialsTableType === 'Свободные' && renderMaterialsRows()}
                {pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && renderAttachedMaterialsRows()}
                {pageType === 'История ремонтов' && renderDecommissionedMaterialsRows()}
              </TableBody>
            </Table>
            {isMaterialReportDialogOpen && (
              <MaterialReportDialog
                offSetX={offSetX}
                offSetTop={offSetTop}
                isDialogHightBigger={isDialogHightBigger}
              />
            )}
          </TableContainer>
        </Paper>
      </ProductsTableWrapper>
    )
  );

  return (
    <div className="material-table">
      {renderError()}
      {renderTable()}
    </div>
  );
}
