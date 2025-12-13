import React from 'react';
import {
  DatePickerInput,
  DatePickerInputProps,
  DateValue,
  DatesProvider,
  DatesRangeValue,
} from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

interface DatePickerProps extends Omit<DatePickerInputProps, 'onChange' | 'value'> {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

function DatePicker(props: DatePickerProps) {
  const { value, onChange, ...rest } = props;

  return (
    <DatesProvider
      settings={{
        locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
      }}
    >
      <DatePickerInput
        leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
        label="Дата добавления акта"
        placeholder="Выберите дату"
        value={value}
        clearable
        leftSectionPointerEvents="none"
        classNames={{
          day: 'day[data-selected] { background-color: var(--mantine-color-cyan-filled); }',
        }}
        onChange={(dateValue: DateValue | DatesRangeValue | Date[] | null) => {
          if (dateValue instanceof Date) {
            onChange(dateValue);
          } else if (Array.isArray(dateValue)
            && dateValue.length > 0
            && dateValue[0] instanceof Date
            && dateValue[0] <= new Date()) {
            onChange(dateValue[0]);
          } else {
            onChange(null);
          }
        }}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...rest}
      />
    </DatesProvider>
  );
}

export default DatePicker;
