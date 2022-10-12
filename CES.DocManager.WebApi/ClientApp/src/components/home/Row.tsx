import {
  Box,
  Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import { IExpiringDocumentsResponse } from '../../types/DocumentType';

interface Props {
  row: IExpiringDocumentsResponse;
}

export default function Row(props: Props) {
  const [open, setOpen] = React.useState(false);
  const { row } = props;
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`${row.lastName} ${row.firstName}`}
        </TableCell>
        <TableCell>{row.divisionNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Подробная информация
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ФИО</TableCell>
                    <TableCell>Дата рождения</TableCell>
                    <TableCell>Срок действия</TableCell>
                    <TableCell>Смена №</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{`${row.lastName} ${row.firstName}`}</TableCell>
                    <TableCell>{row.bthDate.match(/\d{4}-\d{2}-\d{2}/gm)}</TableCell>
                    <TableCell>{row.expiryDate.match(/\d{4}-\d{2}-\d{2}/gm)}</TableCell>
                    <TableCell>{row.divisionNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
