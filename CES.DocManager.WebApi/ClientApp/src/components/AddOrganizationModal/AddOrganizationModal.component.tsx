import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  Control,
  Controller,
  FormState,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { Organization } from '../../types/MesTypes';
import './AddOrganizationModal.style.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  padding: '20px 32px',
};

interface Props {
  isAddOrganizationModalOpen: boolean;
  isEditOrganizationModalOpen: boolean;
  control: Control<Organization, Organization>;
  formState: FormState<Organization>;
  organizationError: string;
  handleSubmit: UseFormHandleSubmit<Organization>;
  handleClose: () => void;
  onSubmit: (data: Organization) => Promise<void>;
}

export default function AddOrganizationModalComponent(props: Props) {
  const {
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
    control,
    formState,
    organizationError,
    handleSubmit,
    handleClose,
    onSubmit,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      {isAddOrganizationModalOpen && 'Добавить организацию'}
      {isEditOrganizationModalOpen && 'Редактировать организацию'}
    </Typography>
  );

  const renderError = () => (
    <Typography component="h4" className="modal-error-message">
      {organizationError}
    </Typography>
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
        <TextField
          margin="dense"
          size="small"
          label="Название организации"
          type="text"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={value}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );

  const renderOrganizationAddress = () => (
    <Controller
      name="address"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          margin="dense"
          size="small"
          label="Адрес"
          type="text"
          fullWidth
          variant="outlined"
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
      render={({ field: { onChange, value } }) => (
        <TextField
          margin="dense"
          size="small"
          label="УНП"
          type="text"
          sx={{ width: '32%' }}
          variant="outlined"
          onChange={onChange}
          value={value}
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
        <TextField
          margin="dense"
          size="small"
          label="Email"
          type="email"
          sx={{ width: '32%' }}
          variant="outlined"
          onChange={onChange}
          value={value}
          error={!!error?.message}
          helperText={error?.message}
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
        <TextField
          margin="dense"
          size="small"
          label="Телефон"
          type="tel"
          sx={{ width: '32%' }}
          variant="outlined"
          onChange={onChange}
          value={value}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );

  return (
    <Modal
      open={isAddOrganizationModalOpen || isEditOrganizationModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderTitle()}
          {organizationError !== '' && renderError()}
          {renderOrganizationName()}
          {renderOrganizationAddress()}
          <div className="inputs-container">
            {renderEmail()}
            {renderPhone()}
            {renderPayerAccountNumber()}
          </div>
          <div className="modal-button-container">
            <Button
              disabled={!formState.isValid}
              className="modal-button"
              variant="contained"
              type="submit"
              size="small"
            >
              Сохранить
            </Button>
            <Button
              className="modal-button"
              variant="contained"
              size="small"
              onClick={() => handleClose()}
            >
              Отмена
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
