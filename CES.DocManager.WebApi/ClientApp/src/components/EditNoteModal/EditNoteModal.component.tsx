import React from 'react';
import {
  Box,
  Button,
  Fab,
  Modal,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { blue, grey } from './EditNoteModal.config';
import './EditNoteModal.style.scss';
import { EditNoteRequest } from '../../types/MesTypes';

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

const StyledTextarea = styled(TextareaAutosize)(
  () => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${grey[900]};
  background: ${'#fff'};
  border: 1px solid ${grey[200]};
  box-shadow: 0px 2px 2px ${grey[50]};
  margin-bottom: 10px;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

interface Props {
  isEditNoteModalOpen: boolean;
  formState: EditNoteRequest;
  handleTextAreaChange: (value: string) => void;
  handleAddressChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleClose: () => void;
  handleAddButtonClick: () => void;
  handleDeleteButtonClick: (id: number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditNoteModalComponent(props: Props) {
  const {
    isEditNoteModalOpen,
    formState,
    handleTextAreaChange,
    handleAddressChange,
    handleTelChange,
    handleClose,
    handleAddButtonClick,
    handleDeleteButtonClick,
    onSubmit,
  } = props;

  const renderTitle = (
    <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
      Отредактируйте заявку
    </Typography>
  );

  const renderTextArea = (
    <StyledTextarea
      value={formState.comment}
      onChange={(event) => handleTextAreaChange(event.target.value)}
    />
  );

  const renderNoteContactsInfo = (
    formState.noteContactsInfo.map((el, index) => (
      <div className="note-contacts-info-block" key={el.id}>
        <TextField
          id="outlined-controlled"
          variant="outlined"
          label="Адрес"
          sx={{ width: '60%' }}
          size="small"
          value={el.address}
          onChange={(event) => handleAddressChange(event.target.value, index)}
        />
        <TextField
          id="outlined-controlled"
          label="Телефон"
          variant="outlined"
          size="small"
          sx={{ width: '26%' }}
          value={el.tel}
          onChange={(event) => handleTelChange(event.target.value, index)}
        />
        <Fab
          disabled={el.address !== '' || el.tel !== '' || formState.noteContactsInfo.length === 1}
          color="primary"
          aria-label="add"
          sx={{ width: '4%', height: '30px', minHeight: '30px' }}
          onClick={() => handleDeleteButtonClick(el.id)}
        >
          <DeleteIcon sx={{ width: '20px', height: '20px' }} />
        </Fab>
        {index === formState.noteContactsInfo.length - 1 && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ width: '4%', height: '30px', minHeight: '30px' }}
            onClick={handleAddButtonClick}
          >
            <AddIcon sx={{ width: '20px', height: '20px' }} />
          </Fab>
        )}
      </div>
    ))
  );

  return (
    <Modal
      open={isEditNoteModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={(event) => onSubmit(event)}>
          {renderTitle}
          {renderTextArea}
          {renderNoteContactsInfo}
          <div className="modal-button-container">
            <Button
              disabled={formState.noteContactsInfo.filter((el) => el.address !== '').length === 0}
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
