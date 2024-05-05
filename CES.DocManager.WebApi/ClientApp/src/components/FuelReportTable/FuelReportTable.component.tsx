import React, { Fragment } from 'react';
import {
  Group,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { DivisionData, IGetFuelReportInfoResponse } from '../../types/ReportTypes';
import { fuelReportDivisions, fuelReportTableHeaderSells } from './FuelReportTable.config';
import classes from './FuelReportTable.module.scss';

interface Props {
  fuelReportInfo: IGetFuelReportInfoResponse[];
  divisionsWithShifts: IGetFuelReportInfoResponse[];
  divisionsWithoutShifts: DivisionData[];
  status: string;
}

export default function FuelReportTableComponent(props: Props) {
  const {
    fuelReportInfo,
    divisionsWithShifts,
    divisionsWithoutShifts,
    status,
  } = props;

  const renderError = () => (
    fuelReportInfo.length === 0 && status === 'fulfilled' && (
      <Stack align="center" justify="center" w="100%">
        <Text style={{ fontSize: 18, color: 'red' }}>
          По выбранному периоду нет данных
        </Text>
      </Stack>
    )
  );

  const renderDivisionsWithShiftsTableHead = () => (
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
  );

  const renderDivisionsWithShiftsTableHeadBody = () => (
    divisionsWithShifts.length !== 0 && divisionsWithShifts.map((row) => (
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
    ))
  );

  const renderDivisionsWithoutShiftsTableHead = (divisionName: string) => (
    <>
      <Table.Tr>
        <Table.Th colSpan={3} style={{ textAlign: 'center' }}>{divisionName}</Table.Th>
      </Table.Tr>

      <Table.Tr>
        <Table.Th miw="11%" style={{ textAlign: 'center' }}>Машина</Table.Th>
        <Table.Th miw="11%" style={{ textAlign: 'center' }}>Пробег</Table.Th>
        <Table.Th miw="11%" style={{ textAlign: 'center' }}>Расход топлива</Table.Th>
      </Table.Tr>
    </>
  );

  const renderDivisionsWithoutShiftsTableBody = (data: IGetFuelReportInfoResponse[]) => (
    data.length !== 0 && data.map((row) => (
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
      </Table.Tr>
    ))
  );

  const renderDivisionsWithShiftsTable = () => (
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
        {renderDivisionsWithShiftsTableHead()}
      </Table.Thead>
      <Table.Tbody>
        {renderDivisionsWithShiftsTableHeadBody()}
      </Table.Tbody>
    </Table>
  );

  const renderDivisionsWithoutShiftsTable = () => (
    <Group gap={20} style={{ flexWrap: 'nowrap' }} w="100%" align="flex-start">
      {divisionsWithoutShifts.length !== 0 && divisionsWithoutShifts.map((el) => (
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          classNames={{
            th: classes.tableHeadCell,
            td: classes.tableBodyCell,
            tr: classes.tableRow,
          }}
          style={{ flexGrow: 1 }}
        >
          <Table.Thead>
            {renderDivisionsWithoutShiftsTableHead(el.divisionName)}
          </Table.Thead>
          <Table.Tbody>
            {renderDivisionsWithoutShiftsTableBody(el.data)}
          </Table.Tbody>
        </Table>
      ))}
    </Group>
  );

  return (
    <Group w="100%">
      {fuelReportInfo.length !== 0 && (
        <>
          {renderDivisionsWithShiftsTable()}
          {renderDivisionsWithoutShiftsTable()}
        </>
      )}

      {renderError()}
    </Group>
  );
}
