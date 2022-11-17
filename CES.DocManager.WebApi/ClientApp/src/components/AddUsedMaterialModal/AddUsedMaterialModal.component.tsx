import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent } from 'react';
import { Product } from '../../types/ReportTypes';

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

interface AddUsedMaterialModalProps {
  isAddUsedMaterialModalOpen: boolean;
  currentMaterial: Product;
  maxNumber: number;
  currentMaterialCount: number;
  usedMaterialModalError: string;
  unit: string;
  handleClose: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function AddUsedMaterialModalComponent(props: AddUsedMaterialModalProps) {
  const {
    isAddUsedMaterialModalOpen,
    currentMaterial,
    maxNumber,
    currentMaterialCount,
    usedMaterialModalError,
    unit,
    handleChange,
    handleClose,
    onSubmit,
  } = props;

  const renderTitle = () => (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Списать материал
    </Typography>
  );

  return (
    <Modal
      open={isAddUsedMaterialModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {renderTitle()}
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          label="Материал"
          variant="outlined"
          value={currentMaterial.name}
          name="materialName"
          sx={{ marginBottom: '10px' }}
        />
        <Typography id="modal-modal-title" variant="subtitle1" component="h6" sx={{ marginBottom: '10px' }}>
          Всего в наличии:&nbsp;
          {maxNumber}
        </Typography>
        <input
          className={currentMaterialCount > maxNumber ? 'material-number number-error' : 'material-number'}
          type="number"
          value={currentMaterialCount}
          name="currentMaterialCount"
          min="0"
          max={maxNumber}
          step={unit === 'шт' ? '1' : '0.001'}
          onChange={handleChange}
        />
        {usedMaterialModalError !== '' && <p className="error-message">{usedMaterialModalError}</p>}
        <div className="modal-button-container">
          <Button
            className="modal-button"
            variant="contained"
            type="submit"
            size="small"
            disabled={currentMaterialCount === 0 || currentMaterialCount > maxNumber}
            onClick={onSubmit}
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
