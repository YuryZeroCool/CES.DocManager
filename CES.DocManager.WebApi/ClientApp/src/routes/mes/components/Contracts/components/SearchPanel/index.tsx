import React, { memo } from 'react';
import { Group, Select } from '@mantine/core';

import { ContractTypes, SearchContractParams } from 'types/mes/ContractTypes';

interface SearchPanelProps {
  contractsParams: SearchContractParams;
  updateContractsParams: <K extends keyof SearchContractParams>(
    key: K, value: SearchContractParams[K]) => void;
}

function SearchPanel(props: SearchPanelProps) {
  const { contractsParams, updateContractsParams } = props;

  return (
    <Group>
      <Select
        label="Тип договора"
        data={Object.entries(ContractTypes).map((el) => ({ label: el[1], value: el[0] }))}
        value={contractsParams.contractType}
        onChange={(value) => {
          if (value) updateContractsParams('contractType', value);
        }}
        allowDeselect={false}
      />
    </Group>
  );
}

export default memo(SearchPanel);
