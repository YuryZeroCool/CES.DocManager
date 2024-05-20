import { Table } from '@mantine/core';
import React, { Fragment, memo } from 'react';
import { IGetFuelReportInfoResponse } from '../../../../../../types/ReportTypes';
import { fuelReportDivisions, fuelReportTableHeaderSells } from './constants';
import classes from '../../fuelReportTable.module.scss';

interface DivisionsWithShiftsTableProps {
  divisionsWithShifts: IGetFuelReportInfoResponse[];
}

function DivisionsWithShiftsTable(props: DivisionsWithShiftsTableProps) {
  const { divisionsWithShifts } = props;

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      stickyHeader
      stickyHeaderOffset="10vh"
      classNames={{
        th: classes.tableHeadCell,
        td: classes.tableBodyCell,
        tr: classes.tableRow,
      }}
    >
      <Table.Thead>
        <>
          <Table.Tr>
            <Table.Th />
            {fuelReportDivisions.map((el) => (
              <Table.Th key={el} colSpan={2} style={{ textAlign: 'center' }}>{el}</Table.Th>
            ))}
            <Table.Th colSpan={2} style={{ fontWeight: 'bold', textAlign: 'center' }}>ИТОГО</Table.Th>
          </Table.Tr>

          <Table.Tr>
            <Table.Th miw={250} style={{ textAlign: 'center' }}>Машина</Table.Th>
            {fuelReportTableHeaderSells.map((el, index) => (
              /* eslint react/no-array-index-key: 0 */
              <Table.Th key={`${el}-${index}`} style={{ textAlign: 'center' }}>{el}</Table.Th>
            ))}
          </Table.Tr>
        </>
      </Table.Thead>
      <Table.Tbody>
        {divisionsWithShifts.length !== 0 && divisionsWithShifts.map((row) => (
          <Table.Tr
            key={row.id}
          >
            <Table.Td>
              {row.carNumber}
            </Table.Td>
            {row.workCards.map((el) => (
              <Fragment key={el.id}>
                <Table.Td style={{ textAlign: 'center' }}>{el.mileagePerMonth}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{el.fuelPerMonth}</Table.Td>
              </Fragment>
            ))}
            <Table.Td fw={700} style={{ textAlign: 'center' }}>{row.sumMileage}</Table.Td>
            <Table.Td fw={700} style={{ textAlign: 'center' }}>{row.sumFuel}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default memo(DivisionsWithShiftsTable);
