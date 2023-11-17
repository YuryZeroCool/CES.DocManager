import React from 'react';
import { ComboboxStore } from '@mantine/core';
import SearchableSelectComponent from './SearchableSelect.component';

interface SearchableSelectContainerProps {
  combobox: ComboboxStore;
  searchValue: string;
  carsByCarNumber: string[];
  width: string;
  handleCarInputChange: (value: string) => void;
  changeCarInputValue: (value: string) => void;
}

export default function SearchableSelectContainer(props: SearchableSelectContainerProps) {
  const {
    searchValue,
    carsByCarNumber,
    combobox,
    width,
    handleCarInputChange,
    changeCarInputValue,
  } = props;

  const handlSearchChangeValue = (val: string) => {
    changeCarInputValue(val);
    handleCarInputChange(val);
  };

  const handlNewValueSelected = (val: string) => {
    changeCarInputValue(val);
    combobox.closeDropdown();
  };

  const handlSelectBlur = () => {
    combobox.closeDropdown();
  };

  return (
    <SearchableSelectComponent
      combobox={combobox}
      searchValue={searchValue}
      carsByCarNumber={carsByCarNumber}
      width={width}
      handlSearchChangeValue={handlSearchChangeValue}
      handlNewValueSelected={handlNewValueSelected}
      handlSelectBlur={handlSelectBlur}
    />
  );
}
