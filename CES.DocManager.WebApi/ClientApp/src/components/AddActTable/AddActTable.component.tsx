import React from 'react';
import {
  Table,
  TextInput,
  Text,
  Flex,
} from '@mantine/core';
import { Act } from '../../types/MesTypes';
import classes from './AddActTable.module.scss';

interface Props {
  currentActData: Act;
  totalActSumm: number;
  vat: number;
  handleInputNumberChange: (workName: string, value: string) => void;
}

export default function AddActTableComponent(props: Props) {
  const {
    currentActData,
    totalActSumm,
    vat,
    handleInputNumberChange,
  } = props;

  const tableHead = (
    <Table.Tr>
      <Table.Th>Наименование работ</Table.Th>
      <Table.Th>Един. изм.</Table.Th>
      <Table.Th>Кол-во</Table.Th>
      <Table.Th>Отпускная цена, руб (с НДС)</Table.Th>
      <Table.Th>Всего к оплате, руб.</Table.Th>
    </Table.Tr>
  );

  const rows = currentActData.works.map((work) => (
    <Table.Tr key={work.name}>
      <Table.Td>{work.name}</Table.Td>
      <Table.Td>{work.unit}</Table.Td>
      <Table.Td>
        <TextInput
          placeholder="0"
          onFocus={() => {
            if (work.count === '0') {
              handleInputNumberChange(work.name, '');
            }
          }}
          value={work.count}
          onChange={(e) => handleInputNumberChange(work.name, e.target.value)}
          variant="unstyled"
        />
      </Table.Td>
      <Table.Td>{work.price}</Table.Td>
      <Table.Td>{work.totalSumm}</Table.Td>
    </Table.Tr>
  ));

  const tableFooter = (
    <>
      <Table.Tr>
        <Table.Td colSpan={4}>
          <Flex>
            <Text fz={16} fw={800}>
              Итого
              &nbsp;
            </Text>
            <Text fz={16}>
              к оплате
              &nbsp;
            </Text>
            {currentActData.type === 'Для жилых помещений' && (
              <Text fz={16}>
                (Без учета НДС)
              </Text>
            )}
          </Flex>
        </Table.Td>
        <Table.Td>{totalActSumm}</Table.Td>
      </Table.Tr>
      {currentActData.type !== 'Для жилых помещений' && (
        <Table.Tr>
          <Table.Td colSpan={4}>
            <Text fz={14} fs="italic">
              В том числе НДС
            </Text>
          </Table.Td>
          <Table.Td>{vat}</Table.Td>
        </Table.Tr>
      )}
    </>
  );

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      classNames={{
        th: classes.tableHeadCell,
        td: classes.tableBodyCell,
      }}
    >
      <Table.Thead>{tableHead}</Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
      <Table.Tfoot className={classes.tableFooter}>{tableFooter}</Table.Tfoot>
    </Table>
  );
}
