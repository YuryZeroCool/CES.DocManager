import { Select } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { NewMaterialForm, Unit } from '../../../../types/ReportTypes';

interface UnitsSelectProps {
  control: Control<NewMaterialForm, NewMaterialForm>;
  units: Unit[];
}

function UnitsSelect(props: UnitsSelectProps) {
  const { control, units } = props;

  return (
    <Controller
      name="unit"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value}
          label="Выбрать единицу измерения"
          withAsterisk
          onChange={onChange}
          error={error?.message}
          data={units.map((el) => el.name)}
        />
      )}
    />
  );
}

export default memo(UnitsSelect);
