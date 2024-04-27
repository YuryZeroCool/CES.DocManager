import React from 'react';
import {
  ActionIcon,
  Flex,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { ContactInfo, IFullNoteData } from '../../types/MesTypes';

interface NoteContactsInfoComponentProps {
  noteContactsInfo: ContactInfo[] | IFullNoteData[];
  streetsBySearch: string[];
  handleStreetChange: (value: string | null, index: number) => void;
  handleHouseNumberChange: (value: string, index: number) => void;
  handleEntranceChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleDeleteButtonClick: (id: number) => void;
  handleAddButtonClick: () => void;
}

function NoteContactsInfoComponent(props: NoteContactsInfoComponentProps) {
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
    <>
      {noteContactsInfo.map((el, index) => (
        <Flex key={el.id} align="start" gap="2%" py={10} style={{ borderBottom: '1px solid gray' }}>
          <Stack gap={10} style={{ flexGrow: 1 }}>
            <Flex gap={10}>
              <Select
                styles={{ root: { flexGrow: 1 }, dropdown: { zIndex: 1000 } }}
                label="Улица"
                placeholder="Введите значение"
                data={streetsBySearch}
                searchable
                onSearchChange={(value) => handleStreetChange(value, index)}
                onChange={(value) => handleStreetChange(value, index)}
                clearable
                value={el.street}
              />
              <TextInput
                label="Номер дома"
                placeholder="Номер дома"
                w={120}
                value={el.houseNumber}
                onChange={(event) => handleHouseNumberChange(event.target.value, index)}
              />

              <TextInput
                label="Подъезд"
                placeholder="Подъезд"
                w={120}
                value={el.entrance}
                onChange={(event) => handleEntranceChange(event.target.value, index)}
              />
            </Flex>

            <Flex>
              <TextInput
                label="Телефон"
                w="60%"
                value={el.tel}
                onChange={(event) => handleTelChange(event.target.value, index)}
              />
            </Flex>
          </Stack>

          <ActionIcon
            disabled={noteContactsInfo.length === 1}
            onClick={() => handleDeleteButtonClick(el.id)}
          >
            <IconTrash style={{ width: '20px', height: '20px' }} />
          </ActionIcon>

          {index === noteContactsInfo.length - 1 && (
            <ActionIcon
              onClick={handleAddButtonClick}
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
            >
              <IconPlus style={{ width: '20px', height: '20px' }} />
            </ActionIcon>
          )}
        </Flex>
      ))}
    </>
  );
}

export default NoteContactsInfoComponent;
