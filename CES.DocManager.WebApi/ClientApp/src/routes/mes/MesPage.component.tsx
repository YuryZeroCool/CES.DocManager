import React from 'react';
import Button from '@mui/material/Button';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import './MesPage.style.scss';

interface Props {
  isAddActModalOpen: boolean;
  isEditNoteModalOpen: boolean;
  isAddOrganizationModalOpen: boolean;
  isEditOrganizationModalOpen: boolean;
  mesError: string;
  mesPageType: string;
  handleAddActBtnClick: () => void;
  handleAddOrganizationBtnClick: () => void;
  handleChangeMesPageType: (value: string) => void;
  handleChangeErrorMessage: (value: string) => void;
}

export default function MesPageComponent(props: Props) {
  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
    mesError,
    mesPageType,
    handleAddActBtnClick,
    handleAddOrganizationBtnClick,
    handleChangeMesPageType,
    handleChangeErrorMessage,
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
    </div>
  );

  const renderTableHeader = () => (
    <div className="table-header">
      <div className="table-header-wrapper">
        {mesPageType === 'Заявки' && (
          <Button variant="contained" onClick={handleAddActBtnClick}>Добавить акт</Button>
        )}
        {mesPageType === 'Организации' && (
          <Button variant="contained" onClick={handleAddOrganizationBtnClick}>Добавить организацию</Button>
        )}
      </div>
    </div>
  );

  const renderNotesTable = () => (
    <NotesTable mesError={mesError} />
  );

  const renderOrganizationsTable = () => (
    <OrganizationsTable mesError={mesError} handleChangeErrorMessage={handleChangeErrorMessage} />
  );

  return (
    <section className="mes-page-section">
      {renderMesPageNavigation()}
      {renderTableHeader()}
      {mesPageType === 'Заявки' && renderNotesTable()}
      {mesPageType === 'Организации' && renderOrganizationsTable()}
      {isAddActModalOpen && <AddActModal />}
      {isEditNoteModalOpen && <EditNoteModal />}
      {(isAddOrganizationModalOpen || isEditOrganizationModalOpen) && <AddOrganizationModal />}
    </section>
  );
}
