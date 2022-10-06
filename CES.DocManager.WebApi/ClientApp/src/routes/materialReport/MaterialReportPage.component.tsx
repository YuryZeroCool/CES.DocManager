import React from 'react';
import AccountGroupCheckboxes from '../../components/AccountGroupCheckboxes/AccountGroupCheckboxes.container';
import ProductsTableHeader from '../../components/ProductsTableHeader/ProductsTableHeader.container';
import ProductsTable from '../../components/ProductTable/ProductsTable.container';
import CarAttachmentModal from '../../components/CarAttachmentModal/CarAttachmentModal.container';
import './MaterialReportPage.style.scss';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  isCarAttachmentModalOpen: boolean;
}

export default function MaterialReportPageComponent(props: Props) {
  const {
    productsTableError,
    setProductsTableError,
    handleClick,
    isCarAttachmentModalOpen,
  } = props;

  return (
    <section className="report-page-section" onClick={handleClick} aria-hidden="true">
      <ProductsTableHeader />
      <AccountGroupCheckboxes setProductsTableError={setProductsTableError} />
      <ProductsTable
        productsTableError={productsTableError}
        setProductsTableError={setProductsTableError}
      />
      {isCarAttachmentModalOpen && <CarAttachmentModal />}
    </section>
  );
}
