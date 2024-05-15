import React from 'react';
import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker, DatesProvider } from '@mantine/dates';
import { ExistedNote } from '../../types/MesTypes';
import NoteContactsInfo from '../NoteContactsInfo/NoteContactsInfo.container';
import classes from './ExistedNoteModal.module.scss';

interface ExistedNoteModalComponentProps {
  noteModalOpened: boolean;
  formState: ExistedNote;
  streetsBySearch: string[];
  isEditModal: boolean;
  noteDate: Date | undefined;
  newStreet: string;
  handleNewStreetChange: (value: string) => void;
  handleTextAreaChange: (value: string) => void;
  handleStreetChange: (value: string | null, index: number) => void;
  handleEntranceChange: (value: string, index: number) => void;
  handleHouseNumberChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleClose: () => void;
  handleAddButtonClick: () => void;
  handleDeleteButtonClick: (id: number) => void;
  handleNoteDateChange: (value: Date | null) => void;
  handleAddStreet: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ExistedNoteModalComponent(props: ExistedNoteModalComponentProps) {
  const {
    noteModalOpened,
    formState,
    streetsBySearch,
    isEditModal,
    noteDate,
    newStreet,
    handleNewStreetChange,
    handleTextAreaChange,
    handleStreetChange,
    handleEntranceChange,
    handleHouseNumberChange,
    handleTelChange,
    handleClose,
    handleAddButtonClick,
    handleDeleteButtonClick,
    handleNoteDateChange,
    onSubmit,
    handleAddStreet,
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
            <Group wrap="nowrap">
              {!isEditModal && (
                <DatesProvider
                  settings={{
                    locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
                  }}
                >
                  <DateTimePicker
                    label="Дата принятие заявки"
                    placeholder="Выберите дату"
                    value={noteDate}
                    onChange={(value: Date | null) => handleNoteDateChange(value)}
                    clearable
                    w="50%"
                  />
                </DatesProvider>
              )}
            </Group>

            {renderTextArea}

            <NoteContactsInfo
              noteContactsInfo={formState.noteContactsInfo}
              streetsBySearch={streetsBySearch}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEntranceChange={handleEntranceChange}
              handleHouseNumberChange={handleHouseNumberChange}
              handleStreetChange={handleStreetChange}
              handleTelChange={handleTelChange}
            />

            <Flex justify="space-between">
              <Group wrap="nowrap" align="flex-end" w="60%">
                <TextInput
                  label="Добавить новую улицу"
                  value={newStreet}
                  onChange={(event) => handleNewStreetChange(event.currentTarget.value)}
                  style={{ flexGrow: 1 }}
                />
                <Button
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                  onClick={handleAddStreet}
                >
                  Добавить
                </Button>
              </Group>

              <Flex gap="2%" justify="end" align="flex-end" style={{ flexGrow: 1 }}>
                <Button
                  onClick={handleClose}
                  variant="outline"
                >
                  Отмена
                </Button>
                <Button
                  disabled={formState.noteContactsInfo.filter((el) => el.street !== '').length === 0}
                  type="submit"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                >
                  Сохранить
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}
