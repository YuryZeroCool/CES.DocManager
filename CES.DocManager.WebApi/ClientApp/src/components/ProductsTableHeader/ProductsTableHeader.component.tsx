import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './ProductsTableHeader.style.scss';

interface Props {
  type: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export default function ProductsTableHeaderComponent(props: Props) {
  const { type, handleChange } = props;

  return (
    <div className="table-header">
      <div className="table-header-wrapper">
        <Button sx={{ m: 1, minWidth: 120 }} variant="contained" size="small">Добавить</Button>
        <Box sx={{ m: 1, minWidth: 140 }}>
          <FormControl fullWidth size="small">
            <Select
              value={type}
              onChange={handleChange}
            >
              <MenuItem value="Свободные">Свободные</MenuItem>
              <MenuItem value="Прикрепленные">Прикрепленные</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="table-header-wrapper">
        <IconButton aria-label="delete">
          <SearchIcon />
        </IconButton>
        <Box sx={{ minWidth: 300 }}>
          <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />
        </Box>
      </div>
    </div>
  );
}
