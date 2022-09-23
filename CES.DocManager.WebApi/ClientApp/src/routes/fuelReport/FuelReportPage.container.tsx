import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import getDivisions from '../../redux/actions/getAllDivisions';
import createDivisionWorkSchedule from '../../redux/actions/report/createDivisionWorkSchedule';
import deleteDivisionWorkSchedule from '../../redux/actions/report/deleteDivisionWorkSchedule';
import getAllDivisionWorkSchedules from '../../redux/actions/report/getAllDivisionWorkSchedules';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  Division,
  IAllDivisionWorkSchedulesResponse,
  IDivisionWorkScheduleRequest,
} from '../../types/ReportTypes';
import FuelReportPageComponent from './FuelReportPage.component';

const defaultValues: IDivisionWorkScheduleRequest = {
  division: '',
  dates: [],
};

function FuelReportPageContainer() {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [currentDivision, setDivision] = useState<string>('');
  const [isDivisionSelected, setIsDivisionSelected] = useState<boolean>(false);
  const [isDatesSelected, setIsDatesSelected] = useState<boolean>(false);
  const [
    divisionWorkSchedule,
    setDivisionWorkSchedule,
  ] = useState<IDivisionWorkScheduleRequest>(defaultValues);
  const [workScheduleError, setWorkScheduleError] = useState<string>('');

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  const allDivisionWorkScheduleState = useSelector<RootState,
  IAllDivisionWorkSchedulesResponse | undefined>(
    (state) => state.divisionWorkSchedule.getAll,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const getMonth = (date: Date) => {
    const month = date.getMonth();
    if (month === 0) return (12).toString();
    if (month < 10) return `0${month}`;
    return month.toString();
  };

  const getDay = (date: Date) => {
    const day = date.getDate();
    if (day < 10) return `0${day}`;
    return day.toString();
  };

  const createCurrentPeriod = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = getMonth(date);
    const day = getDay(date);
    return `${year}-0${9}-${day}`;
  };

  useEffect(() => {
    async function getAllDivisionWorkSchedule(): Promise<void> {
      try {
        await dispatch(getAllDivisionWorkSchedules(createCurrentPeriod()));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setWorkScheduleError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisionWorkSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getAllDivisions(): Promise<void> {
      await dispatch(getDivisions(1));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisions();
  }, [dispatch]);

  useEffect(() => {
    async function createDivWorkSchedule(): Promise<void> {
      try {
        await dispatch(createDivisionWorkSchedule(divisionWorkSchedule));
        await dispatch(getAllDivisionWorkSchedules(createCurrentPeriod()));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setWorkScheduleError(error.message);
        }
      }
    }
    if (divisionWorkSchedule.dates?.length !== 0 && divisionWorkSchedule.division !== '') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      createDivWorkSchedule();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, divisionWorkSchedule]);

  const resetState = () => {
    setIsDatesSelected(false);
    setIsDivisionSelected(false);
    setDivision('');
    setDates([]);
  };

  useEffect(() => {
    if (divisionWorkSchedule.division !== '' && divisionWorkSchedule.dates?.length !== 0) {
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisionWorkSchedule]);

  useEffect(() => {
    if (dates.length !== 0) {
      setIsDatesSelected(true);
    } else {
      setIsDatesSelected(false);
    }
  }, [dates]);

  const onChange = (val: DateObject[]) => {
    setDates(val);
    setWorkScheduleError('');
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDivision(event.target.value);
    if (event.target.value !== '') {
      setIsDivisionSelected(true);
    }
    setWorkScheduleError('');
  };

  const handleClick = () => {
    const arr = dates.map((el: DateObject) => {
      const year = el.toObject().year?.toString();
      const month = el.toObject().month?.toString();
      const day = el.toObject().day?.toString();
      return year && month && day ? `${year}-${month}-${day}` : '';
    });
    setDivisionWorkSchedule({ division: currentDivision, dates: arr });
  };

  const handeDeleteElement = async (id: number) => {
    try {
      await dispatch(deleteDivisionWorkSchedule(id));
      await dispatch(getAllDivisionWorkSchedules(createCurrentPeriod()));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setWorkScheduleError(error.message);
      }
    }
  };

  const createDatesStr = (dateArr: string[]): string => {
    const arr = dateArr.map((elem) => elem.split('T')[0]);
    return arr.join(', ');
  };

  return (
    <FuelReportPageComponent
      dates={dates}
      currentDivision={currentDivision}
      divisions={divisions}
      workScheduleError={workScheduleError}
      allDivisionWorkScheduleState={allDivisionWorkScheduleState}
      isDivisionSelected={isDivisionSelected}
      isDatesSelected={isDatesSelected}
      onChange={onChange}
      handleChange={handleChange}
      handleClick={handleClick}
      handeDeleteElement={handeDeleteElement}
      createDatesStr={createDatesStr}
    />
  );
}

export default FuelReportPageContainer;
