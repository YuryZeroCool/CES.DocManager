import React from 'react';
import {
  ActionIcon,
  Button,
  Combobox,
  Flex,
  Input,
  InputBase,
  Stack,
  Tabs,
  TextInput,
  rem,
  useCombobox,
} from '@mantine/core';
import {
  IconNote,
  IconNoteOff,
  IconComet,
  IconSearch,
} from '@tabler/icons-react';
import AddActModal from '../../components/AddActModal/AddActModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import Pagination from '../../components/Pagination/Pagination.container';
import NotesWithoutActsTableContainer from '../../components/NotesWithoutActsTable/NotesWithoutActsTable.container';
import { Act, ActDataFromFileResponse, ActTypesFromFileResponse } from '../../types/MesTypes';
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
  addOrganizationModalOpened: boolean;
  editOrganizationModalOpened: boolean;

  editOrganizationModalOpen: () => void;
  editOrganizationModalClose: () => void;
  addActModalClose: () => void;
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
    addOrganizationModalOpened,
    editOrganizationModalOpened,

    editOrganizationModalOpen,
    editOrganizationModalClose,
    addActModalClose,
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
      <AddActModal
        selectedNotesId={selectedNotesId}
        currentActData={currentActData}
        type={type}
        addActModalOpened={addActModalOpened}
        addActModalClose={addActModalClose}
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
