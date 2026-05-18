import React, { memo } from 'react';
import {
  Button, Group, Radio, Select, Stack, TextInput,
} from '@mantine/core';
import { DatesProvider, DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';

import { ContractTypes, SearchContractParams } from 'types/mes/ContractTypes';
import { IAuthResponseType } from 'redux/store/configureStore';
import { changeSelectedContractType } from 'redux/reducers/mes/contractReducer';

import classes from '../../styles.module.css';

interface SearchPanelProps {
  contractsParams: SearchContractParams;
  updateContractsParams: <K extends keyof SearchContractParams>(
    key: K, value: SearchContractParams[K]) => void;
  handleGetContractsListBtnClick: () => void;
}

function SearchPanel(props: SearchPanelProps) {
  const {
    contractsParams,
    updateContractsParams,
    handleGetContractsListBtnClick,
  } = props;

  const dispatch: IAuthResponseType = useDispatch();

  return (
    <Stack>
      <Group w="100%" gap={30}>
        <Group w="calc((100% - 30px) / 2)">
          <Group w="calc((100% - 20px) / 2)">
            <DatesProvider
              settings={{
                locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
              }}
            >
              <DatePickerInput
                leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
                label="От"
                placeholder="От"
                value={contractsParams.minDate}
                onChange={(value: Date | null) => {
                  if (value) updateContractsParams('minDate', value);
                }}
                classNames={{
                  day: classes.day,
                }}
                w="100%"
                clearable
                leftSectionPointerEvents="none"
                maxDate={new Date()}
              />
            </DatesProvider>
          </Group>

          <Group w="calc((100% - 20px) / 2)">
            <DatesProvider
              settings={{
                locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
              }}
            >
              <DatePickerInput
                leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
                label="До"
                placeholder="До"
                value={contractsParams.maxDate}
                onChange={(value: Date | null) => {
                  if (value) updateContractsParams('maxDate', value);
                }}
                classNames={{
                  day: classes.day,
                }}
                w="100%"
                clearable
                leftSectionPointerEvents="none"
                maxDate={new Date()}
              />
            </DatesProvider>
          </Group>
        </Group>

        <Group w="calc((100% - 30px) / 2)">
          <Radio.Group
            label="Выберите категории для поиска"
            value={contractsParams.filter}
            onChange={(value) => {
              updateContractsParams('filter', value);
              updateContractsParams('searchValue', '');
            }}
          >
            <Group mt="xs">
              <Radio value="" label="Все договоры" />
              <Radio value="organization" label="Договоры организации" />
              <Radio value="isNotPrinted" label="Нераспечатанные договоры" />
            </Group>
          </Radio.Group>
        </Group>
      </Group>

      <Group gap={20} w="70%" align="end">
        <Select
          label="Тип договора"
          data={Object.entries(ContractTypes).map((el) => ({ label: el[1], value: el[1] }))}
          value={contractsParams.contractType}
          onChange={(value) => {
            if (value) {
              updateContractsParams('contractType', value);
              dispatch(changeSelectedContractType(value as ContractTypes));
            }
          }}
          allowDeselect={false}
        />

        <TextInput
          label="Введите значение для поиска"
          value={contractsParams.searchValue}
          onChange={(event) => updateContractsParams('searchValue', event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />

        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={() => handleGetContractsListBtnClick()}
          disabled={contractsParams.filter === 'organization'
            && contractsParams.searchValue === ''}
        >
          Получить договоры
        </Button>
      </Group>
    </Stack>
  );
}

export default memo(SearchPanel);
