import {
  Accordion,
  ActionIcon,
  Button,
  Group,
  Select,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { IconTrash, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { showNotification } from '@mantine/notifications';
import classes from './divisionWorkScheduleAccordion.module.scss';
import { months, weekDays } from './constants';
import getDivisions from '../../../../redux/actions/getAllDivisions';
import { IAuthResponseType } from '../../../../redux/store/configureStore';
import getAllDivisionWorkSchedules from '../../../../redux/actions/report/fuelReport/getAllDivisionWorkSchedules';
import { RootState } from '../../../../redux/reducers/combineReducers';
import {
  Division,
  FuelReportResponse,
  ICreateDivisionWorkScheduleResponse,
  IDivisionWorkScheduleRequest,
} from '../../../../types/ReportTypes';
import createDivisionWorkSchedule from '../../../../redux/actions/report/fuelReport/createDivisionWorkSchedule';
import deleteDivisionWorkSchedule from '../../../../redux/actions/report/fuelReport/deleteDivisionWorkSchedule';

function DivisionWorkScheduleAccordion() {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [isDatesSelected, setIsDatesSelected] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<DateObject | null>(null);
  const [currentDivision, setDivision] = useState<string | null>(null);
  const [isDivisionSelected, setIsDivisionSelected] = useState<boolean>(false);

  const dispatch: IAuthResponseType = useDispatch();

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  const { allDivisionWorkSchedule } = useSelector<RootState, FuelReportResponse>(
    (state) => state.fuelReport,
  );

  useEffect(() => {
    if (dates.length !== 0) {
      setIsDatesSelected(true);
    } else {
      setIsDatesSelected(false);
    }
  }, [dates]);

  const handleCalendarChange = (val: DateObject[]) => {
    setDates(val);
  };

  const getAllDivisions = async () => {
    await dispatch(getDivisions(1));
  };

  const getAllDivisionWorkSchedule = async (date: Date) => {
    try {
      await dispatch(getAllDivisionWorkSchedules(format(date, 'yyyy-MM-dd')));
    } catch (error) {
      showNotification({
        title: 'График работы смен не был получен',
        message: 'Произошла ошибка во время получения графика работы смен.',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
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

  const resetState = () => {
    setIsDatesSelected(false);
    setIsDivisionSelected(false);
    setDivision(null);
    setDates([]);
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

  const createDivWorkSchedule = async (data: IDivisionWorkScheduleRequest) => {
    try {
      await dispatch(createDivisionWorkSchedule(data));
      await getAllDivisionWorkSchedule(currentDate ? new Date(currentDate.format()) : new Date());
    } catch (error) {
      showNotification({
        title: 'График работы смены не был создан.',
        message: '',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
    } finally {
      resetState();
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
    }
  };

  const handeDeleteElement = async (id: number) => {
    try {
      await dispatch(deleteDivisionWorkSchedule(id));
      await getAllDivisionWorkSchedule(currentDate ? new Date(currentDate.format()) : new Date());
    } catch (error) {
      showNotification({
        title: 'График не был удален',
        message: 'Произошла ошибка во время удаления графика работы смены.',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
    }
  };

  const createDatesStr = (dateArr: string[]): string => {
    const arr = dateArr.map((elem) => elem.split('T')[0]);
    return arr.join(', ');
  };

  return (
    <Accordion variant="contained" defaultValue="Apples" className={classes.accordion}>
      <Accordion.Item value="Добавить график работы смен" className={classes.accordionItem}>
        <Accordion.Control className={classes.accordionControl}>
          Добавить график работы смен
        </Accordion.Control>

        <Accordion.Panel pt={20}>
          <Group gap={20} align="flex-start">
            <Stack gap={20} p="0 20px">
              <Group justify="space-between" align="flex-start" gap={40}>
                <Calendar
                  className={classes.calendar}
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
                  data={divisions.map((el) => el.division)}
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
              {allDivisionWorkSchedule
                && allDivisionWorkSchedule.length !== 0
                && allDivisionWorkSchedule.map((el: ICreateDivisionWorkScheduleResponse) => (
                  <Group key={el.id} className={classes.savedDataContainer}>
                    {el.division && el.dates && (
                      <Text>{`${el.division}: ${createDatesStr(el.dates)}`}</Text>
                    )}

                    <ActionIcon
                      variant="subtle"
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={() => handeDeleteElement(el.id)}
                    >
                      <IconTrash style={{ width: 24, height: 24 }} />
                    </ActionIcon>
                  </Group>
                ))}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default memo(DivisionWorkScheduleAccordion);
