import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { ChangeEvent, FormEvent } from 'react';
import {
  AllMechanicsResponse,
  IMaterialAttachedResponse,
  IMaterialsWriteOffForm,
  ITableAttachedMaterials,
} from '../../types/ReportTypes';
import './AddMaterialsWriteOffModal.style.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '20px 32px',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid rgba(224, 224, 224, 1)',
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '10px',
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#606060',
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: 'relative',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface Props {
  isAddMaterialsWriteOffModalOpen: boolean;
  handleClose: () => void;
  handleChange: (event: SelectChangeEvent) => void;
  changeMaterialsByCar: (event: SelectChangeEvent<string[]>) => void;
  changeCurrentDate: (value: Date | null) => void;
  formState: IMaterialsWriteOffForm;
  allMechanics: AllMechanicsResponse[];
  attachedCars: string[];
  attachedMaterialsByCar: IMaterialAttachedResponse[];
  tableAttachedMaterialsArray: ITableAttachedMaterials[];
  handleNumberChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AddMaterialsWriteOffModalComponent(props: Props) {
  const {
    isAddMaterialsWriteOffModalOpen,
    handleClose,
    handleChange,
    changeMaterialsByCar,
    changeCurrentDate,
    handleNumberChange,
    handleSubmit,
    formState: {
      currentDate,
      car,
      mechanic,
      materialsByCar,
    },
    allMechanics,
    attachedCars,
    attachedMaterialsByCar,
    tableAttachedMaterialsArray,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Добавить ремонт
    </Typography>
  );

  const renderCurrentDate = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        label="Дата ремонта"
        value={currentDate}
        onChange={(value) => changeCurrentDate(value)}
        inputFormat="YYYY-MM-DD"
        mask="____-__-__"
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => (
          <TextField
            className="current-date"
            name="currentDate"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            sx={{ width: '30%' }}
            size="small"
            // helperText={error?.message}
            // error={!!error?.message}
          />
        )}
      />
    </LocalizationProvider>
  );

  const renderMechanicsSelect = () => (
    <FormControl size="small" sx={{ width: '30%' }}>
      <InputLabel id="demo-simple-select-readonly-label">Механик</InputLabel>
      <Select
        name="mechanic"
        labelId="demo-simple-select-readonly-label"
        id="demo-simple-select-readonly"
        value={mechanic}
        label="Выбрать механика..."
        onChange={(event) => handleChange(event)}
        // error={!!error?.message}
      >
        {allMechanics && allMechanics.map((el) => (
          <MenuItem key={el.id} value={el.fio}>{el.fio}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderAttachedCarsSelect = () => (
    <FormControl size="small" sx={{ width: '30%' }}>
      <InputLabel id="demo-simple-select-readonly-label">Машина</InputLabel>
      <Select
        name="car"
        labelId="demo-simple-select-readonly-label"
        id="demo-simple-select-readonly"
        value={car}
        label="Выбрать машину..."
        onChange={(event) => handleChange(event)}
        // error={!!error?.message}
      >
        {attachedCars && attachedCars.map((el) => (
          <MenuItem key={el} value={el}>{el}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderAttachedMaterialsByCarSelect = () => (
    <FormControl size="small" fullWidth sx={{ marginBottom: '15px' }}>
      <InputLabel id="demo-simple-select-readonly-label">Закрепленные материалы</InputLabel>
      <Select
        name="materialsByCar"
        labelId="demo-simple-select-readonly-label"
        id="demo-simple-select-readonly"
        value={materialsByCar}
        multiple
        label="Выбрать закрепленные материалы..."
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        onChange={changeMaterialsByCar}
        inputProps={{ readOnly: car === '' }}
        // error={!!error?.message}
      >
        {attachedMaterialsByCar && attachedMaterialsByCar.length > 0
        && attachedMaterialsByCar.map((el) => (
          <MenuItem key={el.id} value={el.nameMaterial}>
            <Checkbox
              checked={materialsByCar.indexOf(el.nameMaterial) > -1}
            />
            <ListItemText primary={el.nameMaterial} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ borderRadius: '4px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sx={{ width: '5%' }} align="center">№</StyledTableCell>
            <StyledTableCell sx={{ width: '80%' }} align="left">Наименование</StyledTableCell>
            <StyledTableCell sx={{ width: '15%' }} align="left">Количество</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {tableAttachedMaterialsArray.map((el, index) => (
            <StyledTableRow
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center" component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{el.nameMaterial}</StyledTableCell>
              <StyledTableCell align="left">
                <input
                  className="material-number"
                  type="number"
                  value={el.currentCount}
                  name="attachedMaterialNumber"
                  min="0"
                  max={el.count}
                  onChange={(event) => handleNumberChange(event, el.id)}
                />
                <span>
                  /
                  {el.count}
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <Modal
        open={isAddMaterialsWriteOffModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={(event) => handleSubmit(event)}>
            {renderTitle()}
            <div className="modal-info-block">
              {renderCurrentDate()}
              {renderMechanicsSelect()}
              {renderAttachedCarsSelect()}
            </div>
            {renderAttachedMaterialsByCarSelect()}
            {renderTable()}
            <div className="modal-button-container">
              <Button
                // disabled={!isValid}
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
                onClick={handleClose}
              >
                Отмена
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
