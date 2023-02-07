import React, { SyntheticEvent } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import PrintIcon from '@mui/icons-material/Print';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './MaterialReportDialog.style.scss';

export interface ReportDialogProps {
  materialsTableType: string;
  offSetX: number;
  offSetTop: number;
  isDialogHightBigger: boolean;
  pageType: string;
  handleClose: (event: SyntheticEvent, value: string) => void;
}

export default function MaterialReportDialogComponent(props: ReportDialogProps) {
  const {
    materialsTableType,
    offSetX,
    offSetTop,
    isDialogHightBigger,
    pageType,
    handleClose,
  } = props;

  return (
    <div
      className="dialog"
      style={
      {
        top: offSetTop,
        left: offSetX,
        height: (pageType === 'Материалы' && (materialsTableType === 'Прикрепленные' || materialsTableType === 'Списанные')) ? '100px' : '150px',
        zIndex: isDialogHightBigger ? 15 : 5,
      }
      }
    >
      <List sx={{ pt: 0 }}>
        {pageType === 'Материалы' && materialsTableType === 'Свободные' && (
          <>
            <ListItemButton onClick={(event) => handleClose(event, 'Прикрепить авто')}>
              <ListItemIcon>
                <AttachFileIcon />
              </ListItemIcon>
              <ListItemText primary="Прикрепить авто" />
            </ListItemButton>
            <ListItemButton onClick={(event) => handleClose(event, 'Списать')}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Списать" />
            </ListItemButton>
          </>
        )}
        {pageType === 'История ремонтов' && (
          <ListItemButton onClick={(event) => handleClose(event, 'Распечатать')}>
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Распечатать" />
          </ListItemButton>
        )}
        {pageType === 'История ремонтов' && (
          <ListItemButton onClick={(event) => handleClose(event, 'Подробнее')}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Подробнее" />
          </ListItemButton>
        )}
        {pageType === 'Материалы' && (materialsTableType === 'Прикрепленные' || materialsTableType === 'Списанные') && (
          <ListItemButton onClick={(event) => handleClose(event, 'Редактировать')}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Редактировать" />
          </ListItemButton>
        )}
        <ListItemButton onClick={(event) => handleClose(event, 'Удалить')}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Удалить" />
        </ListItemButton>
      </List>
    </div>
  );
}
