import React, { useEffect, useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { rem } from '@mantine/core';
import { AxiosError } from 'axios';
import { DateObject } from 'react-multi-date-picker';
import { subMonths } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import getDivisions from '../../redux/actions/getAllDivisions';
import createDivisionWorkSchedule from '../../redux/actions/report/fuelReport/createDivisionWorkSchedule';
import deleteDivisionWorkSchedule from '../../redux/actions/report/fuelReport/deleteDivisionWorkSchedule';
import getAllDivisionWorkSchedules from '../../redux/actions/report/fuelReport/getAllDivisionWorkSchedules';
import { IAuthResponseType } from '../../redux/store/configureStore';
import FuelReportPageComponent from './FuelReportPage.component';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  Division,
  FuelReportResponse,
  IDivisionWorkScheduleRequest,
} from '../../types/ReportTypes';
import getFuelReportInfo from '../../redux/actions/report/fuelReport/getFuelReportInfo';
import countCurrentPeriod from '../../index.config';
import uploadFuelWorkCard from '../../redux/actions/report/fuelReport/uploadFuelWorkCard';

function FuelReportPageContainer() {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [currentDate, setCurrentDate] = useState<DateObject | null>(null);
  const [currentDivision, setDivision] = useState<string | null>(null);
  const [isDivisionSelected, setIsDivisionSelected] = useState<boolean>(false);
  const [isDatesSelected, setIsDatesSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fuelReportPeriod, setFuelReportPeriod] = useState<Date | null>(subMonths(new Date(), 1));

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  const { allDivisionWorkSchedule, status } = useSelector<RootState, FuelReportResponse>(
    (state) => state.fuelReport,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const getMonth = (date: Date) => {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : month.toString();
  };

  const getDay = (date: Date) => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : day.toString();
  };

  const createCurrentPeriod = (date: Date) => {
    const year = date.getFullYear();
    const month = getMonth(date);
    const day = getDay(date);
    return `${year}-${month}-${day}`;
  };

  const getAllDivisionWorkSchedule = async (date: Date) => {
    try {
      await dispatch(getAllDivisionWorkSchedules(createCurrentPeriod(date)));
    } catch (error) {
      showNotification({
        title: 'График работы смен не был получен',
        message: 'Произошла ошибка во время получения графика работы смен.',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
    }
  };

  const getAllDivisions = async () => {
    await dispatch(getDivisions(1));
  };

  const resetState = () => {
    setIsDatesSelected(false);
    setIsDivisionSelected(false);
    setDivision(null);
    setDates([]);
  };

  const createDivWorkSchedule = async (data: IDivisionWorkScheduleRequest) => {
    try {
      await dispatch(createDivisionWorkSchedule(data));
      await getAllDivisionWorkSchedule(currentDate ? new Date(currentDate.format()) : new Date());
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showNotification({
          title: 'График работы смены не был создан.',
          message: '',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    } finally {
      resetState();
    }
  };

  useEffect(() => {
    setCurrentDate(new DateObject());
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisions();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisionWorkSchedule(new Date());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dates.length !== 0) {
      setIsDatesSelected(true);
    } else {
      setIsDatesSelected(false);
    }
  }, [dates]);

  useEffect(() => {
    async function getFuelReport(): Promise<void> {
      try {
        const period = countCurrentPeriod(fuelReportPeriod);
        await dispatch(getFuelReportInfo(period));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          showNotification({
            title: 'Топливный отчет не был получен',
            message: 'Произошла ошибка во время получения топливного отчета',
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            styles: { icon: { background: 'red' } },
          });
        }
      }
    }

    if (fuelReportPeriod) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getFuelReport();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelReportPeriod]);

  const handleCalendarChange = (val: DateObject[]) => {
    setDates(val);
  };

  const handleMonthChange = (date: DateObject) => {
    setCurrentDate(date);
    const newDate = new Date(date.format());
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisionWorkSchedule(newDate);
  };

  const handleDivisionChange = (value: string | null) => {
    if (value) {
      setDivision(value);
      setIsDivisionSelected(true);
    }
  };

  const handleSaveBtnClick = () => {
    const divisionWorkScheduleDates = dates.map((el: DateObject) => {
      const year = el.toObject().year?.toString();
      const month = el.toObject().month?.toString();
      const day = el.toObject().day?.toString();
      return year && month && day ? `${year}-${month}-${day}` : '';
    });

    if (divisionWorkScheduleDates.length !== 0 && currentDivision) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      createDivWorkSchedule({ division: currentDivision, dates: divisionWorkScheduleDates });
      // resetState();
    }
  };

  const handeDeleteElement = async (id: number) => {
    try {
      await dispatch(deleteDivisionWorkSchedule(id));
      await getAllDivisionWorkSchedule(currentDate ? new Date(currentDate.format()) : new Date());
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showNotification({
          title: 'График не был удален',
          message: 'Произошла ошибка во время удаления графика работы смены.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  const createDatesStr = (dateArr: string[]): string => {
    const arr = dateArr.map((elem) => elem.split('T')[0]);
    return arr.join(', ');
  };

  const handleFuelReportCalendarChange = (value: Date | null) => {
    if (value) {
      setFuelReportPeriod(value);
    }
  };

  const handleInputFileChange = (value: File | null) => {
    setFile(value);
  };

  const handleUploadFile = async () => {
    try {
      if (file) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        await dispatch(uploadFuelWorkCard(formData));

        showNotification({
          title: 'Файл загружен',
          message: 'Загрузка файла прошла успешно',
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'green' } },
        });
        setFile(null);
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setFile(null);
        showNotification({
          title: 'Файл не был загружен',
          message: 'Произошла ошибка во время загрузки файла. Попробуйте снова',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  return (
    <FuelReportPageComponent
      dates={dates}
      currentDivision={currentDivision}
      divisions={divisions.map((el) => el.division)}
      allDivisionWorkScheduleState={allDivisionWorkSchedule}
      isDivisionSelected={isDivisionSelected}
      isDatesSelected={isDatesSelected}
      fuelReportPeriod={fuelReportPeriod}
      file={file}
      isLoading={status === 'pending'}
      handleCalendarChange={handleCalendarChange}
      handleMonthChange={handleMonthChange}
      handleDivisionChange={handleDivisionChange}
      handleSaveBtnClick={handleSaveBtnClick}
      handeDeleteElement={handeDeleteElement}
      createDatesStr={createDatesStr}
      handleFuelReportCalendarChange={handleFuelReportCalendarChange}
      handleInputFileChange={handleInputFileChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleUploadFile={handleUploadFile}
    />
  );
}

export default FuelReportPageContainer;
