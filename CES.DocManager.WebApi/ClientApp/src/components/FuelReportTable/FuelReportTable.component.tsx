import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { DivisionData, IGetFuelReportInfoResponse } from '../../types/ReportTypes';
import { fuelReportDivisions, fuelReportTableHeaderSells } from './FuelReportTable.config';
import './FuelReportTable.style.scss';

interface Props {
  fuelReportInfo: IGetFuelReportInfoResponse[];
  divisionsWithShifts: IGetFuelReportInfoResponse[];
  divisionsWithoutShifts: DivisionData[];
  status: string;
  fuelReportInfoError: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: '1px solid rgba(224, 224, 224, 1)',
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

export default function FuelReportTableComponent(props: Props) {
  const {
    fuelReportInfo,
    divisionsWithShifts,
    divisionsWithoutShifts,
    status,
    fuelReportInfoError,
  } = props;

  const renderFuelReportInfoError = (message: string) => (
    <p className="error-message">{message}</p>
  );

  const renderError = () => (
    <>
      {fuelReportInfoError !== '' && renderFuelReportInfoError(fuelReportInfoError)}
      {fuelReportInfo.length === 0 && status === 'fulfilled' && renderFuelReportInfoError('По выбранному периоду нет данных')}
    </>
  );

  const renderHeaderOfDivisionsWithShiftsTable = () => (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        {fuelReportDivisions.map((el) => (
          <StyledTableCell align="center" colSpan={2}>{el}</StyledTableCell>
        ))}
        <StyledTableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>ИТОГО</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell align="center" sx={{ top: 57, minWidth: 250 }}>Машина</StyledTableCell>
        {fuelReportTableHeaderSells.map((el) => (
          <StyledTableCell align="center" sx={{ top: 57 }}>{el}</StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderDivisionsWithShiftsTable = () => (
    <Paper sx={{ width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {renderHeaderOfDivisionsWithShiftsTable()}
          <TableBody>
            {divisionsWithShifts.length !== 0 && divisionsWithShifts.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.carNumber}
                </StyledTableCell>
                {row.workCards.map((division) => (
                  <React.Fragment key={division.id}>
                    <StyledTableCell align="center">{division.mileagePerMonth}</StyledTableCell>
                    <StyledTableCell align="center">{division.fuelPerMonth}</StyledTableCell>
                  </React.Fragment>
                ))}
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>{row.sumMileage}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>{row.sumFuel}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderDivisionsWithoutShiftsTable = () => (
    divisionsWithoutShifts.length !== 0 && divisionsWithoutShifts.map((el) => (
      <Paper sx={{ width: '33%' }} key={el.id}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" colSpan={3}>{el.divisionName}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center" sx={{ width: '11%' }}>Машина</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '11%' }}>Пробег</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '11%' }}>Расход топлива</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {el.data.length !== 0 && el.data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.carNumber}
                  </StyledTableCell>
                  {row.workCards.map((division) => (
                    <React.Fragment key={division.id}>
                      <StyledTableCell align="center">{division.mileagePerMonth}</StyledTableCell>
                      <StyledTableCell align="center">{division.fuelPerMonth}</StyledTableCell>
                    </React.Fragment>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    ))
  );

  const renderTable = () => (
    fuelReportInfoError === '' && fuelReportInfo.length > 0 && (
      <>
        {renderDivisionsWithShiftsTable()}
        <div className="divisions-without-shifts-table-block">
          {renderDivisionsWithoutShiftsTable()}
        </div>
      </>
    )
  );

  return (
    <div className="fuel-report-table-wrapper">
      {renderError()}
      {renderTable()}
    </div>
  );
}
