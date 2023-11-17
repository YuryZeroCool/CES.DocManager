import React from 'react';
import { ComboboxStore } from '@mantine/core';
import DriverComboBoxComponent from './DriverComboBox.component';

interface DriverComboBoxContainerProps {
  combobox: ComboboxStore;
  driver: string | null;
  drivers: string[];
  width: string;
  changeDriverValue: (value: string) => void;
}

export default function DriverComboBoxContainer(props: DriverComboBoxContainerProps) {
  const {
    driver,
    drivers,
    combobox,
    width,
    changeDriverValue,
  } = props;

  const handlNewValueSelected = (val: string) => {
    changeDriverValue(val);
    combobox.closeDropdown();
  };

  return (
    <DriverComboBoxComponent
      combobox={combobox}
      driver={driver}
      drivers={drivers}
      width={width}
      handlNewValueSelected={handlNewValueSelected}
    />
  );
}
