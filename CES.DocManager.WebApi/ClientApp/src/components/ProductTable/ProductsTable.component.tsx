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
  IAllDecommissionedMaterials,
  IMaterialAttachedResponse,
  ISearch,
  IUsedMaterialResponse,
  Party,
  Product,
} from '../../types/ReportTypes';
import './ProductTable.style.scss';
import {
  HEADER_WIDTH,
  MARGIN, REPORT_PAGE_NAVIGATION,
  TABLE_HEADER_WIDTH,
} from './ProductTable.config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
  materials: Product[];
  baseMaterials: Product[];
  allAttachedMaterials: IMaterialAttachedResponse[];
  allUsedMaterials: IUsedMaterialResponse[];
  baseAllUsedMaterials: IUsedMaterialResponse[];
  baseAllAttachedMaterials: IMaterialAttachedResponse[];
  status: string;
  pageType: string;
  productsTableError: string;
  editMaterialsError: string;
  rowActiveId: number;
  offSetX: number;
  offSetTop: number;
  isMaterialReportDialogOpen: boolean;
  materialsTableType: string;
  isDialogHightBigger: boolean;
  divElRef: React.RefObject<HTMLDivElement>;
  allDecommissionedMaterials: IAllDecommissionedMaterials[];
  tableIndexArr: number[];
  searchValue: ISearch;
  totalCount: string;
  totalSum: string;
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

