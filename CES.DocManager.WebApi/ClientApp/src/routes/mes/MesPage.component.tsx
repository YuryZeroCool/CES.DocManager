import React from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Stack,
  Tabs,
  TextInput,
  rem,
} from '@mantine/core';
import {
  IconNote,
  IconNoteOff,
  IconComet,
  IconSearch,
  IconClipboardList,
} from '@tabler/icons-react';
import ActModal from '../../components/ActModal/ActModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import Pagination from '../../components/Pagination';
import ExistedNoteModal from '../../components/ExistedNoteModal/ExistedNoteModal.container';

import {
  Act,
} from '../../types/MesTypes';
import classes from './MesPage.module.scss';
import NotesWithoutActs from './components/NotesWithoutActs';
import ActsHistory from './components/ActsHistory';

interface Props {
  mesError: string;
  mesPageType: string;
  search: string;
  page: number;
  totalPage: number;
  selectedNotesId: number[];
  currentActData: Act;
  type: string;
  addActModalOpened: boolean;
  editActModalOpened: boolean;
  addOrganizationModalOpened: boolean;
  editOrganizationModalOpened: boolean;
  noteModalOpened: boolean;
  isEditModal: boolean;

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
  resetCurrentActData: () => void;
  changeType: (value: string) => void;
  handleAddNoteBtnClick: () => void;
  noteModalOpen: () => void;
  noteModalClose: () => void;
  changeIsEditModal: (value: boolean) => void;
}

export default function MesPageComponent(props: Props) {
  const {
    mesError,
    mesPageType,
    search,
    page,
    totalPage,
    selectedNotesId,
    currentActData,
    type,
    addActModalOpened,
    editActModalOpened,
    addOrganizationModalOpened,
    editOrganizationModalOpened,
    noteModalOpened,
    isEditModal,

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
    resetCurrentActData,
    changeType,
    handleAddNoteBtnClick,
    noteModalOpen,
    noteModalClose,
    changeIsEditModal,
  } = props;

  const iconStyle = { width: rem(20), height: rem(20) };

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

  const renderTableHeader = () => (
    <Flex
      py={20}
      gap={15}
      mih="9vh"
    >
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

      {mesPageType === 'Заявки' && (
        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'blue', deg: 90 }}
          onClick={handleAddNoteBtnClick}
        >
          Добавить заявку
        </Button>
      )}
    </Flex>
  );

  const renderNotesTable = () => (
    <NotesTable
      mesError={mesError}
      noteModalOpen={noteModalOpen}
      changeIsEditModal={changeIsEditModal}
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
      width="100%"
      justify="center"
      totalPage={totalPage}
      handleCurrentPageChange={handleCurrentPageChange}
    />
  );

  return (
    <Stack className={classes.mesPageSection}>
      {renderMesPageNavigation()}
      {mesPageType === 'Заявки без актов' && (
        <NotesWithoutActs
          selectedNotesId={selectedNotesId}
          handleAddActBtnClick={handleAddActBtnClick}
          handleSelectNote={handleSelectNote}
        />
      )}
      {mesPageType === 'История актов' && (
        <ActsHistory
          editActModalOpen={editActModalOpen}
        />
      )}
      {renderTableHeader()}
      {mesPageType === 'Заявки' && renderNotesTable()}
      {mesPageType === 'Организации' && renderOrganizationsTable()}
      {mesPageType === 'Организации' && renderPagination()}
      {(addActModalOpened || editActModalOpened) && (
        <ActModal
          selectedNotesId={selectedNotesId}
          currentActData={currentActData}
          type={type}
          addActModalOpened={addActModalOpened}
          editActModalOpened={editActModalOpened}
          addActModalClose={addActModalClose}
          editActModalClose={editActModalClose}
          resetCurrentActData={resetCurrentActData}
          changeType={changeType}
          handleSelectNote={handleSelectNote}
        />
      )}

      {(addOrganizationModalOpened || editOrganizationModalOpened) && (
        <AddOrganizationModal
          addOrganizationModalOpened={addOrganizationModalOpened}
          editOrganizationModalOpened={editOrganizationModalOpened}
          editOrganizationModalClose={editOrganizationModalClose}
          addOrganizationModalClose={addOrganizationModalClose}
        />
      )}

      {mesPageType === 'Заявки' && (
        <ExistedNoteModal
          noteModalOpened={noteModalOpened}
          isEditModal={isEditModal}
          noteModalClose={noteModalClose}
        />
      )}
    </Stack>
  );
}
