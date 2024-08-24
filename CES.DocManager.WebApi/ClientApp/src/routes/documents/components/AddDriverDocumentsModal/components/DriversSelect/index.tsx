import { Select } from '@mantine/core';
import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FullName, IDriverDocumentsForm } from '../../../../../../types/DocumentType';

interface DriversSelectProps {
  control: Control<IDriverDocumentsForm, IDriverDocumentsForm>;
  driversWithoutMedicalCertificates: FullName[];
  driversWithoutDriverLicense: FullName[];
}

function DriversSelect(props: DriversSelectProps) {
  const { control, driversWithoutMedicalCertificates, driversWithoutDriverLicense } = props;

  return (
    <Controller
      name="fullName"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value}
          label="Выбрать водителя"
          withAsterisk
          onChange={onChange}
          error={error?.message}
          data={
            driversWithoutMedicalCertificates.length > 0
              ? driversWithoutMedicalCertificates.map((el) => el.driversFullName)
              : driversWithoutDriverLicense.map((el) => el.driversFullName)
          }
        />
      )}
    />
  );
}

export default memo(DriversSelect);
