import { Button } from '@mui/material';
import React from 'react';
import AddDriverModal from '../../components/AddDriverModal/AddDriverModal.container';

interface Props {
  handleClick: () => void;
  isAddDriverModalOpen: boolean;
}

export default function DriversPageComponent(props: Props) {
  const { handleClick, isAddDriverModalOpen } = props;

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>Добавить водителя</Button>
      {isAddDriverModalOpen && <AddDriverModal />}
    </div>
  );
}
