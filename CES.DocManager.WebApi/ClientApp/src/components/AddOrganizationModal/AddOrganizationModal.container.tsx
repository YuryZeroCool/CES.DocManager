import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddOrganizationModal, toggleEditOrganizationModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import AddOrganizationModalComponent from './AddOrganizationModal.component';
import createOrganization from '../../redux/actions/mes/createOrganization';
import { changeSelectedOrganizationId } from '../../redux/reducers/mes/mesReducer';
import editOrganization from '../../redux/actions/mes/editOrganization';
import { INotesState, Organization, OrganizationResponse } from '../../types/MesTypes';

const organizationDefaultValues = {
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
};

function AddOrganizationModalContainer() {
  const [organizationError, setOrganizationError] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState,
    setValue,
  } = useForm<Organization, Organization>({
    mode: 'onChange',
    defaultValues: organizationDefaultValues,
  });

  const {
    allOrganizations,
    selectedOrganizationId,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const {
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId !== 0) {
      const elem = allOrganizations.filter((el) => el.id === selectedOrganizationId)[0];
      setValue('name', elem.name);
      setValue('address', elem.address);
      setValue('payerAccountNumber', elem.payerAccountNumber);
      setValue('email', elem.email);
      setValue('phone', elem.phone);
    }
    return () => {
      dispatch(changeSelectedOrganizationId(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (isAddOrganizationModalOpen) {
      dispatch(toggleAddOrganizationModal(false));
    }
    if (isEditOrganizationModalOpen) {
      dispatch(toggleEditOrganizationModal(false));
    }
    reset();
  };

  const onSubmit = async (data: Organization) => {
    try {
      if (isAddOrganizationModalOpen) {
        await dispatch(createOrganization(data));
        handleClose();
      }
      if (isEditOrganizationModalOpen) {
        const newData: OrganizationResponse = {
          id: selectedOrganizationId,
          ...data,
        };
        await dispatch(editOrganization(newData));
        handleClose();
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setOrganizationError(error.message);
      }
    }
  };

  return (
    <AddOrganizationModalComponent
      isAddOrganizationModalOpen={isAddOrganizationModalOpen}
      isEditOrganizationModalOpen={isEditOrganizationModalOpen}
      control={control}
      formState={formState}
      organizationError={organizationError}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    />
  );
}

export default AddOrganizationModalContainer;
