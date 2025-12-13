import React, { memo, useState, useEffect } from 'react';
import {
  Divider,
  Group, Modal, rem, Select, Stack,
  TextInput,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizationState } from 'types/mes/OrganizationTypes';
import { AddContractParams, ContractTypes, ContractState } from 'types/mes/ContractTypes';
import { RootState } from 'redux/reducers/combineReducers';
import { resetNextContractNumber, resetOrganizationsBySearch } from 'redux/reducers/mes/organizationReducer';
import { resetContractState } from 'redux/reducers/mes/contractReducer';
import { organizationsBySearch, getNextContractNumber, createContract } from 'redux/actions/mes';
import { format } from 'date-fns';
import { IAuthResponseType } from 'redux/store/configureStore';
import ModalButtons from 'components/ModalButtons';
import DatePicker from 'components/DatePicker';

interface ContractModalProps {
  addContractModalOpened: boolean;
  addContractModalClose: () => void;
}

function ContractModal(props: ContractModalProps) {
  const { addContractModalOpened, addContractModalClose } = props;

  const [addContractParams, setAddContractParams] = useState<AddContractParams>({
    creationDate: new Date(),
    contractNumber: '',
    contractType: ContractTypes.oneTime,
    organization: '',
  });

  const [organizationSearchValue, setOrganizationSearchValue] = useState<string>('');

  const {
    allOrganizationsBySearch,
    nextContractNumber,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const {
    requestStatus,
  } = useSelector<RootState, ContractState>(
    (state) => state.contract,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const resetContractParams = (contractType: string = ContractTypes.oneTime): AddContractParams => {
    const currentDate = new Date();
    return {
      creationDate: currentDate,
      startDateOfWork: undefined,
      endDateOfWork: undefined,
      expirationDate: undefined,
      contractNumber: '',
      contractType,
      organization: '',
    };
  };

  const updateAddContractParams = <K extends keyof AddContractParams>(
    key: K,
    value: AddContractParams[K],
  ) => {
    setAddContractParams((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    const currentDate = new Date();
    setAddContractParams((prevState) => {
      const updates: Partial<AddContractParams> = {
        contractNumber: '',
        creationDate: currentDate,
      };

      if (addContractParams.contractType === ContractTypes.oneTime) {
        updates.expirationDate = undefined;
        updates.startDateOfWork = currentDate;
        updates.endDateOfWork = currentDate;
      } else if (addContractParams.contractType === ContractTypes.yearly) {
        updates.startDateOfWork = undefined;
        updates.endDateOfWork = undefined;
      }

      return { ...prevState, ...updates };
    });
  }, [addContractParams.contractType]);

  useEffect(() => {
    if (addContractParams.creationDate
      && addContractParams.contractType === ContractTypes.oneTime) {
      setAddContractParams((prevState) => {
        if (
          prevState.startDateOfWork?.getTime() === addContractParams.creationDate?.getTime()
          && prevState.endDateOfWork?.getTime() === addContractParams.creationDate?.getTime()
        ) {
          return prevState;
        }
        return {
          ...prevState,
          startDateOfWork: addContractParams.creationDate,
          endDateOfWork: addContractParams.creationDate,
        };
      });
    }
  }, [addContractParams.creationDate, addContractParams.contractType]);

  useEffect(() => {
    if (
      addContractParams.startDateOfWork
      && addContractParams.endDateOfWork
      && addContractParams.endDateOfWork < addContractParams.startDateOfWork
    ) {
      setAddContractParams((prevState) => ({
        ...prevState,
        endDateOfWork: prevState.startDateOfWork,
      }));
    }
  }, [addContractParams.startDateOfWork, addContractParams.endDateOfWork]);

  useEffect(() => {
    if (addContractParams.contractType === ContractTypes.yearly && addContractParams.creationDate) {
      const expirationDate = new Date(addContractParams.creationDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      setAddContractParams((prevState) => ({ ...prevState, expirationDate }));
    } else if (addContractParams.contractType === ContractTypes.oneTime) {
      setAddContractParams((prevState) => ({ ...prevState, expirationDate: undefined }));
    }
  }, [addContractParams.contractType, addContractParams.creationDate]);

  useEffect(() => {
    if (
      addContractParams.contractType
      && addContractParams.organization
      && addContractParams.creationDate
    ) {
      dispatch(getNextContractNumber({
        organizationName: addContractParams.organization,
        date: format(addContractParams.creationDate, 'dd-MM-yyyy HH:mm:ss'),
        contractType: addContractParams.contractType as ContractTypes,
      })).catch(() => {});
    }
  }, [addContractParams.contractType,
    addContractParams.organization,
    addContractParams.creationDate,
    dispatch,
  ]);

  useEffect(() => {
    if (nextContractNumber) {
      if (nextContractNumber.exist) {
        showNotification({
          title: 'Ошибка',
          message: 'Существует действующий договор',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
          color: 'red',
        });
      } else if (nextContractNumber.nextContractNumber) {
        setAddContractParams((prevState) => ({
          ...prevState,
          contractNumber: nextContractNumber.nextContractNumber
            ? `${nextContractNumber.nextContractNumber.toString()}/п` : '',
        }));
      }
    }
  }, [nextContractNumber]);

  const handleOrganizationSearchChange = (value: string) => {
    setOrganizationSearchValue(value);
    if (value.length === 1) {
      dispatch(organizationsBySearch(value)).catch(() => {});
    }
    if (value.length === 0) {
      dispatch(resetOrganizationsBySearch());
    }
  };

  const handleOrganizationChange = (value: string | null) => {
    if (value === null) {
      updateAddContractParams('organization', '');
      setOrganizationSearchValue('');
      dispatch(resetOrganizationsBySearch());
    } else {
      updateAddContractParams('organization', value);
      setOrganizationSearchValue(value);
    }
  };

  const handleClose = () => {
    addContractModalClose();
    setAddContractParams(resetContractParams());
    setOrganizationSearchValue('');
    dispatch(resetNextContractNumber());
    dispatch(resetOrganizationsBySearch());
    dispatch(resetContractState());
  };

  const isFormValid = (): boolean => {
    if (nextContractNumber?.exist) {
      return false;
    }

    if (!addContractParams.organization
      || !addContractParams.creationDate
      || addContractParams.contractNumber.trim() === '') {
      return false;
    }

    if (addContractParams.contractType === ContractTypes.oneTime) {
      return !!(addContractParams.startDateOfWork && addContractParams.endDateOfWork);
    }

    if (addContractParams.contractType === ContractTypes.yearly) {
      return !!addContractParams.expirationDate;
    }

    return false;
  };

  const handleAddContractSubmit = () => {
    if (!isFormValid()) {
      return;
    }

    const requestData = {
      organizationName: addContractParams.organization,
      creationDate: format(addContractParams.creationDate, 'dd-MM-yyyy HH:mm:ss'),
      contractNumber: addContractParams.contractNumber.trim(),
      contractType: addContractParams.contractType,
      ...(addContractParams.startDateOfWork && {
        startDateOfWork: format(addContractParams.startDateOfWork, 'dd-MM-yyyy HH:mm:ss'),
      }),
      ...(addContractParams.endDateOfWork && {
        endDateOfWork: format(addContractParams.endDateOfWork, 'dd-MM-yyyy HH:mm:ss'),
      }),
      ...(addContractParams.expirationDate && {
        expirationDate: format(addContractParams.expirationDate, 'dd-MM-yyyy HH:mm:ss'),
      }),
    };

    dispatch(createContract(requestData))
      .unwrap()
      .then(() => {
        showNotification({
          title: 'Успешно',
          message: 'Договор успешно создан',
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'green' } },
        });
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <Modal
      opened={addContractModalOpened}
      onClose={addContractModalClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      lockScroll={false}
      title="Добавить договор"
      styles={{
        content: { flex: '0 0 800px', borderRadius: 10 },
      }}
    >
      <Stack gap={20}>
        <Group gap={20}>
          <Select
            label="Тип договора"
            data={Object.entries(ContractTypes).map((el) => ({ label: el[1], value: el[1] }))}
            value={addContractParams.contractType}
            onChange={(value) => {
              if (value) {
                updateAddContractParams('contractType', value);
              }
            }}
            allowDeselect={false}
            w="30%"
          />

          <Select
            styles={{
              root: {
                flex: 1,
              },
              dropdown: {
                zIndex: 1000,
              },
            }}
            label="Организация"
            placeholder="Введите значение"
            data={allOrganizationsBySearch}
            searchable
            searchValue={organizationSearchValue}
            onSearchChange={handleOrganizationSearchChange}
            onChange={handleOrganizationChange}
            clearable
            value={addContractParams.organization}
            name="organizationSelect"
          />
        </Group>

        <Group gap={20} wrap="nowrap">
          <DatePicker
            label="Дата создания договора"
            placeholder="Выберите дату"
            value={addContractParams.creationDate}
            onChange={(value: Date | null) => {
              if (value) {
                updateAddContractParams('creationDate', value);
              }
            }}
            w="100%"
          />
          {addContractParams.contractType === ContractTypes.yearly && (
            <DatePicker
              label="Дата истечения договора"
              placeholder="Выберите дату"
              value={addContractParams.expirationDate ?? null}
              onChange={(value: Date | null) => {
                if (value) {
                  updateAddContractParams('expirationDate', value);
                }
              }}
              w="100%"
            />
          )}
          {addContractParams.contractType === ContractTypes.oneTime && (
            <>
              <DatePicker
                label="Дата начала работ"
                placeholder="Выберите дату"
                value={addContractParams.startDateOfWork ?? null}
                onChange={(value: Date | null) => {
                  if (value) {
                    updateAddContractParams('startDateOfWork', value);
                  }
                }}
                minDate={addContractParams.creationDate ?? new Date()}
                w="100%"
              />
              <DatePicker
                label="Дата окончания работ"
                placeholder="Выберите дату"
                value={addContractParams.endDateOfWork ?? null}
                onChange={(value: Date | null) => {
                  if (value) {
                    updateAddContractParams('endDateOfWork', value);
                  }
                }}
                minDate={addContractParams.startDateOfWork ?? new Date()}
                w="100%"
              />
            </>
          )}
        </Group>

        <TextInput
          label="Номер договора"
          placeholder="Номер договора"
          w="100%"
          value={addContractParams.contractNumber}
          onChange={(event) => updateAddContractParams('contractNumber', event.target.value)}
        />

        <Divider style={{ background: 'linear-gradient(#7950f2 0%, #15aabf 100%)', height: 3 }} />

        <ModalButtons
          confirmBtnTitle="Добавить договор"
          cancelBtnTitle="Отменить"
          handleCancel={handleClose}
          handleConfirm={handleAddContractSubmit}
          disabled={!isFormValid()}
          loading={requestStatus === 'pending'}
        />
      </Stack>
    </Modal>
  );
}

export default memo(ContractModal);
