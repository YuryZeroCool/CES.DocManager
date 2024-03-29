import React, { ChangeEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Control,
  Controller,
  FormState,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import { Division } from '../../types/ReportTypes';
import { ICreateDriverForm } from '../../types/DriversType';

interface AddDriverModalProps {
  isAddDriverModalOpen: boolean;
  divisions: Division[];
  control: Control<ICreateDriverForm, ICreateDriverForm>;
  formState: FormState<ICreateDriverForm>;
  handleClose: () => void;
  onSubmit: (data: ICreateDriverForm) => void;
  handleSubmit: UseFormHandleSubmit<ICreateDriverForm>;
  reset: UseFormReset<ICreateDriverForm>;
  handleBlur: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>;
}

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

export default function AddDriverModalComponent(props: AddDriverModalProps) {
  const {
    isAddDriverModalOpen,
    divisions,
    formState,
    control,
    handleClose,
    onSubmit,
    handleSubmit,
    reset,
    handleBlur,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Добавить водителя
    </Typography>
  );

  const renderLastName = () => (
    <Controller
      name="lastName"
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
          label="Фамилия"
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

  const renderFirstName = () => (
    <Controller
      name="firstName"
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
          label="Имя и отчество"
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

  const renderBirthdate = () => (
    <Controller
      name="birthdate"
      control={control}
      defaultValue={null}
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            label="Дата рождения"
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

  const renderPersonnelNumber = () => (
    <Controller
      name="personnelNumber"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
        minLength: {
          value: 1,
          message: 'Минимальное количество символов 1',
        },
        min: {
          value: 0,
          message: 'Минимальное значение 0',
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          size="medium"
          margin="dense"
          label="Табельный номер"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          onBlur={(event) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handleBlur(event);
          }}
          value={value}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );

  const renderDivisionsSelect = () => (
    <Controller
      name="division"
      control={control}
      defaultValue=""
      rules={{
        required: 'Обязательное поле для заполнения',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth size="medium">
          <InputLabel id="demo-simple-select-readonly-label">Смена</InputLabel>
          <Select
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={value}
            label="Выбрать смену..."
            onChange={onChange}
            error={!!error?.message}
          >
            <MenuItem value="">Выбрать смену...</MenuItem>
            {divisions && divisions.map((el) => (
              <MenuItem key={el.id} value={el.division}>{el.division}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );

  return (
    <Modal
      open={isAddDriverModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderTitle()}
          {renderDivisionsSelect()}
          {renderLastName()}
          {renderFirstName()}
          {renderBirthdate()}
          {renderPersonnelNumber()}
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
