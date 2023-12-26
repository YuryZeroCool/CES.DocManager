import React from 'react';
import {
  ActionIcon,
  Button,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Stack,
  Tabs,
  TextInput,
  rem,
  useCombobox,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import {
  IconNote,
  IconNoteOff,
  IconComet,
  IconSearch,
  IconClipboardList,
  IconCalendar,
} from '@tabler/icons-react';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import Pagination from '../../components/Pagination/Pagination.container';
import NotesWithoutActsTableContainer from '../../components/NotesWithoutActsTable/NotesWithoutActsTable.container';
import ActsListTable from '../../components/ActsListTable/ActsListTable.container';
import {
  Act,
  ActDataFromFileResponse,
  ActTypesFromFileResponse,
  ActsList,
} from '../../types/MesTypes';
import classes from './MesPage.module.scss';

interface Props {
  mesError: string;
  mesPageType: string;
  search: string;
  page: number;
  totalPage: number;
  selectedNotesId: number[];
  actTypesFromFile: ActTypesFromFileResponse[];
  actTypeSelectValue: string;
  actDataFromFile: ActDataFromFileResponse;
  currentActData: Act;
  type: string;
  addActModalOpened: boolean;
  editActModalOpened: boolean;
  addOrganizationModalOpened: boolean;
  editOrganizationModalOpened: boolean;
  actsList: ActsList[];
  actsListPage: number;
  totalActsListPages: number;
  minActDate: Date;
  maxActDate: Date;
  requestStatus: string;

  editOrganizationModalOpen: () => void;
  editOrganizationModalClose: () => void;
  addActModalClose: () => void;
  editActModalOpen: () => void;
  editActModalClose: () => void;
  addOrganizationModalClose: () => void;
  handleAddActBtnClick: (value: string) => void;
  handleAddOrganizationBtnClick: () => void;
  handleChangeMesPageType: (value: string) => void;
  handleChangeErrorMessage: (value: string) => void;
  handleSearchChange: (value: string) => void;
  handleSearchButtonClick: () => void;
  handleCurrentPageChange: (value: number) => void;
  handleSelectNote: (newValue: number[]) => void;
  handleActTypeSelectChange: (value: string) => void;
  resetCurrentActData: () => void;
  changeType: (value: string) => void;
  handleCurrentActsListPageChange: (value: number) => void;
  handleMinActDateChange: (value: Date | null) => void;
  handleMaxActDateChange: (value: Date | null) => void;
  handleGetActsListBtnClick: () => void;
  setMesError: React.Dispatch<React.SetStateAction<string>>;
}

export default function MesPageComponent(props: Props) {
  const {
    mesError,
    mesPageType,
    search,
    page,
    totalPage,
    selectedNotesId,
    actTypesFromFile,
    actTypeSelectValue,
    actDataFromFile,
    currentActData,
    type,
    addActModalOpened,
    editActModalOpened,
    addOrganizationModalOpened,
    editOrganizationModalOpened,
    actsList,
    actsListPage,
    totalActsListPages,
    minActDate,
    maxActDate,
    requestStatus,

    editOrganizationModalOpen,
    editOrganizationModalClose,
    addActModalClose,
    editActModalOpen,
    editActModalClose,
    addOrganizationModalClose,
    handleAddActBtnClick,
    handleAddOrganizationBtnClick,
    handleChangeMesPageType,
    handleChangeErrorMessage,
    handleSearchChange,
    handleSearchButtonClick,
    handleCurrentPageChange,
    handleSelectNote,
    handleActTypeSelectChange,
    resetCurrentActData,
    changeType,
    handleCurrentActsListPageChange,
    handleMinActDateChange,
    handleMaxActDateChange,
    handleGetActsListBtnClick,
    setMesError,
  } = props;

  const iconStyle = { width: rem(20), height: rem(20) };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = actTypesFromFile.map((item) => (
    <Combobox.Option value={`${item.actType} (${item.season.toLocaleLowerCase()})`} key={item.fileName}>
      {item.actType}
      &nbsp;
      {`(${item.season.toLocaleLowerCase()})`}
    </Combobox.Option>
  ));

  const renderMesPageNavigation = () => (
    <Flex h={50} gap={10} pl={10} align="center">
      <Tabs
        value={mesPageType}
        onChange={(value) => handleChangeMesPageType(value ?? '')}
        classNames={{
          tabLabel: classes.tabLabel,
          tab: classes.tab,
        }}
        w="100%"
      >
        <Tabs.List>
          <Tabs.Tab value="Заявки" leftSection={<IconNote style={iconStyle} />}>
            Заявки
          </Tabs.Tab>
          <Tabs.Tab value="Организации" leftSection={<IconComet style={iconStyle} />}>
            Организации
          </Tabs.Tab>
          <Tabs.Tab value="Заявки без актов" leftSection={<IconNoteOff style={iconStyle} />}>
            Заявки без актов
          </Tabs.Tab>
          <Tabs.Tab value="История актов" leftSection={<IconClipboardList style={iconStyle} />}>
            История актов
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Flex>
  );

  const renderActTypesSelect = () => (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        handleActTypeSelectChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          styles={{
            root: { minWidth: 250 },
          }}
        >
          {actTypeSelectValue || <Input.Placeholder>Выберите тип акта</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );

  const renderActsButtons = () => (
    actDataFromFile.act.length !== 0 && actDataFromFile.act.map((act) => (
      <Button
        variant="gradient"
        gradient={{ from: 'violet', to: 'blue', deg: 90 }}
        onClick={() => handleAddActBtnClick(act.type)}
      >
        {act.type}
      </Button>
    ))
  );

  const renderActsListHeader = () => (
    <Group w="100%" align="end">
      <Group w={400}>
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'UTC',
          }}
        >
          <DatePickerInput
            leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
            label="От"
            placeholder="От"
            value={minActDate}
            onChange={(value: Date | null) => {
              handleMinActDateChange(value);
            }}
            classNames={{
              day: classes.day,
            }}
            w="100%"
            clearable
            leftSectionPointerEvents="none"
            maxDate={new Date()}
          />
        </DatesProvider>
      </Group>

      <Group w={400}>
        <DatesProvider
          settings={{
            locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'UTC',
          }}
        >
          <DatePickerInput
            leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
            label="До"
            placeholder="До"
            value={maxActDate}
            onChange={(value: Date | null) => {
              handleMaxActDateChange(value);
            }}
            classNames={{
              day: classes.day,
            }}
            w="100%"
            clearable
            leftSectionPointerEvents="none"
            maxDate={new Date()}
          />
        </DatesProvider>
      </Group>

      <Button
        variant="gradient"
        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
        onClick={handleGetActsListBtnClick}
      >
        Получить акты
      </Button>
    </Group>
  );

  const renderTableHeader = () => (
    <Flex align="center" gap={15} h="9vh">
      {mesPageType === 'Организации' && (
        <>
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            onClick={handleAddOrganizationBtnClick}
          >
            Добавить организацию
          </Button>
          <TextInput
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Поиск организации"
            w={500}
          />
          <ActionIcon variant="transparent" onClick={handleSearchButtonClick}>
            <IconSearch />
          </ActionIcon>
        </>
      )}

      {mesPageType === 'Заявки без актов' && (
        <>
          {renderActTypesSelect()}
          {renderActsButtons()}
        </>
      )}

      {mesPageType === 'История актов' && renderActsListHeader()}
    </Flex>
  );

  const renderNotesTable = () => (
    <NotesTable
      mesError={mesError}
      handleChangeErrorMessage={handleChangeErrorMessage}
    />
  );

  const renderOrganizationsTable = () => (
    <OrganizationsTable
      mesError={mesError}
      editOrganizationModalOpen={editOrganizationModalOpen}
      handleChangeErrorMessage={handleChangeErrorMessage}
    />
  );

  const renderPagination = () => (
    <Pagination
      page={page}
      totalPage={totalPage}
      handleCurrentPageChange={handleCurrentPageChange}
    />
  );

  const renderActsListTable = () => (
    <ActsListTable
      mesError={mesError}
      actsList={actsList}
      requestStatus={requestStatus}
      setMesError={setMesError}
      editActModalOpen={editActModalOpen}
    />
  );

  const renderActsListPagination = () => (
    <Pagination
      page={actsListPage}
      totalPage={totalActsListPages}
      handleCurrentPageChange={handleCurrentActsListPageChange}
    />
  );

  const renderNotesWithoutActsTable = () => (
    <NotesWithoutActsTableContainer
      mesError={mesError}
      selectedNotesId={selectedNotesId}
      handleSelectNote={handleSelectNote}
    />
  );

  return (
    <Stack className={classes.mesPageSection}>
      {renderMesPageNavigation()}
      {mesPageType !== 'Заявки' && renderTableHeader()}
      {mesPageType === 'Заявки' && renderNotesTable()}
      {mesPageType === 'Организации' && renderOrganizationsTable()}
      {mesPageType === 'Организации' && renderPagination()}
      {mesPageType === 'Заявки без актов' && renderNotesWithoutActsTable()}
      {mesPageType === 'История актов' && renderActsListTable()}
      {mesPageType === 'История актов' && renderActsListPagination()}
      <AddActModal
        selectedNotesId={selectedNotesId}
        currentActData={currentActData}
        type={type}
        addActModalOpened={addActModalOpened}
        editActModalOpened={editActModalOpened}
        addActModalClose={addActModalClose}
        editActModalClose={editActModalClose}
        resetCurrentActData={resetCurrentActData}
        changeType={changeType}
      />
      <AddOrganizationModal
        addOrganizationModalOpened={addOrganizationModalOpened}
        editOrganizationModalOpened={editOrganizationModalOpened}
        editOrganizationModalClose={editOrganizationModalClose}
        addOrganizationModalClose={addOrganizationModalClose}
      />
    </Stack>
  );
}
