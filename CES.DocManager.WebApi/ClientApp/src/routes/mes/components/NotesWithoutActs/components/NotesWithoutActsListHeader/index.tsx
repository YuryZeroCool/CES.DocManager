import {
  Button, Checkbox, Group, Stack, TextInput,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import React, { memo } from 'react';
import { IconCalendar } from '@tabler/icons-react';
import { NotesWithoutActsParams } from '../../../../../../types/MesTypes';
import classes from './NotesWithoutActsListHeader.module.css';

interface NotesWithoutActsListHeaderProps {
  notesWithoutActsParams: NotesWithoutActsParams;
  updateNotesWithoutActsParams: <K extends keyof NotesWithoutActsParams>(
    key: K, value: NotesWithoutActsParams[K]) => void;
  handleGetNotesWithoutActsBtnClick: (params: NotesWithoutActsParams) => void;
}

function NotesWithoutActsListHeader(props: NotesWithoutActsListHeaderProps) {
  const {
    notesWithoutActsParams,
    updateNotesWithoutActsParams,
    handleGetNotesWithoutActsBtnClick,
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
                value={notesWithoutActsParams.minDate}
                onChange={(value: Date | null) => {
                  if (value) updateNotesWithoutActsParams('minDate', value);
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
                value={notesWithoutActsParams.maxDate}
                onChange={(value: Date | null) => {
                  if (value) updateNotesWithoutActsParams('maxDate', value);
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
          <Checkbox.Group
            value={notesWithoutActsParams.filter}
            onChange={(values) => updateNotesWithoutActsParams('filter', values)}
            label="Выберите категории для поиска"
          >
            <Group mt="xs">
              <Checkbox value="address" label="Адрес" />
              <Checkbox value="tel" label="Телефон" />
              <Checkbox value="comment" label="Комментарий" />
            </Group>
          </Checkbox.Group>
        </Group>
      </Group>

      <Group gap={20} w="70%" align="end">
        <TextInput
          label="Введите значение для поиска"
          value={notesWithoutActsParams.searchValue}
          onChange={(event) => updateNotesWithoutActsParams('searchValue', event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />

        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={() => handleGetNotesWithoutActsBtnClick(notesWithoutActsParams)}
          disabled={notesWithoutActsParams.filter.length !== 0 && notesWithoutActsParams.searchValue === ''}
        >
          Получить заявки
        </Button>
      </Group>
    </Stack>
  );
}

export default memo(NotesWithoutActsListHeader);
