import React from 'react';
import Button from '@mui/material/Button';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import './MesPage.style.scss';

interface Props {
  isAddActModalOpen: boolean;
  isEditNoteModalOpen: boolean;
  mesError: string;
  handleClick: () => void;
}

export default function MesPageComponent(props: Props) {
  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    mesError,
    handleClick,
  } = props;

  const renderNotesTable = () => (
    <NotesTable mesError={mesError} />
  );

  return (
    <section className="mes-page-section">
      <Button variant="contained" onClick={handleClick}>Добавить акт</Button>
      {renderNotesTable()}
      {isAddActModalOpen && <AddActModal />}
      {isEditNoteModalOpen && <EditNoteModal />}
    </section>
  );
}
