import { Button, MenuItem, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import React from 'react';
import { IAllBrandsResponse, INumbersPlateOfCarResponse } from '../../types/VehicleTypes';
import './CarAttachmentModal.style.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: 400,
  minHeight: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

interface Props {
  handleClose: () => void;
  handleChange: (event: SelectChangeEvent) => void;
  handleSubmit: () => void;
  isCarAttachmentModalOpen: boolean;
  allBrands: IAllBrandsResponse | undefined;
  brand: string;
  numbersPlateOfCarState: string;
  attachedMaterialNumber: number;
  numbersPlateOfCar: INumbersPlateOfCarResponse | undefined;
  maxNumber: number | undefined;
}

export default function CarAttachmentModalComponent(props: Props) {
  const {
    handleClose,
    handleChange,
    handleSubmit,
    isCarAttachmentModalOpen,
    allBrands,
    brand,
    numbersPlateOfCarState,
    attachedMaterialNumber,
    numbersPlateOfCar,
    maxNumber,
  } = props;

  return (
    <Modal
      open={isCarAttachmentModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-select-container">
          <FormControl sx={{ width: 150 }} size="small">
            <InputLabel id="demo-simple-select-label">Марка авто</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              name="brandSelect"
              label="Марка авто"
              onChange={handleChange}
            >
              {allBrands?.map((el) => (
                <MenuItem key={el.id} value={el.nameBrand}>{el.nameBrand}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }} size="small">
            <InputLabel id="demo-simple-select-readonly-label">Номер авто</InputLabel>
            <Select
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={numbersPlateOfCarState}
              name="numbersPlateSelect"
              label="Номер авто"
              onChange={handleChange}
              inputProps={{ readOnly: brand === '' }}
            >
              {numbersPlateOfCar?.map((el) => (
                <MenuItem key={el.id} value={el.number}>{el.number}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            className="material-number"
            type="number"
            value={attachedMaterialNumber}
            name="attachedMaterialNumber"
            min="1"
            max={maxNumber}
            onChange={handleChange}
          />
        </div>
        <div className="modal-button-container">
          <Button
            className="modal-button"
            disabled={brand === '' || numbersPlateOfCarState === '' || attachedMaterialNumber === 0}
            variant="contained"
            size="small"
            onClick={handleSubmit}
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
      </Box>
    </Modal>
  );
}
