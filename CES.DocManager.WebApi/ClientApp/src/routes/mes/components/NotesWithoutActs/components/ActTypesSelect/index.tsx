import {
  Combobox,
  Input,
  InputBase,
  useCombobox,
} from '@mantine/core';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/reducers/combineReducers';
import { INotesState } from 'types/MesTypes';

interface ActTypesSelectProps {
  actTypeSelectValue: string;
  handleActTypeSelectChange: (value: string) => void;
}

function ActTypesSelect(props: ActTypesSelectProps) {
  const { actTypeSelectValue, handleActTypeSelectChange } = props;

  const {
    actTypesFromFile,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

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

  return (
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
}

export default memo(ActTypesSelect);
