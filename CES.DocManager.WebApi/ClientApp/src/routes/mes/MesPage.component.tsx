import Button from '@mui/material/Button';
import React from 'react';
import AddActModal from '../../components/AddActModal/AddActModal.container';

interface Props {
  handleClick: () => void;
  isAddActModalOpen: boolean;
}

export default function MesPageComponent(props: Props) {
  const { handleClick, isAddActModalOpen } = props;

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>Добавить акт</Button>
      {isAddActModalOpen && <AddActModal />}
    </div>
  );
}
