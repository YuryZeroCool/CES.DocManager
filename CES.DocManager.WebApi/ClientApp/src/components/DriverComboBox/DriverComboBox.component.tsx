import React from 'react';
import {
  Combobox,
  ComboboxStore,
  Input,
  InputBase,
} from '@mantine/core';

interface DriverComboBoxComponentProps {
  combobox: ComboboxStore;
  drivers: string[];
  driver: string | null;
  width: string;
  handlNewValueSelected: (value: string) => void;
}

export default function DriverComboBoxComponent(props: DriverComboBoxComponentProps) {
  const {
    combobox,
    drivers,
    driver,
    width,
    handlNewValueSelected,
  } = props;

  const options = drivers.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => handlNewValueSelected(val)}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          label="Водитель"
          rightSectionPointerEvents="none"
          styles={{
            root: { width },
          }}
        >
          {driver || <Input.Placeholder>Выберите водителя</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
