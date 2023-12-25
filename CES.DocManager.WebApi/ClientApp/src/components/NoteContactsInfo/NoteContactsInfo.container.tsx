import React from 'react';
import { ContactInfo, IFullNoteData } from '../../types/MesTypes';
import NoteContactsInfoComponent from './NoteContactsInfo.component';

interface NoteContactsInfoContainerProps {
  noteContactsInfo: ContactInfo[] | IFullNoteData[];
  streetsBySearch: string[];
  handleStreetSearchChange: (value: string, index: number) => void;
  handleHouseNumberChange: (value: string, index: number) => void;
  handleEntranceChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleDeleteButtonClick: (id: number) => void;
  handleAddButtonClick: () => void;
}

function NoteContactsInfoContainer(props: NoteContactsInfoContainerProps) {
  const {
    noteContactsInfo,
    streetsBySearch,
    handleStreetSearchChange,
    handleHouseNumberChange,
    handleEntranceChange,
    handleTelChange,
    handleDeleteButtonClick,
    handleAddButtonClick,
  } = props;

  return (
    <NoteContactsInfoComponent
      noteContactsInfo={noteContactsInfo}
      streetsBySearch={streetsBySearch}
      handleStreetSearchChange={handleStreetSearchChange}
      handleHouseNumberChange={handleHouseNumberChange}
      handleEntranceChange={handleEntranceChange}
      handleTelChange={handleTelChange}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleAddButtonClick={handleAddButtonClick}
    />
  );
}

export default NoteContactsInfoContainer;
