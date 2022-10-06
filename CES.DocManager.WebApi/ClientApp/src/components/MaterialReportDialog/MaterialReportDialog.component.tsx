import React, { SyntheticEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import './MaterialReportDialog.style.scss';

export interface ReportDialogProps {
  handleClose: (event: SyntheticEvent, value: string) => void;
  offSetX: number;
  offSetTop: number;
}

export default function MaterialReportDialogComponent(props: ReportDialogProps) {
  const {
    handleClose,
    offSetX,
    offSetTop,
  } = props;

  return (
    <div className="dialog" style={{ top: offSetTop, left: offSetX }}>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={(event) => handleClose(event, 'Прикрепить авто')}>
          <ListItemIcon>
            <AttachFileIcon />
          </ListItemIcon>
          <ListItemText primary="Прикрепить авто" />
        </ListItem>
        <ListItem button onClick={(event) => handleClose(event, 'Списать')}>
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary="Списать" />
        </ListItem>
        <ListItem button onClick={(event) => handleClose(event, 'Удалить')}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Удалить" />
        </ListItem>
      </List>
    </div>
  );
}
