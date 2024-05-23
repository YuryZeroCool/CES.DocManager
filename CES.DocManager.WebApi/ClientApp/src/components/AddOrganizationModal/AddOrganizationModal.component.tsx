import React from 'react';
import {
  Group,
  Modal,
  Button,
  Flex,
  Title,
  TextInput,
  Select,
} from '@mantine/core';
import {
  Control,
  Controller,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { Organization } from '../../types/MesTypes';
import classes from './AddOrganizationModal.module.scss';

interface Props {
  isAddOrganizationModalOpen: boolean;
  isEditOrganizationModalOpen: boolean;
  control: Control<Organization, Organization>;
  organizationError: string;
  isDisabled: boolean;
  handleSubmit: UseFormHandleSubmit<Organization>;
  handleClose: () => void;
  onSubmit: (data: Organization) => void;
}

export default function AddOrganizationModalComponent(props: Props) {
  const {
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
    control,
    isDisabled,
    organizationError,
    handleSubmit,
    handleClose,
    onSubmit,
  } = props;

  const renderTitle = () => (
    <Title size="h6" order={2} className={classes.modalTitle}>
      {isAddOrganizationModalOpen && 'Добавить организацию'}
      {isEditOrganizationModalOpen && 'Редактировать организацию'}
    </Title>
  );

  const renderError = () => (
    <Title size="h4" className={classes.modalErrorMessage}>
      {organizationError}
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
          data={['Сторонние', 'ЖЭС']}
          value={value}
          onChange={onChange}
          mb={20}
        />
      )}
    />
  );

  return (
    <Modal
      opened={isAddOrganizationModalOpen || isEditOrganizationModalOpen}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title={renderTitle()}
      styles={{
        content: { flex: '0 0 600px', borderRadius: 10 },
      }}
    >
      <Group w="100%">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {organizationError !== '' && renderError()}
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
