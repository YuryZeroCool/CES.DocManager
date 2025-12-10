import React, { useEffect } from 'react';
import {
  Group, LoadingOverlay, Stack, Table, Text,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';

import { IAuthResponseType } from 'redux/store/configureStore';
import { RootState } from 'redux/reducers/combineReducers';
import {
  editOrganizationsAfterAdd,
  editOrganizationsAfterDelete,
  editOrganizationsAfterEdit,
  changeSelectedOrganizationId,
} from 'redux/reducers/mes/organizationReducer';
import { deleteOrganization } from 'redux/actions/mes';
import { OrganizationState } from 'types/mes/OrganizationTypes';

import { ReactComponent as EditIcon } from 'assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete-icon.svg';
import WarningModal from 'components/WarningModal';
import classes from './styles.module.css';

interface HeadCell {
  id: number;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 1,
    label: 'Название организации',
  },
  {
    id: 2,
    label: 'Адрес',
  },
  {
    id: 3,
    label: 'Email',
  },
  {
    id: 4,
    label: 'Телефон',
  },
  {
    id: 5,
    label: 'УНП',
  },
  {
    id: 6,
    label: 'Тип',
  },
  {
    id: 7,
    label: '',
  },
  {
    id: 8,
    label: '',
  },
];

interface OrganizationsTableProps {
  editOrganizationModalOpen: () => void;
}

function OrganizationsTableContainer(props: OrganizationsTableProps) {
  const { editOrganizationModalOpen } = props;

  const [
    warningModalOpened,
    { open: warningModalOpen, close: warningModalClose },
  ] = useDisclosure(false);

  const {
    allOrganizations,
    requestStatus,
    editedOrganization,
    createdOrganization,
    selectedOrganizationId,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (createdOrganization.id !== 0) {
      dispatch(editOrganizationsAfterAdd(createdOrganization));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdOrganization]);

  useEffect(() => {
    if (editedOrganization.id !== 0) {
      dispatch(editOrganizationsAfterEdit(editedOrganization));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedOrganization]);

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedOrganizationId(id));
    editOrganizationModalOpen();
  };

  const handleDeleteIconClick = (id: number) => {
    warningModalOpen();
    dispatch(changeSelectedOrganizationId(id));
  };

  const cofirmAction = () => {
    dispatch(deleteOrganization(selectedOrganizationId)).unwrap()
      .then(() => warningModalClose())
      .then(() => dispatch(editOrganizationsAfterDelete(selectedOrganizationId)))
      .catch(() => {});
  };

  const renderEmptyState = () => (
    allOrganizations.organizations.length === 0 && requestStatus !== 'pending' && (
      <Group w="100%" justify="center" pt={20}>
        <Text c="red">Нет организаций для отображения</Text>
      </Group>
    )
  );

  const renderTableHead = () => (
    <Table.Tr>
      {headCells.map((headCell) => (
        <Table.Th key={headCell.id}>{headCell.label}</Table.Th>
      ))}
    </Table.Tr>
  );

  const renderTableBody = () => (
    <>
      {allOrganizations.organizations.map((organization) => (
        <Table.Tr key={organization.id}>
          <Table.Td w="25%">{organization.name}</Table.Td>
          <Table.Td w="25%">{organization.address}</Table.Td>
          <Table.Td w="10%">{organization.email}</Table.Td>
          <Table.Td w="10%">{organization.phone}</Table.Td>
          <Table.Td w="10%">{organization.payerAccountNumber}</Table.Td>
          <Table.Td w="10%">{organization.organizationType}</Table.Td>
          <Table.Td w="5%">
            <EditIcon
              width={20}
              height={20}
              onClick={() => handleEditIconClick(organization.id)}
            />
          </Table.Td>
          <Table.Td w="5%">
            <DeleteIcon
              width={20}
              height={20}
              onClick={() => handleDeleteIconClick(organization.id)}
            />
          </Table.Td>
        </Table.Tr>
      ))}
    </>
  );

  const renderLoaderModal = () => (
    <LoadingOverlay
      visible
      loaderProps={{
        children: (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.5"
            width="80"
            visible
          />
        ),
      }}
    />
  );

  const renderTable = () => (
    allOrganizations.organizations.length !== 0 && (
      <Group w="100%">
        <Table
          striped
          highlightOnHover
          withTableBorder
          classNames={{
            th: classes.tableHeadCell,
            td: classes.tableBodyCell,
            thead: classes.thead,
          }}
        >
          <Table.Thead>{renderTableHead()}</Table.Thead>
          <Table.Tbody>
            {renderTableBody()}
          </Table.Tbody>
        </Table>
      </Group>
    )
  );

  return (
    <Stack className="notes-table">
      {renderTable()}
      {allOrganizations.organizations.length === 0 && requestStatus === 'pending' && renderLoaderModal()}
      {renderEmptyState()}
      <WarningModal
        warningModalOpened={warningModalOpened}
        warningModalClose={warningModalClose}
        cofirmAction={cofirmAction}
      />
    </Stack>
  );
}

export default OrganizationsTableContainer;
