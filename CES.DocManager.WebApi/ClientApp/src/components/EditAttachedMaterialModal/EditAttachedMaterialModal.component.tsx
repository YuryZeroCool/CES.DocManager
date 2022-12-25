import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';
import { IMaterialAttachedResponse } from '../../types/ReportTypes';
import { IAllBrandsResponse, INumbersPlateOfCarResponse } from '../../types/VehicleTypes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '20px 32px',
};

interface EditAttachedMaterialModalProps {
  isEditAttachedMaterialModalOpen: boolean;
  currentMaterial: IMaterialAttachedResponse;
  allBrands: IAllBrandsResponse;
  numbersPlateOfCar: INumbersPlateOfCarResponse;
  maxNumber: number;
  modalError: string;
  handleClose: () => void;
  handleChange: (event: SelectChangeEvent) => void;
  handleSubmit: () => Promise<void>;
}

export default function EditAttachedMaterialModalComponent(props: EditAttachedMaterialModalProps) {
  const {
    isEditAttachedMaterialModalOpen,
    currentMaterial,
    allBrands,
    numbersPlateOfCar,
    maxNumber,
    modalError,
    handleClose,
    handleChange,
    handleSubmit,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Редактировать материал
    </Typography>
  );

  const renderError = () => (
    <Typography id="modal-modal-error" variant="h6" component="h2" className="error-message">
      {modalError}
    </Typography>
  );

  return (
    <Modal
      open={isEditAttachedMaterialModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {renderTitle()}
        <div className="modal-select-container">
          {allBrands.length !== 0 && (
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel id="demo-simple-select-label">Марка авто</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentMaterial.vehicleBrand}
                name="brandSelect"
                label="Марка авто"
                onChange={handleChange}
              >
                {allBrands.map((el) => (
                  <MenuItem key={el.id} value={el.nameBrand}>{el.nameBrand}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {numbersPlateOfCar.length !== 0 && (
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel id="demo-simple-select-readonly-label">Номер авто</InputLabel>
              <Select
                labelId="demo-simple-select-readonly-label"
                id="demo-simple-select-readonly"
                value={currentMaterial.numberPlateCar}
                name="numbersPlateSelect"
                label="Номер авто"
                onChange={handleChange}
              >
                {numbersPlateOfCar.map((el) => (
                  <MenuItem key={el.id} value={el.number}>{el.number}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <input
            className="material-number"
            type="number"
            step={currentMaterial.unit === 'шт' ? '1' : '0.001'}
            value={currentMaterial.count}
            name="attachedMaterialNumber"
            min="0"
            max={maxNumber === 0 ? currentMaterial.count : maxNumber}
            onChange={handleChange}
          />
        </div>
        {renderError()}
        <div className="modal-button-container">
          <Button
            className="modal-button"
            variant="contained"
            type="submit"
            size="small"
            disabled={currentMaterial.count === 0 || currentMaterial.numberPlateCar === ''}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
          <Button
            className="modal-button"
            variant="contained"
            size="small"
            onClick={() => {
              handleClose();
            }}
          >
            Отмена
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
