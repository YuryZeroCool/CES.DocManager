import React, { SyntheticEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import './MaterialReportDialog.style.scss';

export interface ReportDialogProps {
  materialsTableType: string;
  handleClose: (event: SyntheticEvent, value: string) => void;
  offSetX: number;
  offSetTop: number;
  isDialogHightBigger: boolean;
}

export default function MaterialReportDialogComponent(props: ReportDialogProps) {
  const {
    materialsTableType,
    handleClose,
    offSetX,
    offSetTop,
    isDialogHightBigger,
  } = props;

  return (
    <div
      className="dialog"
      style={
      {
        top: offSetTop,
        left: offSetX,
        height: materialsTableType === 'Свободные' ? '150px' : '100px',
        zIndex: isDialogHightBigger ? 15 : 5,
      }
      }
    >
      <List sx={{ pt: 0 }}>
        {materialsTableType === 'Свободные' && (
          <>
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
          </>
        )}
        <ListItem button onClick={(event) => handleClose(event, 'Удалить')}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Удалить" />
        </ListItem>
        {materialsTableType === 'Прикрепленные' && (
          <ListItem button onClick={(event) => handleClose(event, 'Редактировать')}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Редактировать" />
          </ListItem>
        )}
      </List>
    </div>
  );
}
