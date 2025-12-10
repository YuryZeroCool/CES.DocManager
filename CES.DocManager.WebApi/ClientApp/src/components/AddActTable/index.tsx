import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex, Table, Text, TextInput,
} from '@mantine/core';

import { Act, INotesState } from 'types/MesTypes';
import { IAuthResponseType } from 'redux/store/configureStore';
import { RootState } from 'redux/reducers/combineReducers';
import {
  changeActTotalSumm,
  changeVat,
  updateActDataFromFile,
  updateActTotalSumm,
} from 'redux/reducers/mes/mesReducer';

import classes from './styles.module.css';

interface AddActTableProps {
  currentActData: Act;
  type: string;
}

function AddActTable(props: AddActTableProps) {
  const { currentActData, type } = props;

  const {
    totalActSumm,
    vat,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleInputNumberChange = (workName: string, value: string) => {
    dispatch(updateActDataFromFile({ type, workName, value }));
    dispatch(updateActTotalSumm(type));
  };

  const handleTotalActSummChange = (value: string) => {
    dispatch(changeActTotalSumm({ type, value }));
  };

  const handleTotalActSummBlur = () => {
    if (totalActSumm && totalActSumm !== '') {
      const normalizedValue = totalActSumm.replace(',', '.');
      const parsedValue = parseFloat(normalizedValue);
      if (!Number.isNaN(parsedValue) && parsedValue >= 0) {
        const formattedValue = (Math.round(parsedValue * 100) / 100).toFixed(2);
        dispatch(changeActTotalSumm({ type, value: formattedValue }));
      }
    }
  };

  const handleVatChange = (value: string) => {
    dispatch(changeVat(value));
  };

  const renderWorkName = (name: string) => {
    if (name.includes('&Oslash;')) {
      const strArr = name.split('&Oslash;');
      return (
        <Text>
          {strArr[0]}
          &Oslash;
          {strArr[1]}
        </Text>
      );
    }
    return (
      <Text>
        {name}
      </Text>
    );
  };

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
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Наименование работ</Table.Th>
          <Table.Th>Един. изм.</Table.Th>
          <Table.Th>Кол-во</Table.Th>
          <Table.Th>Отпускная цена, руб (с НДС)</Table.Th>
          <Table.Th>Всего к оплате, руб.</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {currentActData.works.map((work) => (
          <Table.Tr key={work.name}>
            <Table.Td>{renderWorkName(work.name)}</Table.Td>
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
        ))}
      </Table.Tbody>
      <Table.Tfoot className={classes.tableFooter}>
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
          <Table.Td>
            <TextInput
              placeholder="0"
              onFocus={() => {
                if (totalActSumm === '0') {
                  handleTotalActSummChange('');
                }
              }}
              value={totalActSumm}
              onChange={(e) => handleTotalActSummChange(e.target.value)}
              onBlur={handleTotalActSummBlur}
              variant="unstyled"
            />
          </Table.Td>
        </Table.Tr>
        {currentActData.type !== 'Для жилых помещений' && (
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Text fz={14} fs="italic">
                В том числе НДС
              </Text>
            </Table.Td>
            <Table.Td>
              <TextInput
                placeholder="0"
                onFocus={() => {
                  if (vat === '0') {
                    handleVatChange('');
                  }
                }}
                value={vat}
                onChange={(e) => handleVatChange(e.target.value)}
                variant="unstyled"
              />
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tfoot>
    </Table>
  );
}

export default memo(AddActTable);
