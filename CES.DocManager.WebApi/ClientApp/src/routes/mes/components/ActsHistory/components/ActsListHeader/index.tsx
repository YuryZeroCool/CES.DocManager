import {
  Button, Group, Radio, Select, Stack, TextInput,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import React, { memo } from 'react';
import { ActsHistoryParams, OrganizationType } from '../../../../../../types/MesTypes';
import classes from '../../styles.module.css';

interface ActsListHeaderProps {
  actsHistoryParams: ActsHistoryParams;
  organizationTypes: OrganizationType[];
  updateActsHistoryParams: <K extends keyof ActsHistoryParams>(
    key: K, value: ActsHistoryParams[K]) => void;
  handleGetActsListBtnClick: (params: ActsHistoryParams) => void;
}

function ActsListHeader(props: ActsListHeaderProps) {
  const {
    actsHistoryParams,
    organizationTypes,
    updateActsHistoryParams,
    handleGetActsListBtnClick,
  } = props;

  return (
    <Stack w="100%">
      <Group w="100%" gap={30}>
        <Group w="calc((100% - 30px) / 2)" gap={20}>
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
                value={actsHistoryParams.minDate}
                onChange={(value: Date | null) => {
                  if (value) updateActsHistoryParams('minDate', value);
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
                value={actsHistoryParams.maxDate}
                onChange={(value: Date | null) => {
                  if (value) updateActsHistoryParams('maxDate', value);
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
            value={actsHistoryParams.filter}
            onChange={(value) => {
              updateActsHistoryParams('filter', value);
              updateActsHistoryParams('searchValue', '');
            }}
          >
            <Group mt="xs">
              <Radio value="" label="Все категории" />
              <Radio value="organization" label="Организация" />
              <Radio value="employee" label="Водитель" />
              <Radio value="street" label="Улица" />
              <Radio value="numberPlateOfCar" label="Номер машины" />
              <Radio value="isNotSigned" label="Неподписанные" />
            </Group>
          </Radio.Group>
        </Group>
      </Group>

      <Group gap={20} w="70%" align="end">
        <Select
          label="Тип организации"
          data={[
            { label: 'Все', value: '' },
            ...organizationTypes.map((el) => ({ label: el.name, value: el.name })),
          ]}
          value={actsHistoryParams.organizationType}
          onChange={(value) => {
            if (value) updateActsHistoryParams('organizationType', value);
          }}
          allowDeselect={false}
        />

        <TextInput
          label="Введите значение для поиска"
          value={actsHistoryParams.searchValue}
          onChange={(event) => updateActsHistoryParams('searchValue', event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />

        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={() => handleGetActsListBtnClick(actsHistoryParams)}
          disabled={actsHistoryParams.filter !== ''
            && actsHistoryParams.filter !== 'isNotSigned'
            && actsHistoryParams.searchValue === ''}
        >
          Получить акты
        </Button>
      </Group>
    </Stack>
  );
}

export default memo(ActsListHeader);
