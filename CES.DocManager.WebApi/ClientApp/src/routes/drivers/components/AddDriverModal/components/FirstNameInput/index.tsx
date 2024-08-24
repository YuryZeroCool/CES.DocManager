import { TextInput } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ICreateDriverForm } from '../../../../../../types/DriversType';

interface FirstNameInputProps {
  control: Control<ICreateDriverForm, ICreateDriverForm>;
}

function FirstNameInput(props: FirstNameInputProps) {
  const { control } = props;

  return (
    <Controller
      name="firstName"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 3,
          message: 'Минимальное количество символов 3',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="Имя и отчество"
          onChange={onChange}
          withAsterisk
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default memo(FirstNameInput);
