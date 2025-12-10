import React, { memo } from 'react';
import {
  Group, Stack, TextInput,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

import classes from './styles.module.css';

function ContractInfo() {
  return (
    <Stack>
      <Stack gap={10}>
        <Group justify="space-between">
          <DatesProvider
            settings={{
              locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
            }}
          >
            <DatePickerInput
              leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
              label="Дата создания договора"
              placeholder="Выберите дату"
              value={null}
              onChange={() => {}}
              classNames={{
                day: classes.day,
              }}
              clearable
              leftSectionPointerEvents="none"
              maxDate={new Date()}
              flex={1}
            />

            <DatePickerInput
              leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
              label="Дата начала работ"
              placeholder="Выберите дату"
              value={null}
              onChange={() => {}}
              classNames={{
                day: classes.day,
              }}
              clearable
              leftSectionPointerEvents="none"
              flex={1}
            />

            <DatePickerInput
              leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
              label="Дата окончания работ"
              placeholder="Выберите дату"
              value={null}
              onChange={() => {}}
              classNames={{
                day: classes.day,
              }}
              clearable
              leftSectionPointerEvents="none"
              flex={1}
            />
          </DatesProvider>
        </Group>

        <TextInput
          label="Номер договора"
          placeholder="Введите номер договора"
          value=""
          onChange={() => {}}
        />

        <TextInput
          label="Тип договора"
          placeholder="Введите тип договора"
          value=""
          onChange={() => {}}
        />
      </Stack>
    </Stack>
  );
}

export default memo(ContractInfo);
