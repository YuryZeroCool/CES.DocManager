import * as React from 'react';
import {
  Flex,
  Group,
  LoadingOverlay,
  Table,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-icon.svg';
import { OrganizationResponse } from '../../types/MesTypes';
import classes from './OrganizationsTable.module.scss';

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
    label: '',
  },
  {
    id: 7,
    label: '',
  },
];

interface Props {
  allOrganizations: OrganizationResponse[];
  mesError: string;
  requestStatus: string;
  handleEditIconClick: (id: number) => void;
  handleDeleteIconClick: (id: number) => void;
}

export default function OrganizationsTableComponent(props: Props) {
  const {
    allOrganizations,
    mesError,
    requestStatus,
    handleEditIconClick,
    handleDeleteIconClick,
  } = props;

  const renderError = () => (
    mesError !== '' && (
      <p className="error-message">{mesError}</p>
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
      {allOrganizations.map((organization) => (
        <Table.Tr key={organization.id}>
          <Table.Td w="30%">{organization.name}</Table.Td>
          <Table.Td w="30%">{organization.address}</Table.Td>
          <Table.Td w="10%">{organization.email}</Table.Td>
          <Table.Td w="10%">{organization.phone}</Table.Td>
          <Table.Td w="10%">{organization.payerAccountNumber}</Table.Td>
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
    allOrganizations.length !== 0 && (
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
    <Flex className="notes-table">
      {renderError()}
      {renderTable()}
      {allOrganizations.length === 0 && requestStatus !== 'fulfilled' && mesError === '' && renderLoaderModal()}
    </Flex>
  );
}
