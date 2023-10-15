import * as React from 'react';
import { Select } from '@mantine/core';
import './CustomDataList.style.scss';

interface CustomDataListProps {
  id: string,
  selectedOption: string;
  options: string[];
  handleInputChange : (value: string) => void;
}
export default function CustomDataListComponent(props: CustomDataListProps) {
  const {
    id,
    selectedOption,
    options,
    handleInputChange,
  } = props;

  return (
    <Select
      classNames={{
        dropdown: 'select-dropdown',
      }}
      label="Your favorite library"
      placeholder="Pick value"
      data={options}
      searchable
      onSearchChange={(e) => handleInputChange(e)}
      value={selectedOption}
    />
  );
}
