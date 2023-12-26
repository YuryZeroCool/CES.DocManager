import * as React from 'react';
import {
  ComboboxStore,
  Flex,
  Group,
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
import SearchableSelect from '../SearchableSelect/SearchableSelect.container';
import DriverComboBox from '../DriverComboBox/DriverComboBox.container';
import NoteContactsInfo from '../NoteContactsInfo/NoteContactsInfo.container';
import { Act, IFullNoteData } from '../../types/MesTypes';
import classes from './AddActModal.module.scss';

interface Props {
  handleClose: () => void;
  handleOrganizationsInputChange: (value: string) => void;
  handleCarInputChange: (value: string) => void;
  changeCarInputValue: (value: string) => void;
  handleDriverSelectChange: (value: string) => void;
  handleActAdditionDateChange: (value: Date | null) => void;
  handleAddActSubmit: () => void;
  handleStreetSearchChange: (value: string, index: number) => void;
  handleEntranceChange: (value: string, index: number) => void;
  handleHouseNumberChange: (value: string, index: number) => void;
  handleTelChange: (value: string, index: number) => void;
  handleAddButtonClick: () => void;
  handleDeleteButtonClick: (id: number) => void;
  isAddActModalOpen: boolean;
  isEditActModalOpen: boolean;
  allOrganizationsBySearch: string[];
  organization: string;
  currentActData: Act;
  type: string;
  carsByCarNumber: string[];
  car: string;
  combobox: ComboboxStore;
  driverCombobox: ComboboxStore;
  driversByCarNumber: string[];
  driver: string | null;
  actAdditionDate: Date | null;
  modalError: string;
  selectedNotesId: number[];
  selectedNotes: IFullNoteData[];
  streetsBySearch: string[];
}

export default function AddActModalComponent(props: Props) {
  const {
    handleClose,
    handleOrganizationsInputChange,
    handleCarInputChange,
    changeCarInputValue,
    handleDriverSelectChange,
    handleActAdditionDateChange,
    handleAddActSubmit,
    handleStreetSearchChange,
    handleEntranceChange,
    handleHouseNumberChange,
    handleTelChange,
    handleAddButtonClick,
    handleDeleteButtonClick,
    isAddActModalOpen,
    isEditActModalOpen,
    allOrganizationsBySearch,
    organization,
    currentActData,
    type,
    carsByCarNumber,
    car,
    combobox,
    driverCombobox,
    driversByCarNumber,
    driver,
    actAdditionDate,
    modalError,
    selectedNotesId,
    selectedNotes,
    streetsBySearch,
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
          value={organization}
          name="organizationSelect"
        />
        <Flex gap={10}>
          <SearchableSelect
            combobox={combobox}
            searchValue={car}
            carsByCarNumber={carsByCarNumber}
            changeCarInputValue={changeCarInputValue}
            handleCarInputChange={handleCarInputChange}
            width="50%"
          />
          <DriverComboBox
            combobox={driverCombobox}
            drivers={driversByCarNumber}
            driver={driver}
            width="50%"
            changeDriverValue={handleDriverSelectChange}
          />
        </Flex>
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'UTC',
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
        {selectedNotesId.length === 0 && (
          <NoteContactsInfo
            noteContactsInfo={selectedNotes}
            streetsBySearch={streetsBySearch}
            handleAddButtonClick={handleAddButtonClick}
            handleDeleteButtonClick={handleDeleteButtonClick}
            handleEntranceChange={handleEntranceChange}
            handleHouseNumberChange={handleHouseNumberChange}
            handleStreetSearchChange={handleStreetSearchChange}
            handleTelChange={handleTelChange}
          />
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
