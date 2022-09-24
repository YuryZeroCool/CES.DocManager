import React from 'react';
import ProductsTableHeader from '../../components/ProductsTableHeader/ProductsTableHeader.container';
import ProductsTable from '../../components/ProductTable/ProductsTable.container';
import './MaterialReportPage.style.scss';

export default function MaterialReportPageComponent() {
  return (
    <section className="report-page-section">
      <h2>Материальный отчет</h2>
      <ProductsTableHeader />
      <ProductsTable />
    </section>
  );
}
