import { TextInput } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IDriverDocumentsForm } from '../../../../../../types/DocumentType';

interface SerialNumberInputProps {
  control: Control<IDriverDocumentsForm, IDriverDocumentsForm>;
}

function SerialNumberInput(props: SerialNumberInputProps) {
  const { control } = props;

  return (
    <Controller
      name="serialNumber"
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
          label="Серийный номер"
          onChange={onChange}
          value={value}
          withAsterisk
          error={error?.message}
        />
      )}
    />
  );
}

export default memo(SerialNumberInput);
