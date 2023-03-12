import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import FuelReportTable from '../../components/FuelReportTable/FuelReportTable.container';
import './FuelReportPage.style.scss';
import { Division, IAllDivisionWorkSchedulesResponse, ICreateDivisionWorkScheduleResponse } from '../../types/ReportTypes';
import { months, weekDays } from './FuelReportPage.config';

interface Props {
  dates: DateObject[];
  currentDivision: string;
  divisions: Division[];
  workScheduleError: string;
  allDivisionWorkScheduleState: IAllDivisionWorkSchedulesResponse | undefined;
  isDivisionSelected: boolean;
  isDatesSelected: boolean;
  expanded: boolean;
  fuelReportPeriod: Dayjs | null;
  fuelReportInfoError: string;
  onChange: (val: DateObject[]) => void;
  handleChange: (event: SelectChangeEvent) => void;
  handleClick: () => void;
  handeDeleteElement: (id: number) => Promise<void>;
  createDatesStr: (dateArr: string[]) => string;
  handleAccordionChange: () => void;
  handleFuelReportCalendarChange: (value: Dayjs | null) => void;
  handleFuelReportCalendarClose: () => void;
}

const Accordion = styled((elProps: AccordionProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAccordion disableGutters elevation={0} square {...elProps} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '.MuiTypography-root': {
    color: '#000',
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((elProps: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...elProps}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function FuelReportPageComponent(props: Props) {
  const {
    dates,
    currentDivision,
    divisions,
    workScheduleError,
    allDivisionWorkScheduleState,
    isDivisionSelected,
    isDatesSelected,
    expanded,
    fuelReportPeriod,
    fuelReportInfoError,
    onChange,
    handleChange,
    handleClick,
    handeDeleteElement,
    createDatesStr,
    handleAccordionChange,
    handleFuelReportCalendarChange,
    handleFuelReportCalendarClose,
  } = props;

  const renderAccordion = () => (
    <div className="accordion-wrapper">
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className="calendar-form-title">Добавить график работы смен</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="error-message-container">
            {workScheduleError ? (<p className="error-message">{workScheduleError}</p>) : <p> </p>}
          </div>
          <Box sx={{ display: 'flex' }} className="division-work-schedule-block">
            <div className="calendar-form">
              <div className="calendar-block">
                <Calendar
                  className="calendar"
                  value={dates}
                  onChange={onChange}
                  format="YYYY-MM-DD"
                  months={months}
                  weekDays={weekDays}
                  multiple
                  plugins={[
                    <DatePanel header="Даты" />,
                  ]}
                />
                <FormControl className="divisions-select-control">
                  <InputLabel id="demo-simple-select-label">Смена</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentDivision}
                    label="Смена"
                    className="divisions-select"
                    onChange={handleChange}
                  >
                    {divisions.map((el: Division) => (
                      <MenuItem key={el.id} value={el.division}>{el.division}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="calendar-form-button-block">
                <Button
                  className="calendar-form-button"
                  variant="outlined"
                  size="medium"
                  disabled={!(isDivisionSelected && isDatesSelected)}
                  onClick={handleClick}
                >
                  Сохранить
                </Button>
              </div>
            </div>
            <div className="saved-data">
              {allDivisionWorkScheduleState
              && allDivisionWorkScheduleState?.length !== 0 && (
                allDivisionWorkScheduleState.map((el: ICreateDivisionWorkScheduleResponse) => (
                  <div key={el.id} className="saved-data-container">
                    {el.division && el.dates && (
                      <p>{`${el.division}: ${createDatesStr(el.dates)}`}</p>
                    )}
                    { /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
                    <DeleteIcon className="icon-delete" onClick={() => handeDeleteElement(el.id)} />
                  </div>
                ))
              )}
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const renderFuelReportCalendar = () => (
    <div className="fuel-report-calendar-block">
      <h6>Выберите период отчета:</h6>
      <FormControl sx={{ width: 250, height: 40 }} size="small" className="fuel-report-calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            views={['month', 'year']}
            label=""
            minDate={dayjs('2010-01-01')}
            maxDate={dayjs()}
            value={fuelReportPeriod}
            onChange={(newValue) => {
              handleFuelReportCalendarChange(newValue);
            }}
            onClose={() => {
              handleFuelReportCalendarClose();
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} helperText={null} size="small" placeholder="" />
            )}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );

  return (
    <section className="report-page-section">
      {renderAccordion()}
      {renderFuelReportCalendar()}
      <FuelReportTable fuelReportInfoError={fuelReportInfoError} />
    </section>
  );
}
