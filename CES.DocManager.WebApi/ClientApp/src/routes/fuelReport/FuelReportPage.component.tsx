import React from 'react';
import {
  Accordion,
  ActionIcon,
  Button,
  FileInput,
  Group,
  Select,
  Stack,
  rem,
  Text,
} from '@mantine/core';
import { MonthPickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar, IconUpload } from '@tabler/icons-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import FuelReportTable from '../../components/FuelReportTable/FuelReportTable.container';
import './FuelReportPage.style.scss';
import { IAllDivisionWorkSchedulesResponse, ICreateDivisionWorkScheduleResponse } from '../../types/ReportTypes';
import { months, weekDays } from './FuelReportPage.config';

interface Props {
  dates: DateObject[];
  currentDivision: string | null;
  divisions: string[];
  allDivisionWorkScheduleState: IAllDivisionWorkSchedulesResponse | undefined;
  isDivisionSelected: boolean;
  isDatesSelected: boolean;
  fuelReportPeriod: Date | null;
  file: File | null;
  isLoading: boolean;
  handleCalendarChange: (val: DateObject[]) => void;
  handleMonthChange: (date: DateObject) => void;
  handleDivisionChange: (value: string | null) => void;
  handleSaveBtnClick: () => void;
  handeDeleteElement: (id: number) => Promise<void>;
  createDatesStr: (dateArr: string[]) => string;
  handleFuelReportCalendarChange: (value: Date | null) => void;
  handleInputFileChange: (value: File | null) => void;
  handleUploadFile: () => void;
}

export default function FuelReportPageComponent(props: Props) {
  const {
    dates,
    currentDivision,
    divisions,
    allDivisionWorkScheduleState,
    isDivisionSelected,
    isDatesSelected,
    fuelReportPeriod,
    file,
    isLoading,
    handleCalendarChange,
    handleMonthChange,
    handleDivisionChange,
    handleSaveBtnClick,
    handeDeleteElement,
    createDatesStr,
    handleFuelReportCalendarChange,
    handleInputFileChange,
    handleUploadFile,
  } = props;

  const renderAccordion = () => (
    <Accordion variant="contained" defaultValue="Apples" className="accordion">
      <Accordion.Item value="Добавить график работы смен" className="accordionItem">
        <Accordion.Control className="accordionControl">Добавить график работы смен</Accordion.Control>

        <Accordion.Panel pt={20}>
          <Group gap={20} align="flex-start">
            <Stack gap={20} p="0 20px">
              <Group justify="space-between" align="flex-start" gap={40}>
                <Calendar
                  className="calendar"
                  value={dates}
                  onChange={handleCalendarChange}
                  onMonthChange={handleMonthChange}
                  format="YYYY-MM-DD"
                  months={months}
                  weekDays={weekDays}
                  multiple
                  plugins={[
                    <DatePanel header="Даты" />,
                  ]}
                />

                <Select
                  label="Смена"
                  placeholder="Выберите смену"
                  data={divisions}
                  value={currentDivision}
                  onChange={(value) => handleDivisionChange(value)}
                />
              </Group>

              <Button
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                disabled={!(isDivisionSelected && isDatesSelected)}
                onClick={handleSaveBtnClick}
                w={380}
              >
                Сохранить
              </Button>
            </Stack>

            <Stack style={{ flexGrow: 1 }} pt={20}>
              {allDivisionWorkScheduleState
                && allDivisionWorkScheduleState.length !== 0
                && allDivisionWorkScheduleState.map((el: ICreateDivisionWorkScheduleResponse) => (
                  <Group key={el.id} className="saved-data-container">
                    {el.division && el.dates && (
                      <Text>{`${el.division}: ${createDatesStr(el.dates)}`}</Text>
                    )}
                    { /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
                    <DeleteIcon className="icon-delete" onClick={() => handeDeleteElement(el.id)} />
                  </Group>
                ))}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const renderFuelReportCalendar = () => (
    <Group p={15} mb={20} gap={40} className="fuel-report-calendar-block">
      <Group gap={15} align="flex-end">
        <FileInput
          value={file}
          onChange={handleInputFileChange}
          accept=".xls"
          label="Добавить карточки работы техники"
          placeholder="Добавить"
          clearable
          classNames={{
            input: 'fuelWorkCardInput',
            label: 'fuelWorkCardInputLabel',
          }}
        />

        {file && (
          <ActionIcon size={40} onClick={handleUploadFile} loading={isLoading}>
            <IconUpload />
          </ActionIcon>
        )}
      </Group>

      <Stack>
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'UTC',
          }}
        >
          <MonthPickerInput
            rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSectionPointerEvents="none"
            label="Выберите период отчета:"
            placeholder="Период"
            value={fuelReportPeriod}
            onChange={(value) => handleFuelReportCalendarChange(value)}
            styles={{
              input: { height: 40 },
              label: { marginBottom: 5 },
            }}
          />
        </DatesProvider>
      </Stack>
    </Group>
  );

  return (
    <Stack className="report-page-section" gap={15}>
      {renderAccordion()}
      {renderFuelReportCalendar()}
      <FuelReportTable />
    </Stack>
  );
}
