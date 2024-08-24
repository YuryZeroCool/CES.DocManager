import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { IDriverDocumentsForm } from '../../../../../../types/DocumentType';
import classes from './expiryDateCalendar.module.scss';
import 'dayjs/locale/ru';

interface ExpiryDateCalendarProps {
  control: Control<IDriverDocumentsForm, IDriverDocumentsForm>;
}

function ExpiryDateCalendar(props: ExpiryDateCalendarProps) {
  const { control } = props;

  return (
    <Controller
      name="expiryDate"
      control={control}
      defaultValue={null}
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
          }}
        >
          <DatePickerInput
            leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
            label="Дата истечения срока действия"
            placeholder="Выберите дату"
            value={value}
            withAsterisk
            onChange={(newValue) => {
              if (newValue !== null) {
                onChange(newValue);
              } else {
                onChange(newValue);
              }
            }}
            classNames={{
              day: classes.day,
            }}
            w="100%"
            clearable
            leftSectionPointerEvents="none"
            minDate={new Date()}
            error={error?.message}
          />
        </DatesProvider>
      )}
    />
  );
}

export default memo(ExpiryDateCalendar);
