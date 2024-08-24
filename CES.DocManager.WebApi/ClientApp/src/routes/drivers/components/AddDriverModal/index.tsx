import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, {
  memo,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Modal,
  Stack,
  rem,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import createDriver from '../../../../redux/actions/drivers/createDriver';
import getIsPersonnelNumberExist from '../../../../redux/actions/drivers/getIsPersonnelNumberExist';
import getDivisions from '../../../../redux/actions/getAllDivisions';
import { RootState } from '../../../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../../../redux/store/configureStore';
import { ICreateDriverForm, ICreateDriverRequest, IDriverResponse } from '../../../../types/DriversType';
import { Division } from '../../../../types/ReportTypes';
import DivisionsSelect from './components/DivisionsSelect';
import LastNameInput from './components/LastNameInput';
import FirstNameInput from './components/FirstNameInput';
import BirthDateCalendar from './components/BirthDateCalendar';
import PersonnelNumberInput from './components/PersonnelNumberInput';

interface AddDriverModalProps {
  addDriverModalOpened: boolean;
  addDriverModalClose: () => void;
}

function AddDriverModal(props: AddDriverModalProps) {
  const { addDriverModalOpened, addDriverModalClose } = props;

  const { isPersonnelNumberExist } = useSelector<RootState, IDriverResponse>(
    (state) => state.drivers,
  );

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState,
    setError,
  } = useForm<ICreateDriverForm, ICreateDriverForm>({ mode: 'onChange' });

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getAllDivisions(): Promise<void> {
      try {
        await dispatch(getDivisions(1));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          showNotification({
            title: 'Смены не были получены',
            message: 'Произошла ошибка во время получения списка смен.',
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            styles: { icon: { background: 'red' } },
          });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPersonnelNumberExist) {
      setError('personnelNumber', { type: 'custom', message: 'Такой табельный номер существует' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPersonnelNumberExist]);

  const createDriverData = (data: ICreateDriverForm) => {
    const createdDriver: ICreateDriverRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      divisionNumber: data.division,
      dateBirth: dayjs(data.birthdate).format('YYYY-MM-DD'),
      personnelNumber: Number(data.personnelNumber),
    };
    return createdDriver;
  };

  const handleClose = () => {
    addDriverModalClose();
  };

  const handleBlur = async (value: string) => {
    try {
      await dispatch(getIsPersonnelNumberExist(Number(value)));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showNotification({
          title: 'Персональный номер не был проверен',
          message: 'Произошла ошибка во время проверки персонального номера.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  const onSubmit = async (data: ICreateDriverForm) => {
    try {
      await dispatch(createDriver(createDriverData(data)));
      reset();
      addDriverModalClose();
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showNotification({
          title: 'Водитель не был сохранен',
          message: 'Произошла ошибка во время добавления водителя.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  return (
    <Modal
      opened={addDriverModalOpened}
      onClose={handleClose}
      title="Добавить водителя"
      centered
      closeOnClickOutside={false}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={20}>
          <Stack gap={15}>
            <DivisionsSelect control={control} divisions={divisions} />
            <LastNameInput control={control} />
            <FirstNameInput control={control} />
            <BirthDateCalendar control={control} />
            <PersonnelNumberInput control={control} handleBlur={handleBlur} />
          </Stack>

          <Flex justify="flex-end" gap={10}>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Отменить
            </Button>

            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              type="submit"
              // eslint-disable-next-line react-hook-form/destructuring-formstate
              disabled={!formState.isValid}
            >
              Сохранить
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
}

export default memo(AddDriverModal);
