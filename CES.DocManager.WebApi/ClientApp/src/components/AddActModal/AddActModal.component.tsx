import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddActTable from '../AddActTable/AddActTable.container';
import CustomDataListContainer from '../CustomDataList/CustomDataList.container';
import { Act } from '../../types/MesTypes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  zIndex: 10,
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '.MuiDialog-paper': {
    maxWidth: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export interface DialogTitleProps {
  children: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface Props {
  handleClose: () => void;
  isAddActModalOpen: boolean;
  currentActData: Act;
  type: string;
}

export default function AddActModalComponent(props: Props) {
  const {
    handleClose,
    isAddActModalOpen,
    currentActData,
    type,
  } = props;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isAddActModalOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          Добавление акта
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CustomDataListContainer />
          {currentActData.works.length !== 0 && (
            <AddActTable currentActData={currentActData} type={type} />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
