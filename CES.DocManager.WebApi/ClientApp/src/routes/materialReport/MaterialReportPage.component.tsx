import React from 'react';
import {
  Flex,
  Select,
  Stack,
  Tabs,
  rem,
} from '@mantine/core';
import { DatesProvider, MonthPickerInput } from '@mantine/dates';
import {
  IconSquareLetterM,
  IconHistory,
  IconReport,
  IconCalendar,
} from '@tabler/icons-react';
import Button from '@mui/material/Button';
import AccountGroupCheckboxes from '../../components/AccountGroupCheckboxes';
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
  reportName: string | null;
  period: Date | null;
  errorMessage: ReportErrors;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  handleChangePageType: (value: string) => void;
  handleReportNameChange: (name: string | null) => void;
  handleReportCalendarChange: (value: Date | null) => void;
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
    handleChangePageType,
    handleReportNameChange,
    handleReportCalendarChange,
    handleDownload,
  } = props;

  const iconStyle = { width: rem(20), height: rem(20) };

  const renderSelectReportType = () => (
    <Flex mih="80vh" justify="center">
      <Stack className="reportBlock">
        <Select
          value={reportName}
          label="Вариант акта"
          placeholder="Выбрать"
          withAsterisk
          w={250}
          onChange={handleReportNameChange}
          error={errorMessage.reportNameError}
          data={reportTypes}
        />

        <Stack>
          <DatesProvider
            settings={{
              locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'Europe/Minsk',
            }}
          >
            <MonthPickerInput
              rightSection={
                <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              }
              rightSectionPointerEvents="none"
              label="Выберите период отчета:"
              placeholder="Период"
              value={period}
              w={250}
              maxDate={new Date()}
              onChange={(value) => handleReportCalendarChange(value)}
              styles={{
                input: { height: 40 },
                label: { marginBottom: 5 },
              }}
            />
          </DatesProvider>
        </Stack>

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
      </Stack>
    </Flex>
  );

  const renderReportPageNavigation = () => (
    <Flex h={50} gap={10} pl={10} mb={20} align="center">
      <Tabs
        value={pageType}
        onChange={(value) => handleChangePageType(value ?? '')}
        classNames={{
          tabLabel: 'tabLabel',
          tab: 'tab',
        }}
        w="100%"
      >
        <Tabs.List>
          <Tabs.Tab value="Материалы" leftSection={<IconSquareLetterM style={iconStyle} />}>
            Материалы
          </Tabs.Tab>
          <Tabs.Tab value="История ремонтов" leftSection={<IconHistory style={iconStyle} />}>
            История ремонтов
          </Tabs.Tab>
          <Tabs.Tab value="Отчеты" leftSection={<IconReport style={iconStyle} />}>
            Отчеты
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Flex>
  );

  return (
    <section className="report-page-section" onClick={handleClick} aria-hidden="true">
      {renderReportPageNavigation()}
      {pageType !== 'Отчеты' && <ProductsTableHeader />}
      {pageType === 'Материалы' && materialsTableType === 'Свободные' && <AccountGroupCheckboxes />}
      {pageType !== 'Отчеты' && (
        <ProductsTable
          productsTableError={productsTableError}
          setProductsTableError={setProductsTableError}
        />
      )}
      { pageType === 'Отчеты' && renderSelectReportType()}
      {isCarAttachmentModalOpen && <CarAttachmentModal />}
      {isAddMaterialsWriteOffModalOpen && <AddMaterialsWriteOffModal />}
      {isDetailedInformationModalOpen && <DetailedInformationModal />}
      {isAddUsedMaterialModalOpen && <AddUsedMaterialModal />}
      {isEditAttachedMaterialModalOpen && <EditAttachedMaterialModal />}
    </section>
  );
}
