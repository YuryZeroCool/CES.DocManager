import { TextInput } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ICreateDriverForm } from '../../../../../../types/DriversType';

interface PersonnelNumberInputProps {
  control: Control<ICreateDriverForm, ICreateDriverForm>;
  handleBlur: (value: string) => Promise<void>;
}

function PersonnelNumberInput(props: PersonnelNumberInputProps) {
  const { control, handleBlur } = props;

  return (
    <Controller
      name="personnelNumber"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 1,
          message: 'Минимальное количество символов 1',
        },
        min: {
          value: 0,
          message: 'Минимальное значение 0',
        },
        pattern: {
          value: /^[0-9]+$/,
          message: 'Можно вводить только цифры',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="Табельный номер"
          onChange={onChange}
          onBlur={(event) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handleBlur(event.target.value);
          }}
          withAsterisk
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default memo(PersonnelNumberInput);
