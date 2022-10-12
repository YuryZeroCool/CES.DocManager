import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import {
  Control,
  Controller,
  FormState,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { FullName, IDriverDocumentsForm } from '../../types/DocumentType';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '20px 32px',
};

interface Props {
  isAddMedicalCertificateModalOpen: boolean;
  isAddDriverLicenseModalOpen: boolean;
  control: Control<IDriverDocumentsForm, IDriverDocumentsForm>;
  handleSubmit: UseFormHandleSubmit<IDriverDocumentsForm>;
  reset: UseFormReset<IDriverDocumentsForm>;
  formState: FormState<IDriverDocumentsForm>;
  driversWithoutMedicalCertificates: FullName[];
  driversWithoutDriverLicense: FullName[];
  handleClose: () => void;
  onSubmit: (data: IDriverDocumentsForm) => void;
}

export default function AddDriverDocumentsModalComponent(props: Props) {
  const {
    isAddMedicalCertificateModalOpen,
    isAddDriverLicenseModalOpen,
    control,
    handleSubmit,
    reset,
    formState,
    driversWithoutMedicalCertificates,
    driversWithoutDriverLicense,
    handleClose,
    onSubmit,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      {isAddMedicalCertificateModalOpen && 'Добавить медицинскую справку'}
      {isAddDriverLicenseModalOpen && 'Добавить водительское удостоверение'}
    </Typography>
  );

  const renderDriverFullNamesSelect = () => (
    <Controller
      name="fullName"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth size="medium">
          <InputLabel id="demo-simple-select-readonly-label">Водитель</InputLabel>
          <Select
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={value}
            label="Выбрать водителя"
            onChange={onChange}
            error={!!error?.message}
          >
            {driversWithoutMedicalCertificates && driversWithoutMedicalCertificates.map((el) => (
              <MenuItem key={el.id} value={el.driversFullName}>{el.driversFullName}</MenuItem>
            ))}
            {driversWithoutDriverLicense && driversWithoutDriverLicense.map((el) => (
              <MenuItem key={el.id} value={el.driversFullName}>{el.driversFullName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );

  const renderSerialNumber = () => (
    <Controller
      name="serialNumber"
      control={control}
      defaultValue=""
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
          size="medium"
          label="Серийный номер"
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

  const renderCategory = () => (
    <Controller
      name="category"
      control={control}
      defaultValue=""
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
          size="medium"
          label="Категория"
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

  const renderIssueDate = () => (
    <Controller
      name="issueDate"
      control={control}
      defaultValue={null}
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            label="Дата выдачи"
            value={value}
            onChange={(newValue) => {
              if (newValue !== null) {
                onChange(newValue);
              } else {
                onChange(newValue);
              }
            }}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                fullWidth
                size="medium"
                sx={{ marginTop: '10px' }}
                helperText={error?.message}
                error={!!error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );

  const renderExpiryDate = () => (
    <Controller
      name="expiryDate"
      control={control}
      defaultValue={null}
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            label="Дата истечения срока действия"
            value={value}
            onChange={(newValue) => {
              if (newValue !== null) {
                onChange(newValue);
              } else {
                onChange(newValue);
              }
            }}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                fullWidth
                size="medium"
                sx={{ marginTop: '10px' }}
                helperText={error?.message}
                error={!!error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );

  return (
    <Modal
      open={isAddMedicalCertificateModalOpen || isAddDriverLicenseModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderTitle()}
          {renderDriverFullNamesSelect()}
          {renderSerialNumber()}
          {renderIssueDate()}
          {renderExpiryDate()}
          {isAddDriverLicenseModalOpen && renderCategory()}
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
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Отмена
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
