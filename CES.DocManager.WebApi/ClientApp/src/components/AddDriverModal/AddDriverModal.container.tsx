import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import createDriver from '../../redux/actions/drivers/createDriver';
import getDivisions from '../../redux/actions/getAllDivisions';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddDriverModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { ICreateDriverForm, ICreateDriverRequest } from '../../types/DriversType';
import { Division } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import AddDriverModalComponent from './AddDriverModal.component';

function AddDriverModalContainer() {
  const [divisionsError, setDivisionsError] = useState<string>('');
  const { isAddDriverModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm<ICreateDriverForm, ICreateDriverForm>({ mode: 'onChange' });

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getAllDivisions(): Promise<void> {
      try {
        await dispatch(getDivisions(1));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setDivisionsError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllDivisions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSubmit = async (data: ICreateDriverForm) => {
    try {
      await dispatch(createDriver(createDriverData(data)));
      reset();
      dispatch(toggleAddDriverModal(false));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setDivisionsError(error.message);
      }
    }
  };

  return (
    <AddDriverModalComponent
      isAddDriverModalOpen={isAddDriverModalOpen}
      handleClose={handleClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      control={control}
      reset={reset}
      divisions={divisions}
      formState={formState}
    />
  );
}

export default AddDriverModalContainer;
