import React from 'react';
import AccountGroupCheckboxes from '../../components/AccountGroupCheckboxes/AccountGroupCheckboxes.container';
import ProductsTableHeader from '../../components/ProductsTableHeader/ProductsTableHeader.container';
import ProductsTable from '../../components/ProductTable/ProductsTable.container';
import './MaterialReportPage.style.scss';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

export default function MaterialReportPageComponent(props: Props) {
  const { productsTableError, setProductsTableError, handleClick } = props;

  return (
    <section className="report-page-section" onClick={handleClick} aria-hidden="true">
      <ProductsTableHeader />
      <AccountGroupCheckboxes setProductsTableError={setProductsTableError} />
      <ProductsTable
        productsTableError={productsTableError}
        setProductsTableError={setProductsTableError}
      />
    </section>
  );
}
