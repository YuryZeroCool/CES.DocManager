import React from 'react';
import { ContactInfo, IFullNoteData } from '../../types/MesTypes';
import NoteContactsInfoComponent from './NoteContactsInfo.component';

interface NoteContactsInfoContainerProps {
  noteContactsInfo: ContactInfo[] | IFullNoteData[];
  streetsBySearch: string[];
  handleStreetChange: (value: string | null, index: number) => void;
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
    handleStreetChange,
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
      handleStreetChange={handleStreetChange}
      handleHouseNumberChange={handleHouseNumberChange}
      handleEntranceChange={handleEntranceChange}
      handleTelChange={handleTelChange}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleAddButtonClick={handleAddButtonClick}
    />
  );
}

export default NoteContactsInfoContainer;
