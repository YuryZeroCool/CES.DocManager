import React, { ChangeEvent } from 'react';
// import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UploadIcon from '@mui/icons-material/Upload';
import { RotatingLines } from 'react-loader-spinner';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './ProductsTableHeader.style.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mantine/core';
import { IMaterialAttachedResponse, ISearch } from '../../types/ReportTypes';
import TABLE_TYPES from './ProductsTableHeader.config';
import AddMaterialModal from '../AddMaterialModal';

interface Props {
  materialsTableType: string;
  pageType: string;
  fileName: string;
  searchValue: ISearch;
  isUploadNewMaterialsLoader: boolean;
  uploadMaterialsMessage: string;
  isLoaderModalOpen: boolean;
  uploadFileError: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isCheckedByDate: boolean;
  allAttachedMaterials: IMaterialAttachedResponse[];
  calendarPeriod: Dayjs | null;
  addMaterialModalOpened: boolean;
  handleUsedMaterialsCalendarChange: (value: Dayjs | null) => void;
  handleUsedMaterialsCalendarClose: () => void;
  handleChange: (event: SelectChangeEvent) => void;
  handleChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleInputFileChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSearchValueChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddMaterialButtonClick: () => void;
  addMaterialModalClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',
  padding: '20px 32px',
};

export default function ProductsTableHeaderComponent(props: Props) {
  const {
    materialsTableType,
    pageType,
    fileName,
    searchValue,
    isUploadNewMaterialsLoader,
    uploadMaterialsMessage,
    isLoaderModalOpen,
    uploadFileError,
    fileInputRef,
    isCheckedByDate,
    allAttachedMaterials,
    calendarPeriod,
    addMaterialModalOpened,
    handleUsedMaterialsCalendarChange,
    handleUsedMaterialsCalendarClose,
    handleChange,
    handleChangeCheckbox,
    handleClick,
    handleInputFileChange,
    handleSubmit,
    handleSearchValueChange,
    handleAddMaterialButtonClick,
    addMaterialModalClose,
  } = props;

  const renderUploadFileForm = () => (
    pageType === 'Материалы' && materialsTableType === 'Свободные' && (
      <>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form name="test" encType="multipart/form-data" onSubmit={(event) => handleSubmit(event)}>
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
            miw={120}
            h={40}
            component="label"
          >
            {fileName || 'Загрузить файл'}
            <input ref={fileInputRef} hidden onChange={handleInputFileChange} accept=".xls" type="file" name="uploadedFile" />
          </Button>
          {fileName !== '' && (
            <IconButton aria-label="upload" sx={{ width: '40px', height: '40px', padding: 0 }} type="submit">
              <UploadIcon />
            </IconButton>
          )}
        </form>

        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={handleAddMaterialButtonClick}
        >
          Добавить материал
        </Button>
      </>
    )
  );

  const renderCheckbox = () => (
    pageType === 'Материалы' && materialsTableType === 'Свободные' && (
      <FormControlLabel
        className="checkbox-search-label"
        control={(
          <Checkbox
            checked={isCheckedByDate}
            onChange={handleChangeCheckbox}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        )}
        label="Поиск по дате"
      />
    )
  );

  const renderSearchMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Поиск"
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
      label="Поиск"
      variant="outlined"
      size="small"
      value={searchValue.attachedMaterialsSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  const renderSearchUsedMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Поиск"
      variant="outlined"
      size="small"
      value={searchValue.usedMaterialSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  const renderSearchDecommissionedMaterials = () => (
    <TextField
      id="outlined-basic"
      label="Поиск"
      variant="outlined"
      size="small"
      value={searchValue.decommissionedMaterialsSearchValue}
      className="table-header-search"
      onChange={handleSearchValueChange}
    />
  );

  const renderLoaderModal = () => (
    <Modal
      open={isLoaderModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="loader-message-container">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={isUploadNewMaterialsLoader}
          />
          {uploadMaterialsMessage !== '' && <p className={uploadFileError ? 'error' : ''}>{uploadMaterialsMessage}</p>}
        </div>
      </Box>
    </Modal>
  );

  const renderTableTypesSelect = () => (
    <Box sx={{ m: 1, minWidth: 140 }}>
      <FormControl fullWidth size="small">
        <Select
          value={materialsTableType}
          onChange={handleChange}
          className="table-header-select"
        >
          {TABLE_TYPES.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderAddRepairButton = () => (
    <Button
      miw={120}
      h={40}
      disabled={allAttachedMaterials.length === 0}
      variant="gradient"
      gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
      onClick={handleClick}
    >
      Добавить ремонт
    </Button>
  );

  const renderUsedMaterialsCalendar = () => (
    <FormControl sx={{ width: 250, height: 40 }} size="small">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          views={['month', 'year']}
          label=""
          minDate={dayjs('2010-01-01')}
          maxDate={dayjs()}
          value={calendarPeriod}
          onChange={(newValue) => {
            handleUsedMaterialsCalendarChange(newValue);
          }}
          onClose={() => {
            handleUsedMaterialsCalendarClose();
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} helperText={null} size="small" placeholder="" />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );

  return (
    <div className="table-header">
      <div className="table-header-wrapper">
        {renderUploadFileForm()}
        {pageType === 'Материалы' && renderTableTypesSelect()}
        {pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && renderAddRepairButton()}
        {pageType === 'Материалы' && materialsTableType === 'Списанные' && renderUsedMaterialsCalendar()}
      </div>
      <div className="search-block">
        <div className="table-header-wrapper">
          <IconButton aria-label="search" className="icon-search">
            <SearchIcon />
          </IconButton>
          <Box sx={{ minWidth: 300 }}>
            {pageType === 'Материалы' && materialsTableType === 'Свободные' && renderSearchMaterials()}
            {pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && renderSearchAttachedMaterials()}
            {pageType === 'Материалы' && materialsTableType === 'Списанные' && renderSearchUsedMaterials()}
            {pageType === 'История ремонтов' && renderSearchDecommissionedMaterials()}
          </Box>
        </div>
        {renderCheckbox()}
      </div>
      {renderLoaderModal()}
      {addMaterialModalOpened && (
        <AddMaterialModal
          addMaterialModalOpened={addMaterialModalOpened}
          addMaterialModalClose={addMaterialModalClose}
        />
      )}
    </div>
  );
}
