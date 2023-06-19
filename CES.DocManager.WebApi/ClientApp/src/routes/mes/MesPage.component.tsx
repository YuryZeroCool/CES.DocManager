import React from 'react';
import Button from '@mui/material/Button';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import { INote } from '../../types/MesTypes';

interface Props {
  isAddActModalOpen: boolean;
  allNotes: INote[];
  handleClick: () => void;
}

export default function MesPageComponent(props: Props) {
  const {
    isAddActModalOpen,
    allNotes,
    handleClick,
  } = props;

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>Добавить акт</Button>
      {isAddActModalOpen && <AddActModal />}
    </div>
  );
}
