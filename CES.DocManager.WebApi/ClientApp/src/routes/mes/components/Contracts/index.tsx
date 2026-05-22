import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Divider, Stack, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import {
  Contract, ContractTypes, GetContractsListReq, SearchContractParams,
} from 'types/mes/ContractTypes';
import {
  getInitialContractsSearchDates,
  saveContractsSearchDatesToStorage,
} from 'utils/contractsSearchDatesStorage';
import { IAuthResponseType } from 'redux/store/configureStore';
import { getContractsList } from 'redux/actions/mes';

import ContractModal from './components/ContractModal';
import SearchPanel from './components/SearchPanel';
import ContractsTable from './components/ContractsTable';

function Contracts() {
  const [contractsParams, setContractsParams] = useState<SearchContractParams>(() => {
    const { minDate, maxDate } = getInitialContractsSearchDates();

    return {
      contractType: ContractTypes.oneTime,
      minDate,
      maxDate,
      searchValue: '',
      filter: '',
    };
  });

  const [
    contractModalOpened,
    { open: contractModalOpen, close: contractModalClose },
  ] = useDisclosure(false);
  const [contractToEdit, setContractToEdit] = useState<Contract | null>(null);

  const dispatch: IAuthResponseType = useDispatch();
  const isInitialDatesMount = useRef(true);

  const getContractsListReq = () => {
    const params: GetContractsListReq = {
      contractType: contractsParams.contractType.trim(),
      min: format(contractsParams.minDate, 'dd-MM-yyyy HH:mm:ss'),
      max: format(contractsParams.maxDate, 'dd-MM-yyyy HH:mm:ss'),
      filter: contractsParams.filter.trim(),
      searchValue: contractsParams.searchValue.trim(),
    };

    dispatch(getContractsList(params)).catch(() => {});
  };

  useEffect(() => {
    getContractsListReq();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialDatesMount.current) {
      isInitialDatesMount.current = false;
      return;
    }

    saveContractsSearchDatesToStorage(contractsParams.minDate, contractsParams.maxDate);
  }, [contractsParams.minDate, contractsParams.maxDate]);

  const handleAddContractBtnClick = () => {
    setContractToEdit(null);
    contractModalOpen();
  };

  const handleEditContract = (contract: Contract) => {
    setContractToEdit(contract);
    contractModalOpen();
  };

  const handleContractModalClose = () => {
    setContractToEdit(null);
    contractModalClose();
  };

  const updateContractsParams = <K extends keyof SearchContractParams>(
    key: K,
    value: SearchContractParams[K],
  ) => {
    setContractsParams((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleGetContractsListBtnClick = () => {
    getContractsListReq();
  };

  return (
    <Stack>
      <Stack
        pt={20}
        gap={15}
        mih="7vh"
      >
        <Stack>
          <Text fw={600}>Поиск договоров</Text>
          <SearchPanel
            contractsParams={contractsParams}
            updateContractsParams={updateContractsParams}
            handleGetContractsListBtnClick={handleGetContractsListBtnClick}
          />
        </Stack>

        <Divider style={{ background: 'linear-gradient(#7950f2 0%, #15aabf 100%)', height: 3 }} />

        <Stack>
          <Text fw={600}>Добавить договор</Text>
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            onClick={handleAddContractBtnClick}
            w={250}
          >
            Добавить договор
          </Button>
        </Stack>
      </Stack>

      <Divider style={{ background: 'linear-gradient(#7950f2 0%, #15aabf 100%)', height: 3 }} />

      <ContractsTable onEditContract={handleEditContract} />

      {contractModalOpened && (
        <ContractModal
          modalOpened={contractModalOpened}
          onModalClose={handleContractModalClose}
          onSuccess={getContractsListReq}
          contractToEdit={contractToEdit}
        />
      )}
    </Stack>
  );
}

export default Contracts;
