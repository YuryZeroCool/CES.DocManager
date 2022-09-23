import React from 'react';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import './FuelReportPage.style.scss';
import { Division, IAllDivisionWorkSchedulesResponse, ICreateDivisionWorkScheduleResponse } from '../../types/ReportTypes';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

interface Props {
  dates: DateObject[];
  currentDivision: string;
  divisions: Division[];
  workScheduleError: string;
  allDivisionWorkScheduleState: IAllDivisionWorkSchedulesResponse | undefined;
  isDivisionSelected: boolean;
  isDatesSelected: boolean;
  onChange: (val: DateObject[]) => void;
  handleChange: (event: SelectChangeEvent) => void;
  handleClick: () => void;
  handeDeleteElement: (id: number) => Promise<void>;
  createDatesStr: (dateArr: string[]) => string;
}

export default function FuelReportPageComponent(props: Props) {
  const {
    dates,
    currentDivision,
    divisions,
    workScheduleError,
    allDivisionWorkScheduleState,
    isDivisionSelected,
    isDatesSelected,
    onChange,
    handleChange,
    handleClick,
    handeDeleteElement,
    createDatesStr,
  } = props;

  return (
    <section className="report-page-section">
      <h2>Топливный отчет</h2>
      <h4 className="calendar-form-title">Выберите график работы смен</h4>
      <div className="error-message-container">
        {workScheduleError ? <p className="error-message">{workScheduleError}</p> : <p> </p>}
      </div>
      <div className="calendar-form">
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Смена</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentDivision}
            label="Смена"
            onChange={handleChange}
          >
            {divisions.map((el: Division) => (
              <MenuItem key={el.id} value={el.division}>{el.division}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </div>
      <div className="calendar-form-button-block">
        <Button
          variant="outlined"
          disabled={!(isDivisionSelected && isDatesSelected)}
          onClick={handleClick}
        >
          Сохранить
        </Button>
      </div>
    </section>
  );
}
