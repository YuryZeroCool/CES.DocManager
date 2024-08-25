import { Select } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GroupAccount, NewMaterialForm } from '../../../../types/ReportTypes';

interface GroupAccountSelectProps {
  control: Control<NewMaterialForm, NewMaterialForm>;
  groupAccounts: GroupAccount[];
}

function GroupAccountSelect(props: GroupAccountSelectProps) {
  const { control, groupAccounts } = props;

  return (
    <Controller
      name="productGroupAccount"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value}
          label="Выбрать счет"
          withAsterisk
          onChange={onChange}
          error={error?.message}
          data={groupAccounts.map((el) => el.name)}
        />
      )}
    />
  );
}

export default memo(GroupAccountSelect);
