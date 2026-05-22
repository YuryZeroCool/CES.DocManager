import React from 'react';
import {
  Group, LoadingOverlay, Stack, Table, Text, Tooltip,
} from '@mantine/core';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconPrinter } from '@tabler/icons-react';

import { RootState } from 'redux/reducers/combineReducers';
import { markContractPrinted, printContract } from 'redux/actions/mes';
import { IAuthResponseType } from 'redux/store/configureStore';
import { Contract, ContractState, ContractTypes } from 'types/mes/ContractTypes';

import { ReactComponent as EditIcon } from 'assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete-icon.svg';
import WarningModal from 'components/WarningModal';
import saveContractDocFile from 'utils/saveContractDocFile';
import { getThunkErrorMessage } from 'utils/parseApiErrorMessage';
import classes from './styles.module.css';

interface HeadCell {
  id: number;
  label: string;
}

const oneTimeHeadCells: readonly HeadCell[] = [
  { id: 0, label: '№' },
  { id: 1, label: 'Номер договора' },
  { id: 2, label: 'Дата заключения' },
  { id: 3, label: 'Дата начала работ' },
  { id: 4, label: 'Дата окончания работ' },
  { id: 5, label: 'Организация' },
  { id: 6, label: 'Контакты организации' },
  { id: 7, label: 'Кол-во актов' },
  { id: 8, label: '' },
];

const yearlyHeadCells: readonly HeadCell[] = [
  { id: 0, label: '№' },
  { id: 1, label: 'Номер договора' },
  { id: 2, label: 'Дата заключения' },
  { id: 3, label: 'Дата истечения' },
  { id: 4, label: 'Организация' },
  { id: 5, label: 'Контакты организации' },
  { id: 6, label: 'Кол-во актов' },
  { id: 7, label: '' },
];

interface ContractsTableProps {
  onEditContract: (contract: Contract) => void;
}

