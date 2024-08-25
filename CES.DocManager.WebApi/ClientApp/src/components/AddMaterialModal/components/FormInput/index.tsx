import { TextInput } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormInputNameType, NewMaterialForm } from '../../../../types/ReportTypes';

interface FormInputProps {
  control: Control<NewMaterialForm, NewMaterialForm>;
  name: FormInputNameType;
  label: string;
}

function FormInput(props: FormInputProps) {
  const { control, name, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 1,
          message: 'Минимальное количество символов 1',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label={label}
          onChange={onChange}
          withAsterisk
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default memo(FormInput);
