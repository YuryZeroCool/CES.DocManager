import {
  Button, Flex, Group, Modal, Select, TextInput, Title,
} from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers/combineReducers';
import { createOrganization, editOrganization, getOrganizationType } from 'redux/actions/mes';
import { changeSelectedOrganizationId } from 'redux/reducers/mes/organizationReducer';
import { IAuthResponseType } from 'redux/store/configureStore';
import { Organization, OrganizationResponse, OrganizationState } from 'types/mes/OrganizationTypes';

import classes from './styles.module.scss';

const organizationDefaultValues: Organization = {
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
  organizationType: null,
};

interface OrganizationModalProps {
  addOrganizationModalOpened: boolean;
  editOrganizationModalOpened: boolean;
  addOrganizationModalClose: () => void;
  editOrganizationModalClose: () => void;
}

function OrganizationModal(props: OrganizationModalProps) {
  const {
    addOrganizationModalOpened,
    editOrganizationModalOpened,
    addOrganizationModalClose,
    editOrganizationModalClose,
  } = props;

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
  const watchedOrganizationType = watch('organizationType');

  const {
    allOrganizations,
    organizationTypes,
    selectedOrganizationId,
    requestStatus,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId !== 0) {
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
      .catch(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (watchedName.length > 2
      && watchedPayerAccountNumber.length > 2
      && watchedOrganizationType !== null) {
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
      dispatch(createOrganization(data)).unwrap()
        .then(() => handleClose())
        .catch(() => {});
    }
    if (editOrganizationModalOpened) {
      const newData: OrganizationResponse = {
        id: selectedOrganizationId,
        ...data,
      };
      dispatch(editOrganization(newData)).unwrap()
        .then(() => handleClose())
        .catch(() => {});
    }
  };

  const renderTitle = () => (
    <Title size="h6" order={2} className={classes.modalTitle}>
      {addOrganizationModalOpened && 'Добавить организацию'}
      {editOrganizationModalOpened && 'Редактировать организацию'}
    </Title>
  );

  const renderOrganizationName = () => (
    <Controller
      name="name"
      control={control}
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 3,
          message: 'Минимальное количество символов 3',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="Название организации"
          w="100%"
          withAsterisk
          onChange={onChange}
          value={value}
          error={!!error?.message}
        />
      )}
    />
  );

  const renderOrganizationAddress = () => (
    <Controller
      name="address"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          label="Адрес"
          w="100%"
          onChange={onChange}
          value={value}
        />
      )}
    />
  );

  const renderPayerAccountNumber = () => (
    <Controller
      name="payerAccountNumber"
      control={control}
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 3,
          message: 'Минимальное количество символов 3',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="УНП"
          withAsterisk
          w="32%"
          onChange={onChange}
          value={value}
          error={!!error?.message}
        />
      )}
    />
  );

  const renderEmail = () => (
    <Controller
      name="email"
      control={control}
      rules={{
        pattern: {
          value: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: 'Введен некорректный email',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="Email"
          type="email"
          w="32%"
          onChange={onChange}
          value={value}
          error={!!error?.message}
        />
      )}
    />
  );

  const renderPhone = () => (
    <Controller
      name="phone"
      control={control}
      rules={{
        pattern: {
          value: /^[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/,
          message: 'Введен некорректный номер телефона',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          label="Телефон"
          type="tel"
          w="32%"
          onChange={onChange}
          value={value}
          error={!!error?.message}
        />
      )}
    />
  );

  const renderTypeSelect = () => (
    <Controller
      name="organizationType"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          label="Тип организации"
          data={organizationTypes.map((el) => el.name)}
          value={value}
          onChange={onChange}
          mb={20}
          withAsterisk
          error={error?.message}
        />
      )}
    />
  );

  return (
    <Modal
      opened={addOrganizationModalOpened || editOrganizationModalOpened}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      lockScroll={false}
      title={renderTitle()}
      styles={{
        content: { flex: '0 0 600px', borderRadius: 10 },
      }}
    >
      <Group w="100%">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {renderOrganizationName()}
          {renderOrganizationAddress()}
          <Flex gap="2%" mb={10}>
            {renderEmail()}
            {renderPhone()}
            {renderPayerAccountNumber()}
          </Flex>
          {renderTypeSelect()}
          <Flex justify="flex-end" gap={10}>
            <Button
              variant="outline"
              onClick={() => handleClose()}
            >
              Отменить
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              disabled={isDisabled}
              loading={requestStatus === 'pending'}
              type="submit"
            >
              Сохранить
            </Button>
          </Flex>
        </form>
      </Group>
    </Modal>
  );
}

export default memo(OrganizationModal);
