import React, { memo, useEffect, useState } from 'react';
import {
  ActionIcon,
  FileInput,
  Group,
  Stack,
  rem,
} from '@mantine/core';
import {
  IconCalendar,
  IconCheck,
  IconUpload,
  IconX,
} from '@tabler/icons-react';
import { DatesProvider, MonthPickerInput } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { getMonth, getYear } from 'date-fns';
import { showNotification } from '@mantine/notifications';
import classes from './fuelReportCalendarSection.module.scss';
import { IAuthResponseType } from '../../../../redux/store/configureStore';
import { FuelReportResponse, IPeriod } from '../../../../types/ReportTypes';
import getFuelReportInfo from '../../../../redux/actions/report/fuelReport/getFuelReportInfo';
import uploadFuelWorkCard from '../../../../redux/actions/report/fuelReport/uploadFuelWorkCard';
import { RootState } from '../../../../redux/reducers/combineReducers';

function FuelReportCalendarSection() {
  const [file, setFile] = useState<File | null>(null);
  const [fuelReportPeriod, setFuelReportPeriod] = useState<Date | null>(new Date());

  const dispatch: IAuthResponseType = useDispatch();

  const { status } = useSelector<RootState, FuelReportResponse>(
    (state) => state.fuelReport,
  );

  useEffect(() => {
    async function getFuelReport(): Promise<void> {
      try {
        if (fuelReportPeriod) {
          const currentPeriod: IPeriod = {
            month: getMonth(fuelReportPeriod) + 1,
            year: getYear(fuelReportPeriod),
          };

          await dispatch(getFuelReportInfo(currentPeriod));
        }
      } catch (error) {
        showNotification({
          title: 'Топливный отчет не был получен',
          message: 'Произошла ошибка во время получения топливного отчета',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }

    if (fuelReportPeriod) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getFuelReport();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelReportPeriod]);

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
      setFile(null);
      showNotification({
        title: 'Файл не был загружен',
        message: 'Произошла ошибка во время загрузки файла. Попробуйте снова',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
    }
  };

  return (
    <Group p={15} mb={20} gap={40} className={classes.fuelReportCalendarBlock}>
      <Group gap={15} align="flex-end">
        <FileInput
          value={file}
          onChange={handleInputFileChange}
          accept=".xls"
          label="Добавить карточки работы техники"
          placeholder="Добавить"
          clearable
          classNames={{
            input: classes.fuelWorkCardInput,
            label: classes.fuelWorkCardInputLabel,
          }}
        />

        {file && (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <ActionIcon size={40} onClick={handleUploadFile} loading={status === 'pending'}>
            <IconUpload />
          </ActionIcon>
        )}
      </Group>

      <Stack>
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'Europe/Minsk',
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
}

export default memo(FuelReportCalendarSection);
