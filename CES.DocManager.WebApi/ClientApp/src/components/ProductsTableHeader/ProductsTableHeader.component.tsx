import React, { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import './ProductsTableHeader.style.scss';
import { ISearch } from '../../types/ReportTypes';

interface Props {
  materialsTableType: string;
  pageType: string;
  fileName: string;
  searchValue: ISearch;
  handleChange: (event: SelectChangeEvent) => void;
  handleClick: () => void;
  handleInputFileChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSearchValueChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProductsTableHeaderComponent(props: Props) {
  const {
    materialsTableType,
    pageType,
    fileName,
    searchValue,
    handleChange,
    handleClick,
    handleInputFileChange,
    handleSubmit,
    handleSearchValueChange,
  } = props;

  const renderUploadFileForm = () => (
    pageType === 'Материалы' && materialsTableType === 'Свободные' && (
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      <form name="test" encType="multipart/form-data" onSubmit={(event) => handleSubmit(event)}>
        <Button sx={{ minWidth: 120, height: 40 }} variant="contained" size="small" component="label">
          {fileName || 'Добавить'}
          <input hidden onChange={handleInputFileChange} accept=".xls" type="file" name="uploadedFile" />
        </Button>
        {fileName !== '' && (
          <IconButton aria-label="upload" sx={{ width: '40px', height: '40px', padding: 0 }} type="submit">
            <UploadIcon />
          </IconButton>
        )}
      </form>
    )
  );

  const renderSearchMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      value={searchValue.materialsSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  const renderSearchAttachedMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      value={searchValue.attachedMaterialsSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  const renderSearchDecommissionedMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      value={searchValue.decommissionedMaterialsSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  return (
    <div className="table-header">
      <div className="table-header-wrapper">
        {renderUploadFileForm()}
        {pageType === 'Материалы' && (
          <Box sx={{ m: 1, minWidth: 140 }}>
            <FormControl fullWidth size="small">
              <Select
                value={materialsTableType}
                onChange={handleChange}
                className="table-header-select"
              >
                <MenuItem value="Свободные">Свободные</MenuItem>
                <MenuItem value="Прикрепленные">Прикрепленные</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {pageType === 'Материалы' && materialsTableType === 'Прикрепленные'
        && <Button sx={{ m: 1, minWidth: 120 }} variant="contained" size="small" onClick={handleClick}>Добавить ремонт</Button>}
      </div>
      <div className="table-header-wrapper">
        <IconButton aria-label="search" className="icon-search">
          <SearchIcon />
        </IconButton>
        <Box sx={{ minWidth: 300 }}>
          {pageType === 'Материалы' && materialsTableType === 'Свободные' && renderSearchMaterials()}
          {pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && renderSearchAttachedMaterials()}
          {pageType === 'История ремонтов' && renderSearchDecommissionedMaterials()}
        </Box>
      </div>
    </div>
  );
}
