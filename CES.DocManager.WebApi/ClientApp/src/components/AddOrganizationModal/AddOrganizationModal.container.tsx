import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import createOrganization from '../../redux/actions/mes/createOrganization';
import { changeSelectedOrganizationId } from '../../redux/reducers/mes/mesReducer';
import editOrganization from '../../redux/actions/mes/editOrganization';
import AddOrganizationModalComponent from './AddOrganizationModal.component';
import { INotesState, Organization, OrganizationResponse } from '../../types/MesTypes';
import handleError from '../../utils';

const organizationDefaultValues = {
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
};

interface AddOrganizationModalContainerProps {
  addOrganizationModalOpened: boolean;
  editOrganizationModalOpened: boolean;
  addOrganizationModalClose: () => void;
  editOrganizationModalClose: () => void;
}

function AddOrganizationModalContainer(props: AddOrganizationModalContainerProps) {
  const {
    addOrganizationModalOpened,
    editOrganizationModalOpened,
    addOrganizationModalClose,
    editOrganizationModalClose,
  } = props;
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

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId !== 0) {
      setOrganizationError('');
      const elem = allOrganizations.organizations.filter(
        (el) => el.id === selectedOrganizationId,
      )[0];
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
  }, [selectedOrganizationId]);

  const handleClose = () => {
    if (addOrganizationModalOpened) {
      addOrganizationModalClose();
    }
    if (editOrganizationModalOpened) {
      editOrganizationModalClose();
    }
    reset();
  };

  const onSubmit = (data: Organization) => {
    if (addOrganizationModalOpened) {
      dispatch(createOrganization(data))
        .then(() => handleClose())
        .catch((error) => {
          handleError(error, setOrganizationError);
        });
    }
    if (editOrganizationModalOpened) {
      const newData: OrganizationResponse = {
        id: selectedOrganizationId,
        ...data,
      };
      dispatch(editOrganization(newData))
        .then(() => handleClose())
        .catch((error) => {
          handleError(error, setOrganizationError);
        });
    }
  };

  return (
    <AddOrganizationModalComponent
      isAddOrganizationModalOpen={addOrganizationModalOpened}
      isEditOrganizationModalOpen={editOrganizationModalOpened}
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
