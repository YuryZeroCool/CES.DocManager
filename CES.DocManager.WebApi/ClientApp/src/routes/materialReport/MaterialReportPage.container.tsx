import React, { useState } from 'react';
import MaterialReportPageComponent from './MaterialReportPage.component';

function MaterialReportPageContainer() {
  const [productsTableError, setProductsTableError] = useState<string>('');

  return (
    <MaterialReportPageComponent
      productsTableError={productsTableError}
      setProductsTableError={setProductsTableError}
    />
  );
}

export default MaterialReportPageContainer;
