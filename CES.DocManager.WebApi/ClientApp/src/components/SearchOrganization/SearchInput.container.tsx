import React, { useState } from 'react';
import SearchInputComponent from './SearchInput.component';

function SearchInputContainer() {
  const [value, setValue] = useState<string>('');
  const handleSearchChange = (val: string) => {
    setValue(val);
    console.log(val);
  };

  return (
    <SearchInputComponent value={value} handleSearchChange={handleSearchChange} />
  );
}

export default SearchInputContainer;
