import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import './MaterialReportDialog.style.scss';

export interface ReportDialogProps {
  isMaterialReportDialogOpen: boolean;
  selectedValue: string;
  handleClose: (value: string) => void;
  offSetX: number;
  offSetTop: number;
}

export default function MaterialReportDialogComponent(props: ReportDialogProps) {
  const {
    isMaterialReportDialogOpen,
    handleClose,
    selectedValue,
    offSetX,
    offSetTop,
  } = props;

  return (
    <>
      {isMaterialReportDialogOpen && (
        <div className="dialog" style={{ top: offSetTop, left: offSetX }}>
          <List sx={{ pt: 0 }}>
            <ListItem button onClick={() => handleClose('Прикрепить авто')}>
              <ListItemIcon>
                <AttachFileIcon />
              </ListItemIcon>
              <ListItemText primary="Прикрепить авто" />
            </ListItem>
            <ListItem button onClick={() => handleClose('Списать')}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Списать" />
            </ListItem>
            <ListItem button onClick={() => handleClose('Удалить')}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Удалить" />
            </ListItem>
          </List>
        </div>
      )}
      {null}
    </>
  );
}
