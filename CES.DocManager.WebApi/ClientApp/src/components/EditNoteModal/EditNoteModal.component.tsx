import React from 'react';
import {
  Button,
  Flex,
  Modal,
  Stack,
  Textarea,
} from '@mantine/core';
import { EditNoteRequest } from '../../types/MesTypes';
import NoteContactsInfo from '../NoteContactsInfo/NoteContactsInfo.container';
import classes from './EditNoteModal.module.scss';

interface Props {
  noteModalOpened: boolean;
  formState: EditNoteRequest;
  streetsBySearch: string[];
  isEditModal: boolean;
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
    noteModalOpened,
    formState,
    streetsBySearch,
    isEditModal,
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

  return (
    <Modal
      opened={noteModalOpened}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title={isEditModal ? 'Отредактировать заявку' : 'Добавить заявку'}
      size="xl"
      classNames={{
        title: classes.modalTitle,
      }}
    >
      <Stack>
        <form onSubmit={(event) => onSubmit(event)}>
          <Stack gap={15}>
            {renderTextArea}
            <NoteContactsInfo
              noteContactsInfo={formState.noteContactsInfo}
              streetsBySearch={streetsBySearch}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEntranceChange={handleEntranceChange}
              handleHouseNumberChange={handleHouseNumberChange}
              handleStreetSearchChange={handleStreetSearchChange}
              handleTelChange={handleTelChange}
            />
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
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
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
