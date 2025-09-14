import * as React from 'react';
import {
  Checkbox,
  Flex,
  Group,
  List,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import AddActTable from '../AddActTable/AddActTable.container';
import ModalButtons from '../ModalButtons/ModalButtons.container';
import { Act, IFullNoteData } from '../../types/MesTypes';
import classes from './ActModal.module.scss';

interface ActModalProps {
  handleClose: () => void;
  handleOrganizationsInputChange: (value: string | null) => void;
  handleCarInputChange: (value: string | null) => void;
  handleDriverSelectChange: (value: string | null) => void;
  handleActAdditionDateChange: (value: Date | null) => void;
  handleIsSignedChange: (value: boolean) => void;
  handleAddActSubmit: () => void;
  isAddActModalOpen: boolean;
  isEditActModalOpen: boolean;
  allOrganizationsBySearch: string[];
  organization: string;
  currentActData: Act;
  type: string;
  carsByCarNumber: string[];
  car: string;
  driversByCarNumber: string[];
  driver: string | null;
  actAdditionDate: Date | null;
  modalError: string;
  selectedNotesId: number[];
  selectedNotes: IFullNoteData[];
  isSigned: boolean;
}

export default function ActModalComponent(props: ActModalProps) {
  const {
    handleClose,
    handleOrganizationsInputChange,
    handleCarInputChange,
    handleDriverSelectChange,
    handleActAdditionDateChange,
    handleIsSignedChange,
    handleAddActSubmit,
    isAddActModalOpen,
    isEditActModalOpen,
    allOrganizationsBySearch,
    organization,
    currentActData,
    type,
    carsByCarNumber,
    car,
    driversByCarNumber,
    driver,
    actAdditionDate,
    modalError,
    selectedNotesId,
    selectedNotes,
    isSigned,
  } = props;

  const renderTitle = () => (
    <Title size="h6" order={2} className={classes.modalTitle}>
      {isAddActModalOpen && 'Добавление акта'}
      {isEditActModalOpen && 'Редактирование акта'}
    </Title>
  );

  return (
    <Modal
      opened={isAddActModalOpen || isEditActModalOpen}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title={renderTitle()}
      size="xxl"
      classNames={{
        title: classes.modalTitle,
      }}
    >
      <Stack>
        <Select
          classNames={{
            dropdown: classes.selectDropdown,
          }}
          w="100%"
          label="Организация"
          placeholder="Введите значение"
          data={allOrganizationsBySearch}
          searchable
          onSearchChange={(value) => handleOrganizationsInputChange(value)}
          onChange={(value) => handleOrganizationsInputChange(value)}
          clearable
          value={organization}
          name="organizationSelect"
        />
        <Flex gap={10}>
          <Select
            classNames={{
              dropdown: classes.selectDropdown,
            }}
            w="50%"
            label="Машина"
            placeholder="Введите номер машины"
            data={carsByCarNumber}
            searchable
            onSearchChange={(value) => handleCarInputChange(value)}
            onChange={(value) => handleCarInputChange(value)}
            clearable
            value={car}
          />

          <Select
            classNames={{
              dropdown: classes.selectDropdown,
            }}
            w="50%"
            label="Водитель"
            placeholder="Выберите водителя"
            data={driversByCarNumber}
            onChange={(value) => handleDriverSelectChange(value)}
            clearable
            value={driver}
          />
        </Flex>

        <Flex gap={10} align="center">
          <DatesProvider
            settings={{
              locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
            }}
          >
            <DatePickerInput
              leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
              label="Дата добавления акта"
              placeholder="Выберите дату"
              value={actAdditionDate ? new Date(actAdditionDate) : null}
              onChange={(value: Date | null) => {
                handleActAdditionDateChange(value);
              }}
              classNames={{
                day: classes.day,
              }}
              w="50%"
              clearable
              leftSectionPointerEvents="none"
              maxDate={new Date()}
            />
          </DatesProvider>
          <Checkbox
            label="Акт подписан"
            mt={20}
            checked={isSigned}
            onChange={(event) => handleIsSignedChange(event.currentTarget.checked)}
            classNames={{
              input: classes.input,
            }}
          />
        </Flex>

        {selectedNotes.length > 0 && (
          <Stack gap={10}>
            <Text>Заявки:</Text>

            <List size="md">
              {selectedNotes.map((el) => (
                <List.Item>
                  {el.street && (
                    <>
                      {el.street}
                      ,&nbsp;
                    </>
                  )}
                  {el.houseNumber && (
                    <>
                      д.&nbsp;
                      {el.houseNumber}
                    </>
                  )}
                  {el.entrance !== 0 && (
                    <>
                      ,&nbsp;
                      п.&nbsp;
                      {el.entrance}
                    </>
                  )}
                  {el.tel !== '' && (
                    <>
                      ,&nbsp;
                      т.&nbsp;
                      {el.tel}
                    </>
                  )}
                </List.Item>
              ))}
            </List>
          </Stack>
        )}

        {currentActData.works.length !== 0 && (
          <AddActTable currentActData={currentActData} type={type} />
        )}

        {modalError && (
          <Group>
            <Text style={{ fontSize: 18, color: 'red' }}>{modalError}</Text>
          </Group>
        )}

        <ModalButtons
          confirmBtnTitle="Добавить акт"
          cancelBtnTitle="Отменить"
          handleCancel={handleClose}
          handleConfirm={handleAddActSubmit}
          disabled={!(organization && driver && car && actAdditionDate && selectedNotesId.length)}
        />
      </Stack>
    </Modal>
  );
}
