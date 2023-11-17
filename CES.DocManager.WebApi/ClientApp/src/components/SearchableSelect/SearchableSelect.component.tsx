import { Combobox, ComboboxStore, InputBase } from '@mantine/core';
import React from 'react';

interface SearchableSelectComponentProps {
  combobox: ComboboxStore;
  searchValue: string;
  carsByCarNumber: string[];
  width: string;
  handlSearchChangeValue: (value: string) => void;
  handlNewValueSelected: (value: string) => void;
  handlSelectBlur: () => void;
}

export default function SearchableSelectComponent(props: SearchableSelectComponentProps) {
  const {
    combobox,
    searchValue,
    carsByCarNumber,
    width,
    handlSearchChangeValue,
    handlNewValueSelected,
    handlSelectBlur,
  } = props;

  const options = carsByCarNumber.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => handlNewValueSelected(val)}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handlSearchChangeValue(event.target.value);
          }}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => handlSelectBlur()}
          placeholder="Введите номер машины"
          label="Машина"
          rightSectionPointerEvents="none"
          styles={{
            root: { width },
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Совпадений не найдено</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
