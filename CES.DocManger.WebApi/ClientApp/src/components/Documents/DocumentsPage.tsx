/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IMedicalCertificate, IMedicalCertificateRequest, INoDriverMedicalCertificate } from '../../types/DocumentType';
import '../../styles/document-page.scss';
import { RootState } from '../../redux/store/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import getDriversWithoutMedicalCertificate from '../../redux/actions/documents/driversWithoutMedicalCertificateRedux';
import createMedicalCertificate from '../../redux/actions/documents/createMedicalCertificateRedux';
import {
  changeCurrentValue,
  clearState,
  deleteDriver,
  FullName,
} from '../../redux/store/reducers/documents/driversWithoutMedicalCertificateReducer';

export default function DocumentsPage() {
  const [open, setOpen] = React.useState(false);
  const dispatch: IAuthResponseType = useDispatch();
  const currentValue = useSelector<RootState, string>(
    (state) => state.driversWithoutMedicalCertificate.currentValue,
  );
  const fullName = useSelector<RootState, FullName[]>(
    (state) => state.driversWithoutMedicalCertificate.fullName,
  );

  const {
    control,
    handleSubmit,
    reset,
    getFieldState,
  } = useForm<IMedicalCertificate>();
  const handleClickOpen = async () => {
    await dispatch(getDriversWithoutMedicalCertificate('s'));
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearState());
    setOpen(false);
  };
  const onSubmit = async (date: IMedicalCertificate) => {
    const index: number = date.fullName.indexOf(' ');
    if (index !== undefined) {
      const medical: IMedicalCertificateRequest = {
        lastName: date.fullName.slice(0, index),
        firstName: date.fullName.slice(index),
        issueDate: date.issueDate,
        serialNumber: date.serialNumber,
        expiryDate: date.expiryDate,
      };
      const res = await dispatch(createMedicalCertificate(medical));
      if (res.meta.requestStatus === 'fulfilled') {
        const action = res.payload as INoDriverMedicalCertificate;
        setOpen(true);

        dispatch(deleteDriver(
          {
            id: action.id,
            firstName: action.firstName,
            lastName: action.lastName,
          },
        ));
      }
      reset();
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color="primary" disableElevation> Добавить медицинскую справку </Button>
      <Button variant="contained" color="primary" disableElevation> Добавить водительское удостоверение </Button>
      <Dialog open={open}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Добавить медицинскую справку</DialogTitle>
          <DialogContent>
            <Controller
              name="serialNumber"
              control={control}
              defaultValue=""
              rules={{
                required: 'Required field',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Номер мед справки"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
            <Grid container justifyContent="space-around">
              <Controller
                name="issueDate"
                control={control}
                defaultValue={null}
                rules={{
                  // value:.lo null,
                  required: 'Обязательно для заполнение',
                  pattern: {
                    value: /^[Р]{1,10}/g,
                    message: 'Entered incorrect value',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['day', 'month', 'year']}
                      inputFormat="dd/MM/yyyy"
                      label="issueDate"
                      value={value}
                      onChange={(newValue: string | null) => {
                        if (newValue !== null) {
                          console.log(value);
                          getFieldState('expiryDate', form);
                          onChange(newValue);
                        } else {
                          onChange(null);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...params}
                          // helperText={params.inputProps?.placeholder}
                          helperText={error?.message}
                          error={!!error?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              <Controller
                name="expiryDate"
                control={control}
                defaultValue={null}
                rules={{
                  value: null,
                  required: 'Обязательно для заполнение',
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['day', 'month', 'year']}
                      label="expiryDate"
                      value={value}
                      onChange={(newValue) => {
                        if (newValue !== null) {
                          onChange(newValue);
                        } else {
                          onChange(newValue);
                        }
                      }}
                      inputFormat="dd/MM/yyyy"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      renderInput={(params) => (
                        <TextField
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...params}
                          helperText={error?.message}
                          error={!!error?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Controller
              name="fullName"
              control={control}
              defaultValue={currentValue}
              rules={{
                required: 'Required field',
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Age"
                      onChange={(event) => {
                        dispatch(changeCurrentValue(event.target.value));
                        onChange(event.target.value);
                      }}
                    >
                      {fullName.map((x) => (
                        <MenuItem
                          key={x.id}
                          value={x.driversFullName}
                        >
                          {x.driversFullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button type="submit">Сохранить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