export default function ProductsTableComponent(props: Props) {
  const {
    materials,
    baseMaterials,
    allAttachedMaterials,
    baseAllAttachedMaterials,
    allUsedMaterials,
    baseAllUsedMaterials,
    allDecommissionedMaterials,
    pageType,
    status,
    productsTableError,
    editMaterialsError,
    rowActiveId,
    offSetX,
    offSetTop,
    isMaterialReportDialogOpen,
    materialsTableType,
    isDialogHightBigger,
    divElRef,
    tableIndexArr,
    searchValue,
    totalCount,
    totalSum,
    handleContextMenu,
  } = props;

  const renderProductsTableError = () => (
    <p className="error-message">{productsTableError}</p>
  );

  const renderEditMaterialsError = () => (
    <p className="error-message">{editMaterialsError}</p>
  );

  const renderDecommissionedMaterialsError = () => (
    <>
      {allDecommissionedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.decommissionedMaterialsSearchValue === '' && (
          <p className="error-message">История ремонтов пуста</p>
      )}
      {allDecommissionedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.decommissionedMaterialsSearchValue !== '' && (
          <p className="error-message">Совпадений не найдено</p>
      )}
    </>
  );

  const renderAllMaterialsError = () => (
    <>
      {materials.length === 0
        && status === 'fulfilled'
        && searchValue.materialsSearchValue === '' && (
          <p className="error-message">По этому счету нет материалов</p>
      )}
      {materials.length === 0
        && status === 'fulfilled'
        && searchValue.materialsSearchValue !== ''
        && materials.length !== baseMaterials.length && (
          <p className="error-message">Совпадений не найдено</p>
      )}
    </>
  );

  const renderAttachedMaterialsError = () => (
    <>
      {allAttachedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.attachedMaterialsSearchValue === '' && (
          <p className="error-message">Нет закрепленных материалов</p>
      )}
      {allAttachedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.attachedMaterialsSearchValue !== ''
        && allAttachedMaterials.length !== baseAllAttachedMaterials.length && (
          <p className="error-message">Совпадений не найдено</p>
      )}
    </>
  );

  const renderUsedMaterialsError = () => (
    <>
      {allUsedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.usedMaterialSearchValue === '' && (
          <p className="error-message">Нет списанных материалов</p>
      )}
      {allUsedMaterials.length === 0
        && status === 'fulfilled'
        && searchValue.usedMaterialSearchValue !== ''
        && allUsedMaterials.length !== baseAllUsedMaterials.length && (
          <p className="error-message">Совпадений не найдено</p>
      )}
    </>
  );

  const renderMaterialsError = () => (
    <>
      {materialsTableType === 'Свободные' && renderAllMaterialsError()}
      {materialsTableType === 'Прикрепленные' && renderAttachedMaterialsError()}
      {materialsTableType === 'Списанные' && renderUsedMaterialsError()}
    </>
  );

  const renderError = () => (
    <>
      {productsTableError !== '' && renderProductsTableError()}
      {editMaterialsError !== '' && renderEditMaterialsError()}
      {pageType === 'Материалы' && renderMaterialsError()}
      {pageType === 'История ремонтов' && renderDecommissionedMaterialsError()}
    </>
  );

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
      {pageType === 'Материалы' && materialsTableType === 'Свободные' && <StyledTableCell align="left">Сумма</StyledTableCell>}
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
          <StyledTableCell align="center">{tableIndexArr[index]}</StyledTableCell>
          <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
            {material.nameMaterial}
          </StyledTableCell>
          <StyledTableCell align="left">{material.unit}</StyledTableCell>
          <StyledTableCell align="left">{material.nameParty}</StyledTableCell>
          <StyledTableCell align="left">{material.partyDate.replace(/T/gi, ' ')}</StyledTableCell>
          <StyledTableCell align="left">{material.price.toFixed(2)}</StyledTableCell>
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

  const renderUsedMaterialsRows = () => (
    allUsedMaterials && allUsedMaterials.length > 0 && allUsedMaterials.map(
      (material: IUsedMaterialResponse, index: number) => (
        <StyledTableRow
          className={rowActiveId === material.id ? 'active' : ''}
          key={material.id}
          onContextMenu={(event) => handleContextMenu(event, material.id)}
        >
          <StyledTableCell align="center">{tableIndexArr[index]}</StyledTableCell>
          <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
            {material.nameMaterial}
          </StyledTableCell>
          <StyledTableCell align="left">{material.unit}</StyledTableCell>
          <StyledTableCell align="left">{material.nameParty}</StyledTableCell>
          <StyledTableCell align="left">{material.partyDate.replace(/T/gi, ' ')}</StyledTableCell>
          <StyledTableCell align="left">{material.price.toFixed(2)}</StyledTableCell>
          <StyledTableCell align="left">{material.count}</StyledTableCell>
        </StyledTableRow>
      ),
    )
  );

  const renderFirstRow = () => (
    <StyledTableRow className="first-row">
      <StyledTableCell align="center">{null}</StyledTableCell>
      <StyledTableCell sx={{ maxWidth: 350 }} component="th" scope="row">
        Итого
      </StyledTableCell>
      <StyledTableCell align="left">{null}</StyledTableCell>
      <StyledTableCell align="left">{null}</StyledTableCell>
      <StyledTableCell align="left">{null}</StyledTableCell>
      <StyledTableCell align="left">{null}</StyledTableCell>
      <StyledTableCell align="left">{totalCount}</StyledTableCell>
      <StyledTableCell align="left">{totalSum}</StyledTableCell>
    </StyledTableRow>
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
          <StyledTableCell align="left">{el.price.toFixed(2)}</StyledTableCell>
          <StyledTableCell align="left">{el.count}</StyledTableCell>
          <StyledTableCell align="left">{el.totalSum.toFixed(2)}</StyledTableCell>
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
    || (pageType === 'Материалы' && materialsTableType === 'Списанные' && allUsedMaterials && allUsedMaterials.length > 0)
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
                `calc(100vh - ${HEADER_WIDTH} - ${REPORT_PAGE_NAVIGATION} - ${TABLE_HEADER_WIDTH} - ${MARGIN} - 0px)`,
            }}
          >
            <Table stickyHeader aria-label="sticky table" className="materials-table">
              <TableHead>
                {pageType === 'Материалы' && renderHeaderByMaterialsPage()}
                {pageType === 'История ремонтов' && renderHeaderByHistoryPage()}
              </TableHead>
              <TableBody>
                {pageType === 'Материалы' && materialsTableType === 'Свободные' && renderFirstRow()}
                {pageType === 'Материалы' && materialsTableType === 'Свободные' && renderMaterialsRows()}
                {pageType === 'Материалы' && materialsTableType === 'Списанные' && renderUsedMaterialsRows()}
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
