import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import AccountGroupCheckboxes from '../../components/AccountGroupCheckboxes/AccountGroupCheckboxes.container';
import ProductsTableHeader from '../../components/ProductsTableHeader/ProductsTableHeader.container';
import ProductsTable from '../../components/ProductTable/ProductsTable.container';
import CarAttachmentModal from '../../components/CarAttachmentModal/CarAttachmentModal.container';
import AddMaterialsWriteOffModal from '../../components/AddMaterialsWriteOffModal/AddMaterialsWriteOffModal.container';
import DetailedInformationModal from '../../components/DetailedInformationModal/DetailedInformationModal.container';
import AddUsedMaterialModal from '../../components/AddUsedMaterialModal/AddUsedMaterialModal.container';
import EditAttachedMaterialModal from '../../components/EditAttachedMaterialModal/EditAttachedMaterialModal.container';
import { ReportErrors } from '../../types/ReportTypes';
import './MaterialReportPage.style.scss';

const reportTypes = ['Акт списания запчастей', 'Акт списания материалов'];

interface Props {
  productsTableError: string;
  isCarAttachmentModalOpen: boolean;
  isAddMaterialsWriteOffModalOpen: boolean;
  isDetailedInformationModalOpen: boolean;
  isAddUsedMaterialModalOpen: boolean;
  isEditAttachedMaterialModalOpen: boolean;
  materialsTableType: string;
  pageType: string;
  reportName: string;
  period: Dayjs | null;
  errorMessage: ReportErrors;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  handleHistoryBtnClick: () => void;
  handleMaterialsBtnClick: () => void;
  handleReportsBtnClick: () => void;
  handleReportNameChange: (event: SelectChangeEvent) => void;
  setPeriod: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  handleDownload: () => Promise<void>;
}

export default function MaterialReportPageComponent(props: Props) {
  const {
    productsTableError,
    isCarAttachmentModalOpen,
    isAddMaterialsWriteOffModalOpen,
    isDetailedInformationModalOpen,
    isAddUsedMaterialModalOpen,
    isEditAttachedMaterialModalOpen,
    materialsTableType,
    pageType,
    reportName,
    period,
    errorMessage,
    setProductsTableError,
    handleClick,
    handleHistoryBtnClick,
    handleMaterialsBtnClick,
    handleReportsBtnClick,
    handleReportNameChange,
    setPeriod,
    handleDownload,
  } = props;

  const renderSelectReportType = () => (
    pageType === 'Отчеты' && (
      <div className="report-block">
        <FormControl sx={{ width: 250, marginBottom: '20px' }} size="medium">
          <InputLabel id="demo-simple-select-readonly-label">Вариант акта</InputLabel>
          <Select
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={reportName}
            name="reportName"
            label="Вариант акта"
            onChange={handleReportNameChange}
            error={errorMessage.reportNameError}
          >
            {reportTypes?.map((el) => (
              <MenuItem key={el} value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250, marginBottom: '20px' }} size="medium">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
              views={['month', 'year']}
              label="Месяц"
              minDate={dayjs('2012-03-01')}
              maxDate={dayjs()}
              value={period}
              onChange={(newValue) => {
                setPeriod(newValue);
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TextField {...params} helperText={null} error={errorMessage.periodError} />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <Button
          sx={{ margin: '0 8px', minWidth: 120, height: '30px' }}
          variant="outlined"
          size="small"
          disabled={(errorMessage.periodError || errorMessage.reportNameError) || (reportName === '' || period == null)}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDownload}
        >
          Скачать
        </Button>
      </div>
    )
  );

  const renderReportPageNavigation = () => (
    <div className="report-page-navigation">
      <Button sx={{ margin: '0 8px', minWidth: 120, height: '30px' }} variant="contained" size="small" onClick={handleMaterialsBtnClick}>Материалы</Button>
      <Button sx={{ margin: '0 8px', minWidth: 120, height: '30px' }} variant="contained" size="small" onClick={handleHistoryBtnClick}>История ремонтов</Button>
      <Button sx={{ margin: '0 8px', minWidth: 120, height: '30px' }} variant="contained" size="small" onClick={handleReportsBtnClick}>Отчеты</Button>
    </div>
  );

  return (
    <section className="report-page-section" onClick={handleClick} aria-hidden="true">
      {renderReportPageNavigation()}
      {pageType !== 'Отчеты' && <ProductsTableHeader />}
      {pageType === 'Материалы' && materialsTableType === 'Свободные' && <AccountGroupCheckboxes setProductsTableError={setProductsTableError} />}
      {pageType !== 'Отчеты' && (
        <ProductsTable
          productsTableError={productsTableError}
          setProductsTableError={setProductsTableError}
        />
      )}
      {renderSelectReportType()}
      {isCarAttachmentModalOpen && <CarAttachmentModal />}
      {isAddMaterialsWriteOffModalOpen && <AddMaterialsWriteOffModal />}
      {isDetailedInformationModalOpen && <DetailedInformationModal />}
      {isAddUsedMaterialModalOpen && <AddUsedMaterialModal />}
      {isEditAttachedMaterialModalOpen && <EditAttachedMaterialModal />}
    </section>
  );
}
