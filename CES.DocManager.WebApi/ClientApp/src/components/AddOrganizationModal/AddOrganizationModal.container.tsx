import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import createOrganization from '../../redux/actions/mes/createOrganization';
import { changeSelectedOrganizationId } from '../../redux/reducers/mes/mesReducer';
import editOrganization from '../../redux/actions/mes/editOrganization';
import getOrganizationType from '../../redux/actions/mes/getOrganizationTypes';
import AddOrganizationModalComponent from './AddOrganizationModal.component';
import { INotesState, Organization, OrganizationResponse } from '../../types/MesTypes';
import handleError from '../../utils';

const organizationDefaultValues: Organization = {
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
  organizationType: null,
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
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<Organization, Organization>({
    mode: 'onChange',
    defaultValues: organizationDefaultValues,
  });

  const watchedName = watch('name');
  const watchedPayerAccountNumber = watch('payerAccountNumber');

  const {
    allOrganizations,
    selectedOrganizationId,
    organizationTypes,
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
      setValue('organizationType', elem.organizationType);
    }

    dispatch(getOrganizationType())
      .catch(() => {
        showNotification({
          title: 'Список типов организаций не был получен',
          message: 'Произошла ошибка во время получения списка типов организаций.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (watchedName.length > 2 && watchedPayerAccountNumber.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedName, watchedPayerAccountNumber]);

  const handleClose = () => {
    if (addOrganizationModalOpened) {
      addOrganizationModalClose();
    }
    if (editOrganizationModalOpened) {
      editOrganizationModalClose();
    }
    reset();
    dispatch(changeSelectedOrganizationId(0));
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
      organizationError={organizationError}
      isDisabled={isDisabled}
      organizationTypes={organizationTypes}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onSubmit={onSubmit}
    />
  );
}

export default AddOrganizationModalContainer;
