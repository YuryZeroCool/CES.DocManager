import React from 'react';
import Button from '@mui/material/Button';
import AccountGroupCheckboxes from '../../components/AccountGroupCheckboxes/AccountGroupCheckboxes.container';
import ProductsTableHeader from '../../components/ProductsTableHeader/ProductsTableHeader.container';
import ProductsTable from '../../components/ProductTable/ProductsTable.container';
import CarAttachmentModal from '../../components/CarAttachmentModal/CarAttachmentModal.container';
import AddMaterialsWriteOffModal from '../../components/AddMaterialsWriteOffModal/AddMaterialsWriteOffModal.container';
import './MaterialReportPage.style.scss';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  isCarAttachmentModalOpen: boolean;
  isAddMaterialsWriteOffModalOpen: boolean;
  materialsTableType: string;
  pageType: string;
  handleHistoryBtnClick: () => void;
  handleMaterialsBtnClick: () => void;
}

export default function MaterialReportPageComponent(props: Props) {
  const {
    productsTableError,
    setProductsTableError,
    handleClick,
    isCarAttachmentModalOpen,
    isAddMaterialsWriteOffModalOpen,
    materialsTableType,
    pageType,
    handleHistoryBtnClick,
    handleMaterialsBtnClick,
  } = props;

  return (
    <section className="report-page-section" onClick={handleClick} aria-hidden="true">
      <div className="report-page-navigation">
        <Button sx={{ margin: '0 8px', minWidth: 120, height: '30px' }} variant="contained" size="small" onClick={handleMaterialsBtnClick}>Материалы</Button>
        <Button sx={{ margin: '0 8px', minWidth: 120, height: '30px' }} variant="contained" size="small" onClick={handleHistoryBtnClick}>История ремонтов</Button>
      </div>
      <ProductsTableHeader />
      {pageType === 'Материалы' && materialsTableType === 'Свободные' && <AccountGroupCheckboxes setProductsTableError={setProductsTableError} />}
      <ProductsTable
        productsTableError={productsTableError}
        setProductsTableError={setProductsTableError}
      />
      {isCarAttachmentModalOpen && <CarAttachmentModal />}
      {isAddMaterialsWriteOffModalOpen && <AddMaterialsWriteOffModal />}
    </section>
  );
}
