import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import createDriver from '../../redux/actions/drivers/createDriver';
import getIsPersonnelNumberExist from '../../redux/actions/drivers/getIsPersonnelNumberExist';
import getDivisions from '../../redux/actions/getAllDivisions';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddDriverModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { ICreateDriverForm, ICreateDriverRequest, IDriverResponse } from '../../types/DriversType';
import { Division } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import AddDriverModalComponent from './AddDriverModal.component';

function AddDriverModalContainer() {
  const [driverModalError, setDriverModalError] = useState<string>('');
  const { isAddDriverModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

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
          setDriverModalError(error.message);
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
    dispatch(toggleAddDriverModal(false));
  };

  const handleBlur = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      await dispatch(getIsPersonnelNumberExist(Number(event.target.value)));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setDriverModalError(error.message);
      }
    }
  };

  const onSubmit = async (data: ICreateDriverForm) => {
    try {
      await dispatch(createDriver(createDriverData(data)));
      reset();
      dispatch(toggleAddDriverModal(false));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setDriverModalError(error.message);
      }
    }
  };

  return (
    <AddDriverModalComponent
      isAddDriverModalOpen={isAddDriverModalOpen}
      control={control}
      divisions={divisions}
      formState={formState}
      handleClose={handleClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      reset={reset}
    />
  );
}

export default AddDriverModalContainer;
