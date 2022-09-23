import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { IExpiringDocuments } from '../../types/HomeTypes';
import Row from './Row';

function SortArray(x: IExpiringDocuments, y: IExpiringDocuments) {
  if (x.divisionNumber < y.divisionNumber) { return -1; }
  if (x.divisionNumber > y.divisionNumber) { return 1; }
  return 0;
}

interface Props {
  data: IExpiringDocuments[];
  name: string;
}

export default function ExpiringDocumentsTable(props: Props) {
  const { data, name } = props;
  const arr = [...data];

  if (arr.length > 1) {
    arr.sort(SortArray);
  }

  return (
    <TableContainer component={Paper} className="driver-license-table">
      <Typography align="center" sx={{ margin: 1, color: 'blue' }} variant="h6" gutterBottom component="div">
        {name}
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ФИО</TableCell>
            <TableCell>Смена №</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arr.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