function ContractsTable(props: ContractsTableProps) {
  const { onEditContract } = props;
  const dispatch: IAuthResponseType = useDispatch();

  const {
    contractsList,
    requestStatus,
    selectedContractType,
  } = useSelector<RootState, ContractState>(
    (state) => state.contract,
  );

  const [printingContractId, setPrintingContractId] = React.useState<number | null>(null);

  const [
    warningModalOpened,
    { open: warningModalOpen, close: warningModalClose },
  ] = useDisclosure(false);

  const [selectedContractId, setSelectedContractId] = React.useState<number | null>(null);

  const currentContractType = React.useMemo(() => {
    if (contractsList.length > 0) {
      return contractsList[0].contractType === ContractTypes.oneTime
        ? ContractTypes.oneTime
        : ContractTypes.yearly;
    }
    return selectedContractType;
  }, [contractsList, selectedContractType]);

  const headCells = currentContractType === ContractTypes.oneTime
    ? oneTimeHeadCells
    : yearlyHeadCells;

  const getActsCount = (contract: Contract) => contract.actsCount ?? 0;

  const isOneTimeWithoutAct = (contract: Contract) => (
    contract.contractType === ContractTypes.oneTime && getActsCount(contract) === 0
  );

  const renderActsCountCell = (contract: Contract) => (
    <Table.Td align="center">{getActsCount(contract)}</Table.Td>
  );

  const getPrintTooltip = (contract: Contract) => {
    if (contract.isPrinted) {
      return 'Договор уже распечатан';
    }
    if (isOneTimeWithoutAct(contract)) {
      return 'К договору не привязан акт. Создайте акт, чтобы распечатать договор';
    }
    if (printingContractId === contract.id) {
      return 'Формирование договора...';
    }
    return 'Сформировать и сохранить договор';
  };

  const getPrintIconColor = (contract: Contract) => {
    if (contract.isPrinted) {
      return 'var(--mantine-color-gray-5)';
    }
    if (isOneTimeWithoutAct(contract)) {
      return 'var(--mantine-color-orange-6)';
    }
    if (printingContractId === contract.id) {
      return 'var(--mantine-color-gray-6)';
    }
    return 'var(--mantine-color-dark-9)';
  };

  const getPrintIconClassName = (contract: Contract) => {
    if (contract.isPrinted) {
      return classes.printIconDisabled;
    }
    if (isOneTimeWithoutAct(contract)) {
      return classes.printIconNoAct;
    }
    if (printingContractId === contract.id) {
      return classes.printIconDisabled;
    }
    return classes.printIconReady;
  };

  const canPrintContract = (contract: Contract) => (
    !contract.isPrinted
    && printingContractId !== contract.id
    && !isOneTimeWithoutAct(contract)
  );

  const handlePrintIconClick = (contract: Contract) => {
    if (!canPrintContract(contract)) return;

    setPrintingContractId(contract.id);

    dispatch(printContract({
      contractId: contract.id,
      contractNumber: contract.contractNumber,
      organizationName: contract.organizationName,
      contractType: contract.contractType,
    }))
      .unwrap()
      .then(({ blob, fileName }) => saveContractDocFile(blob, fileName))
      .then(() => dispatch(markContractPrinted(contract.id)).unwrap())
      .catch((error: unknown) => {
        showNotification({
          title: 'Ошибка',
          message: getThunkErrorMessage(error, 'Не удалось сохранить договор'),
          color: 'red',
        });
      })
      .finally(() => {
        setPrintingContractId(null);
      });
  };

  const renderPrintIcon = (contract: Contract) => (
    <Tooltip label={getPrintTooltip(contract)} withArrow position="top">
      <span className={classes.printIconWrapper}>
        <IconPrinter
          width={20}
          height={20}
          className={getPrintIconClassName(contract)}
          color={getPrintIconColor(contract)}
          onClick={() => handlePrintIconClick(contract)}
          aria-disabled={!canPrintContract(contract)}
        />
      </span>
    </Tooltip>
  );

  const handleEditIconClick = (contract: Contract) => {
    onEditContract(contract);
  };

  const handleDeleteIconClick = (id: number) => {
    setSelectedContractId(id);
    warningModalOpen();
  };

  const confirmAction = () => {
    if (selectedContractId) {
      // TODO: Implement delete functionality
      // dispatch(deleteContract(selectedContractId)).unwrap()
      //   .then(() => warningModalClose())
      //   .catch(() => {});
      console.log('Delete contract:', selectedContractId);
      warningModalClose();
      setSelectedContractId(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  };

  const getOrganizationContacts = (contract: Contract) => {
    if (!contract.organization) return '-';
    const { address, phone } = contract.organization;
    const contacts = [];
    if (address) contacts.push(address);
    if (phone) contacts.push(`Телефон: ${phone}`);
    return contacts.length > 0 ? contacts.join(', ') : '-';
  };

  const renderEmptyState = () => (
    contractsList.length === 0 && requestStatus !== 'pending' && (
      <Group w="100%" justify="center" pt={20}>
        <Text c="red">Нет договоров для отображения</Text>
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

  const renderActionsCell = (contract: Contract) => (
    <Table.Td>
      <Group gap={15} justify="space-between" wrap="nowrap">
        {renderPrintIcon(contract)}
        <EditIcon
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
          onClick={() => handleEditIconClick(contract)}
        />
        <DeleteIcon
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteIconClick(contract.id)}
        />
      </Group>
    </Table.Td>
  );

  const renderContractRow = (contract: Contract, index: number, isOneTime: boolean) => (
    <Table.Tr key={contract.id}>
      <Table.Td align="center">
        {index + 1}
      </Table.Td>
      <Table.Td>{contract.contractNumber}</Table.Td>
      <Table.Td>{formatDate(contract.creationDate)}</Table.Td>
      {isOneTime ? (
        <>
          <Table.Td>{formatDate(contract.startDateOfWork)}</Table.Td>
          <Table.Td>{formatDate(contract.endDateOfWork)}</Table.Td>
        </>
      ) : (
        <Table.Td>{formatDate(contract.expirationDate)}</Table.Td>
      )}
      <Table.Td>{contract.organizationName || contract.organization?.name || '-'}</Table.Td>
      <Table.Td>{getOrganizationContacts(contract)}</Table.Td>
      {renderActsCountCell(contract)}
      {renderActionsCell(contract)}
    </Table.Tr>
  );

  const renderTableBody = () => (
    <>
      {contractsList.map((contract, index) => renderContractRow(
        contract,
        index,
        currentContractType === ContractTypes.oneTime,
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
    contractsList.length !== 0 && (
      <Stack w="100%" gap={10}>
        <Text size="sm" ta="right" c="dimmed">
          Количество договоров:
          {' '}
          {contractsList.length}
        </Text>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          withRowBorders
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
      </Stack>
    )
  );

  return (
    <Stack className="notes-table">
      {renderTable()}
      {contractsList.length === 0 && requestStatus === 'pending' && renderLoaderModal()}
      {renderEmptyState()}
      {warningModalOpened && (
        <WarningModal
          warningModalOpened={warningModalOpened}
          warningModalClose={warningModalClose}
          cofirmAction={confirmAction}
        />
      )}
    </Stack>
  );
}

export default ContractsTable;
