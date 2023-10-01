import React from 'react';
import {
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Act } from '../../types/MesTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: 'relative',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.active': {
    backgroundColor: '#007bff',
  },
}));

interface Props {
  currentActData: Act;
  totalActSumm: number;
  vat: number;
  handleInputNumberChange: (workName: string, value: string) => void;
}

export default function AddActTableComponent(props: Props) {
  const {
    currentActData,
    totalActSumm,
    vat,
    handleInputNumberChange,
  } = props;

  return (
    <div className="material-table">
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Наименование работ</StyledTableCell>
                <StyledTableCell align="left">Един. изм.</StyledTableCell>
                <StyledTableCell align="left">Кол-во</StyledTableCell>
                <StyledTableCell align="left">Отпускная цена, руб (с НДС)</StyledTableCell>
                <StyledTableCell align="left">Всего к оплате, руб.</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentActData.works.map((work) => (
                <StyledTableRow key={work.name}>
                  <StyledTableCell align="left">{work.name}</StyledTableCell>
                  <StyledTableCell align="left">{work.unit}</StyledTableCell>
                  <StyledTableCell align="left">
                    <TextField
                      onChange={(e) => handleInputNumberChange(work.name, e.target.value)}
                      label=""
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{work.price}</StyledTableCell>
                  <StyledTableCell align="left">{work.totalSumm}</StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={4}>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h6" component="h6" sx={{ fontWeight: '600' }}>
                      Итого
                      &nbsp;
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '16px' }}>
                      к оплате
                      &nbsp;
                    </Typography>
                    {currentActData.type === 'Для жилых помещений' && (
                      <Typography variant="h6" sx={{ fontSize: '16px' }}>
                        (Без учета НДС)
                      </Typography>
                    )}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="left">{totalActSumm}</StyledTableCell>
              </StyledTableRow>
              {currentActData.type !== 'Для жилых помещений' && (
                <>
                  <StyledTableCell align="left" colSpan={4}>
                    <Typography variant="h6" sx={{ fontSize: '14px', fontStyle: 'italic' }}>
                      В том числе НДС
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">{vat}</StyledTableCell>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
