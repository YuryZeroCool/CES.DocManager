import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddOrganizationModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import AddOrganizationModalComponent from './AddOrganizationModal.component';
import createOrganization from '../../redux/actions/mes/createOrganization';
import { organizationDefaultValues } from '../../redux/reducers/mes/mesReducer';
import { INotesState, Organization } from '../../types/MesTypes';

function AddOrganizationModalContainer() {
  const [organizationError, setOrganizationError] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm<Organization, Organization>({
    mode: 'onChange',
    defaultValues: organizationDefaultValues,
  });

  const {
    createdOrganization,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const {
    isAddOrganizationModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (createdOrganization.name !== '') {
      reset();
      dispatch(toggleAddOrganizationModal(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdOrganization]);

  const handleClose = () => {
    dispatch(toggleAddOrganizationModal(false));
  };

  const onSubmit = async (data: Organization) => {
    try {
      await dispatch(createOrganization(data));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setOrganizationError(error.message);
      }
    }
  };

  return (
    <AddOrganizationModalComponent
      isAddOrganizationModalOpen={isAddOrganizationModalOpen}
      control={control}
      formState={formState}
      organizationError={organizationError}
      handleSubmit={handleSubmit}
      reset={reset}
      handleClose={handleClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    />
  );
}

export default AddOrganizationModalContainer;
