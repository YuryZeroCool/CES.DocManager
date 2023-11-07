import React from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { EditNoteRequest } from '../../types/MesTypes';
import classes from './EditNoteModal.module.scss';

interface Props {
  editNoteModalOpened: boolean;
  formState: EditNoteRequest;
  streetsBySearch: string[];
  handleTextAreaChange: (value: string) => void;
  handleStreetSearchChange: (value: string, index: number) => void;
  handleEntranceChange: (value: string, index: number) => void;
  handleHouseNumberChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleClose: () => void;
  handleAddButtonClick: () => void;
  handleDeleteButtonClick: (id: number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditNoteModalComponent(props: Props) {
  const {
    editNoteModalOpened,
    formState,
    streetsBySearch,
    handleTextAreaChange,
    handleStreetSearchChange,
    handleEntranceChange,
    handleHouseNumberChange,
    handleTelChange,
    handleClose,
    handleAddButtonClick,
    handleDeleteButtonClick,
    onSubmit,
  } = props;

  const renderTextArea = (
    <Textarea
      value={formState.comment}
      autosize
      minRows={2}
      onChange={(event) => handleTextAreaChange(event.target.value)}
    />
  );

  const renderNoteContactsInfo = (
    formState.noteContactsInfo.map((el, index) => (
      <Flex key={el.id} align="start" gap="2%" p={10} style={{ borderBottom: '1px solid gray' }}>
        <Stack gap={10}>
          <Flex gap={10}>
            <Select
              classNames={{
                dropdown: classes.selectDropdown,
              }}
              w={380}
              label="Улица"
              placeholder="Введите значение"
              data={streetsBySearch}
              searchable
              onSearchChange={(value) => handleStreetSearchChange(value, index)}
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
              w="40%"
              value={el.tel}
              onChange={(event) => handleTelChange(event.target.value, index)}
            />
          </Flex>
        </Stack>

        <ActionIcon
          disabled={formState.noteContactsInfo.length === 1}
          onClick={() => handleDeleteButtonClick(el.id)}
        >
          <IconTrash style={{ width: '20px', height: '20px' }} />
        </ActionIcon>
        {index === formState.noteContactsInfo.length - 1 && (
          <ActionIcon
            onClick={handleAddButtonClick}
          >
            <IconPlus style={{ width: '20px', height: '20px' }} />
          </ActionIcon>
        )}
      </Flex>
    ))
  );

  return (
    <Modal
      opened={editNoteModalOpened}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title="Отредактируйте заявку"
      size="xl"
    >
      <Stack>
        <form onSubmit={(event) => onSubmit(event)}>
          <Stack gap={15}>
            {renderTextArea}
            {renderNoteContactsInfo}
            <Flex gap="2%" mt={20} justify="end">
              <Button
                className="modal-button"
                onClick={handleClose}
                variant="outline"
              >
                Отмена
              </Button>
              <Button
                disabled={formState.noteContactsInfo.filter((el) => el.street !== '').length === 0}
                className="modal-button"
                type="submit"
              >
                Сохранить
              </Button>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}
