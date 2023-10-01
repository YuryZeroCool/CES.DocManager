import React from 'react';
import {
  TextField,
  Button,
  IconButton,
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import Pagination from '../../components/Pagination/Pagination.container';
import NotesWithoutActsTableContainer from '../../components/NotesWithoutActsTable/NotesWithoutActsTable.container';
import { Act, ActDataFromFileResponse, ActTypesFromFileResponse } from '../../types/MesTypes';
import './MesPage.style.scss';

interface Props {
  isAddActModalOpen: boolean;
  isEditNoteModalOpen: boolean;
  isAddOrganizationModalOpen: boolean;
  isEditOrganizationModalOpen: boolean;
  mesError: string;
  mesPageType: string;
  search: string;
  page: number;
  totalPage: number;
  selectedNotesId: number[];
  actTypesFromFile: ActTypesFromFileResponse[];
  actTypeSelectValue: string;
  actDataFromFile: ActDataFromFileResponse;
  currentActData: Act;
  type: string;

  handleAddActBtnClick: (value: string) => void;
  handleAddOrganizationBtnClick: () => void;
  handleChangeMesPageType: (value: string) => void;
  handleChangeErrorMessage: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleSearchButtonClick: () => void;
  handleCurrentPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleSelectNote: (newValue: number[]) => void;
  handleActTypeSelectChange: (value: string) => void;
  resetCurrentActData: () => void;
  changeType: (value: string) => void;
}

export default function MesPageComponent(props: Props) {
  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
    mesError,
    mesPageType,
    search,
    page,
    totalPage,
    selectedNotesId,
    actTypesFromFile,
    actTypeSelectValue,
    actDataFromFile,
    currentActData,
    type,

    handleAddActBtnClick,
    handleAddOrganizationBtnClick,
    handleChangeMesPageType,
    handleChangeErrorMessage,
    handleSearchChange,
    handleSearchButtonClick,
    handleCurrentPageChange,
    handleSelectNote,
    handleActTypeSelectChange,
    resetCurrentActData,
    changeType,
  } = props;

  const renderMesPageNavigation = () => (
    <div className="report-page-navigation">
      <Button
        sx={{ margin: '0 8px', minWidth: 120, height: '30px' }}
        variant="contained"
        size="small"
        onClick={() => handleChangeMesPageType('Заявки')}
      >
        Заявки
      </Button>
      <Button
        sx={{ margin: '0 8px', minWidth: 120, height: '30px' }}
        variant="contained"
        size="small"
        onClick={() => handleChangeMesPageType('Организации')}
      >
        Организации
      </Button>
      <Button
        sx={{ margin: '0 8px', minWidth: 120, height: '30px' }}
        variant="contained"
        size="small"
        onClick={() => handleChangeMesPageType('Заявки без актов')}
      >
        Заявки без актов
      </Button>
    </div>
  );

  const renderActTypesSelect = () => (
    <Box sx={{ m: 1, minWidth: 240 }}>
      <FormControl fullWidth size="small">
        <Select
          value={actTypeSelectValue}
          onChange={(event) => handleActTypeSelectChange(event.target.value)}
          className="table-header-select"
        >
          {actTypesFromFile.map((el) => (
            <MenuItem key={el.fileName} value={`${el.actType} (${el.season.toLocaleLowerCase()})`}>
              {el.actType}
              &nbsp;
              {`(${el.season.toLocaleLowerCase()})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderActsButtons = () => (
    actDataFromFile.act.length !== 0 && actDataFromFile.act.map((act) => (
      <Button variant="contained" onClick={() => handleAddActBtnClick(act.type)} key={act.type}>
        {act.type}
      </Button>
    ))
  );

  const renderTableHeader = () => (
    <div className="table-header">
      <div className="table-header-wrapper">
        {mesPageType === 'Организации' && (
          <>
            <Button variant="contained" onClick={handleAddOrganizationBtnClick}>
              Добавить организацию
            </Button>
            <TextField
              id="outlined-basic"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              label="Поиск"
              variant="outlined"
              size="small"
              sx={{ width: '500px' }}
            />
            <IconButton aria-label="search" className="icon-search" onClick={handleSearchButtonClick}>
              <SearchIcon />
            </IconButton>
          </>
        )}
        {mesPageType === 'Заявки без актов' && (
          <>
            {renderActTypesSelect()}
            {renderActsButtons()}
          </>
        )}
      </div>
    </div>
  );

  const renderNotesTable = () => (
    <NotesTable
      mesError={mesError}
      handleChangeErrorMessage={handleChangeErrorMessage}
    />
  );

  const renderOrganizationsTable = () => (
    <OrganizationsTable
      mesError={mesError}
      handleChangeErrorMessage={handleChangeErrorMessage}
    />
  );

  const renderPagination = () => (
    <Pagination
      page={page}
      totalPage={totalPage}
      handleCurrentPageChange={handleCurrentPageChange}
    />
  );

  const renderNotesWithoutActsTable = () => (
    <NotesWithoutActsTableContainer
      mesError={mesError}
      selectedNotesId={selectedNotesId}
      handleChangeErrorMessage={handleChangeErrorMessage}
      handleSelectNote={handleSelectNote}
    />
  );

  return (
    <section className="mes-page-section">
      {renderMesPageNavigation()}
      {renderTableHeader()}
      {mesPageType === 'Заявки' && renderNotesTable()}
      {mesPageType === 'Организации' && renderOrganizationsTable()}
      {mesPageType === 'Организации' && renderPagination()}
      {mesPageType === 'Заявки без актов' && renderNotesWithoutActsTable()}
      {isAddActModalOpen && (
        <AddActModal
          selectedNotesId={selectedNotesId}
          currentActData={currentActData}
          type={type}
          resetCurrentActData={resetCurrentActData}
          changeType={changeType}
        />
      )}
      {isEditNoteModalOpen && <EditNoteModal />}
      {(isAddOrganizationModalOpen || isEditOrganizationModalOpen) && <AddOrganizationModal />}
    </section>
  );
}
