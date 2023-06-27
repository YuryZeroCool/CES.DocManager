import React from 'react';
import Button from '@mui/material/Button';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import './MesPage.style.scss';

interface Props {
  isAddActModalOpen: boolean;
  isEditNoteModalOpen: boolean;
  isAddOrganizationModalOpen: boolean;
  mesError: string;
  handleAddActBtnClick: () => void;
  handleAddOrganizationBtnClick: () => void;
}

export default function MesPageComponent(props: Props) {
  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
    mesError,
    handleAddActBtnClick,
    handleAddOrganizationBtnClick,
  } = props;

  const renderNotesTable = () => (
    <NotesTable mesError={mesError} />
  );

  return (
    <section className="mes-page-section">
      <Button variant="contained" onClick={handleAddActBtnClick}>Добавить акт</Button>
      <Button variant="contained" onClick={handleAddOrganizationBtnClick}>Добавить организацию</Button>
      {renderNotesTable()}
      {isAddActModalOpen && <AddActModal />}
      {isEditNoteModalOpen && <EditNoteModal />}
      {isAddOrganizationModalOpen && <AddOrganizationModal />}
    </section>
  );
}
