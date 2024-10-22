import React from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Radio,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  rem,
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
import ActModal from '../../components/ActModal/ActModal.container';
import NotesTable from '../../components/NotesTable/NotesTable.container';
import AddOrganizationModal from '../../components/AddOrganizationModal/AddOrganizationModal.container';
import OrganizationsTable from '../../components/OrganizationsTable/OrganizationsTable.container';
import Pagination from '../../components/Pagination/Pagination.container';
import ActsListTable from '../../components/ActsListTable/ActsListTable.container';
import ExistedNoteModal from '../../components/ExistedNoteModal/ExistedNoteModal.container';

import {
  Act,
  ActsList,
  OrganizationType,
} from '../../types/MesTypes';
import classes from './MesPage.module.scss';
import NotesWithoutActs from './components/NotesWithoutActs';

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
  actsList: ActsList[];
  actsListPage: number;
  totalActsListPages: number;
  minActDate: Date;
  maxActDate: Date;
  requestStatus: string;
  itemsPerPage: number;
  noteModalOpened: boolean;
  isEditModal: boolean;
  filter: string;
  actSearchValue: string;
  organizationType: string | null;
  organizationTypes: OrganizationType[];

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
  handleCurrentActsListPageChange: (value: number) => void;
  handleMinActDateChange: (value: Date | null) => void;
  handleMaxActDateChange: (value: Date | null) => void;
  handleGetActsListBtnClick: () => void;
  setMesError: React.Dispatch<React.SetStateAction<string>>;
  changeItemsPerPage: (value: number) => void;
  handleAddNoteBtnClick: () => void;
  noteModalOpen: () => void;
  noteModalClose: () => void;
  changeIsEditModal: (value: boolean) => void;
  handleFiltersChange: (value: string) => void;
  handleActSearchValueChange: (value: string) => void;
  handleOrganizationTypeChange: (value: string | null) => void;
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
    actsList,
    actsListPage,
    totalActsListPages,
    minActDate,
    maxActDate,
    requestStatus,
    itemsPerPage,
    noteModalOpened,
    isEditModal,
    filter,
    actSearchValue,
    organizationType,
    organizationTypes,

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
    handleCurrentActsListPageChange,
    handleMinActDateChange,
    handleMaxActDateChange,
    handleGetActsListBtnClick,
    setMesError,
    changeItemsPerPage,
    handleAddNoteBtnClick,
    noteModalOpen,
    noteModalClose,
    changeIsEditModal,
    handleFiltersChange,
    handleActSearchValueChange,
    handleOrganizationTypeChange,
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

  const renderActsListHeader = () => (
    <Stack w="100%">
      <Group w="100%" gap={30}>
        <Group w="calc((100% - 30px) / 2)" gap={20}>
          <Group w="calc((100% - 20px) / 2)">
            <DatesProvider
              settings={{
                locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
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

          <Group w="calc((100% - 20px) / 2)">
            <DatesProvider
              settings={{
                locale: 'ru', firstDayOfWeek: 1, weekendDays: [0], timezone: 'Europe/Minsk',
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
        </Group>

        <Group w="calc((100% - 30px) / 2)">
          <Radio.Group
            label="Выберите категории для поиска"
            value={filter}
            onChange={handleFiltersChange}
          >
            <Group mt="xs">
              <Radio value="" label="Все категории" />
              <Radio value="organization" label="Организация" />
              <Radio value="employee" label="Водитель" />
              <Radio value="street" label="Улица" />
              <Radio value="numberPlateOfCar" label="Номер машины" />
            </Group>
          </Radio.Group>
        </Group>
      </Group>

      <Group gap={20} w="70%" align="end">
        <Select
          label="Тип организации"
          data={[
            { label: 'Все', value: '' },
            ...organizationTypes.map((el) => ({ label: el.name, value: el.name })),
          ]}
          value={organizationType}
          onChange={handleOrganizationTypeChange}
          allowDeselect={false}
        />

        <TextInput
          label="Введите значение для поиска"
          value={actSearchValue}
          onChange={(event) => handleActSearchValueChange(event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />

        <Button
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          onClick={handleGetActsListBtnClick}
          disabled={filter !== '' && actSearchValue === ''}
        >
          Получить акты
        </Button>
      </Group>
    </Stack>
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

      {mesPageType === 'История актов' && renderActsListHeader()}

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
      width="45%"
      justify="end"
      page={actsListPage}
      totalPage={totalActsListPages}
      handleCurrentPageChange={handleCurrentActsListPageChange}
    />
  );

  const renderCounPerPageButtons = () => (
    <Group my={20}>
      <Group w="45%">
        <Text size="lg">
          Количество отображаемых актов:
        </Text>
        <Button
          onClick={() => changeItemsPerPage(25)}
          variant={itemsPerPage === 25 ? 'gradient' : 'outline'}
          gradient={itemsPerPage === 25 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          25
        </Button>
        <Button
          onClick={() => changeItemsPerPage(50)}
          variant={itemsPerPage === 50 ? 'gradient' : 'outline'}
          gradient={itemsPerPage === 50 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          50
        </Button>
        <Button
          onClick={() => changeItemsPerPage(100)}
          variant={itemsPerPage === 100 ? 'gradient' : 'outline'}
          gradient={itemsPerPage === 100 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          100
        </Button>
      </Group>
      {renderActsListPagination()}
    </Group>
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
      {renderTableHeader()}
      {mesPageType === 'Заявки' && renderNotesTable()}
      {mesPageType === 'Организации' && renderOrganizationsTable()}
      {mesPageType === 'Организации' && renderPagination()}
      {mesPageType === 'История актов' && renderActsListTable()}
      {mesPageType === 'История актов' && mesError === '' && actsList.length > 0 && renderCounPerPageButtons()}
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
