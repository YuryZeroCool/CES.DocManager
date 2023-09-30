import React from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

interface WarningModalComponentProps {
  open: boolean;
  handleClose: () => void;
  cofirmAction: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 3,
};

export default function WarningModalComponent(props: WarningModalComponentProps) {
  const {
    open,
    handleClose,
    cofirmAction,
  } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
          Вы уверены, что хотите удалить эту запись?
        </Typography>
        <Stack gap={3} direction="row" justifyContent="space-evenly">
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ width: '150px' }}
          >
            Отменить
          </Button>
          <Button
            onClick={cofirmAction}
            variant="contained"
            sx={{ width: '150px' }}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
