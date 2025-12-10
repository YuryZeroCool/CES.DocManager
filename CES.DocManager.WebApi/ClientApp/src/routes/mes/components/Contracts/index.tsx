import React, { useState } from 'react';
import {
  Button, Divider, Stack, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ContractTypes, SearchContractParams } from 'types/mes/ContractTypes';

import ContractModal from './components/ContractModal';
import SearchPanel from './components/SearchPanel';

function Contracts() {
  const [contractsParams, setContractsParams] = useState<SearchContractParams>({
    contractType: ContractTypes.oneTime,
  });

  const [
    addContractModalOpened,
    { open: addContractModalOpen, close: addContractModalClose },
  ] = useDisclosure(false);

  const handleAddContractBtnClick = () => {
    addContractModalOpen();
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

      {addContractModalOpened && (
        <ContractModal
          addContractModalOpened={addContractModalOpened}
          addContractModalClose={addContractModalClose}
        />
      )}
    </Stack>
  );
}

export default Contracts;
