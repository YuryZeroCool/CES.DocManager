import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import ProductsTableHeaderComponent from './ProductsTableHeader.component';

function ProductsTableHeaderContainer() {
  const [type, setType] = useState('Свободные');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <ProductsTableHeaderComponent type={type} handleChange={handleChange} />
  );
}

export default ProductsTableHeaderContainer;
