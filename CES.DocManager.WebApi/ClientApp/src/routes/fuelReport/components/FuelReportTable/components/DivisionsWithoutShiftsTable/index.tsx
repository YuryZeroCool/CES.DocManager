import { Group, Table } from '@mantine/core';
import React, { Fragment, memo } from 'react';
import { DivisionData } from '../../../../../../types/ReportTypes';
import classes from '../../fuelReportTable.module.scss';

interface DivisionsWithoutShiftsTableProps {
  divisionsWithoutShifts: DivisionData[];
}

function DivisionsWithoutShiftsTable(props: DivisionsWithoutShiftsTableProps) {
  const { divisionsWithoutShifts } = props;

  return (
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
          key={el.id}
        >
          <Table.Thead>
            <>
              <Table.Tr>
                <Table.Th colSpan={3} style={{ textAlign: 'center' }}>{el.divisionName}</Table.Th>
              </Table.Tr>

              <Table.Tr>
                <Table.Th miw="11%" style={{ textAlign: 'center' }}>Машина</Table.Th>
                <Table.Th miw="11%" style={{ textAlign: 'center' }}>Пробег</Table.Th>
                <Table.Th miw="11%" style={{ textAlign: 'center' }}>Расход топлива</Table.Th>
              </Table.Tr>
            </>
          </Table.Thead>
          <Table.Tbody>
            {el.data.length !== 0 && el.data.map((row) => (
              <Table.Tr
                key={row.id}
              >
                <Table.Td>
                  {row.carNumber}
                </Table.Td>
                {row.workCards.map((elem) => (
                  <Fragment key={elem.id}>
                    <Table.Td style={{ textAlign: 'center' }}>{elem.mileagePerMonth}</Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>{elem.fuelPerMonth}</Table.Td>
                  </Fragment>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ))}
    </Group>
  );
}

export default memo(DivisionsWithoutShiftsTable);
