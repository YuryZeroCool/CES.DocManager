import { TextInput } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IDriverDocumentsForm } from '../../../../../../types/DocumentType';

interface CategoryInputProps {
  control: Control<IDriverDocumentsForm, IDriverDocumentsForm>;
}

function CategoryInput(props: CategoryInputProps) {
  const { control } = props;

  return (
    <Controller
      name="category"
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
          label="Категория"
          onChange={onChange}
          withAsterisk
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default memo(CategoryInput);
