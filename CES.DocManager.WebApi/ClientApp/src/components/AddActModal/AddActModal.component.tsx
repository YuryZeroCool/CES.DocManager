import * as React from 'react';
import {
  ComboboxStore,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import AddActTable from '../AddActTable/AddActTable.container';
import ModalButtons from '../ModalButtons/ModalButtons.container';
import SearchableSelect from '../SearchableSelect/SearchableSelect.container';
import DriverComboBox from '../DriverComboBox/DriverComboBox.container';
import { Act } from '../../types/MesTypes';
import classes from './AddActModal.module.scss';

interface Props {
  handleClose: () => void;
  handleOrganizationsInputChange: (value: string) => void;
  handleCarInputChange: (value: string) => void;
  changeCarInputValue: (value: string) => void;
  handleDriverSelectChange: (value: string) => void;
  handleActAdditionDateChange: (value: Date | null) => void;
  handleAddActSubmit: () => void;
  isAddActModalOpen: boolean;
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
    isAddActModalOpen,
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
  } = props;

  return (
    <Modal
      opened={isAddActModalOpen}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title="Добавление акта"
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
          disabled={!(organization && driver && car && actAdditionDate)}
        />
      </Stack>
    </Modal>
  );
}
