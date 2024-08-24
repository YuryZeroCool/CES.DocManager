import { Select } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ICreateDriverForm } from '../../../../../../types/DriversType';
import { Division } from '../../../../../../types/ReportTypes';

interface DivisionsSelectProps {
  control: Control<ICreateDriverForm, ICreateDriverForm>;
  divisions: Division[];
}

function DivisionsSelect(props: DivisionsSelectProps) {
  const { control, divisions } = props;

  return (
    <Controller
      name="division"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value}
          label="Выбрать смену"
          withAsterisk
          onChange={onChange}
          error={error?.message}
          data={divisions.map((el) => el.division)}
        />
      )}
    />
  );
}

export default memo(DivisionsSelect);
