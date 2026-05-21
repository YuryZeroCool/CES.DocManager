import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  Checkbox, Flex, Group, List, Modal, Select, Stack, Text, rem,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

import { IAuthResponseType } from 'redux/store/configureStore';
import { resetDriversByCar } from 'redux/reducers/drivers/driversReducer';
import { RootState } from 'redux/reducers/combineReducers';
import { organizationsBySearch, getContractsListForSelect } from 'redux/actions/mes';
import getCarByCarNumber from 'redux/actions/vehicle/getCarByCarNumber';
import getDriversByCarNumber from 'redux/actions/drivers/getDriversByCarNumber';
import createNewAct from 'redux/actions/mes/createNewAct';
import { resetOrganizationsBySearch } from 'redux/reducers/mes/organizationReducer';
import {
  resetActData,
} from 'redux/reducers/mes/mesReducer';
import { resetCarsByCarNumber } from 'redux/reducers/vehicle/vehicleReducer';
import {
  editNotesWithoutActAfterAddAct,
  resetStreetsBySearch,
} from 'redux/reducers/mes/notesWithoutActReducer';
import {
  Act,
  ActModalFormState,
  AddNewActReq,
  INotesState,
} from 'types/MesTypes';
import { IVehicleResponse } from 'types/VehicleTypes';
import { IDriverResponse } from 'types/DriversType';
import { NotesWithoutActState } from 'types/mes/NotesWithoutActTypes';
import { OrganizationState } from 'types/mes/OrganizationTypes';
import { ContractState, GetContractsListForSelectRes } from 'types/mes/ContractTypes';
import { resetContractsListForSelect } from 'redux/reducers/mes/contractReducer';
import handleError from 'utils';
import { getSharedNotesWorkAddress } from 'utils/noteWorkAddress';
import AddActTable from 'components/AddActTable';
import ModalButtons from 'components/ModalButtons';
import DatePicker from 'components/DatePicker';

import classes from './styles.module.css';

interface ActModalProps {
  selectedNotesId: number[];
  currentActData: Act;
  type: string;
  addActModalOpened: boolean;
  editActModalOpened: boolean;
  addActModalClose: () => void;
  editActModalClose: () => void;
  resetCurrentActData: () => void;
  changeType: (value: string) => void;
  handleSelectNote: (newValue: number[]) => void;
}

function ActModal(props: ActModalProps) {
  const {
    selectedNotesId,
    currentActData,
    type,
    addActModalOpened,
    editActModalOpened,
    editActModalClose,
    addActModalClose,
    resetCurrentActData,
    changeType,
    handleSelectNote,
  } = props;

  const [actForm, setActForm] = useState<ActModalFormState>({
    selectedNotes: [],
    organization: '',
    car: '',
    driver: null,
    isSigned: false,
    actAdditionDate: null,
    selectedContract: null,
  });
  const [modalError, setModalError] = useState<string>('');

  const {
    totalActSumm,
    vat,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const {
    notesWithoutAct,
  } = useSelector<RootState, NotesWithoutActState>(
    (state) => state.notesWithoutAct,
  );

  const {
    allOrganizationsBySearch,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const {
    carsByCarNumber,
  } = useSelector<RootState, IVehicleResponse>(
    (state) => state.vehicle,
  );

  const {
    driversByCarNumber,
  } = useSelector<RootState, IDriverResponse>(
    (state) => state.drivers,
  );

  const {
    contractsListForSelect,
  } = useSelector<RootState, ContractState>(
    (state) => state.contract,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const updateActFormState = <K extends keyof ActModalFormState>(
    key: K,
    value: ActModalFormState[K],
  ) => {
    setActForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const newSelectedNotes = notesWithoutAct.filter((note) => selectedNotesId.includes(note.id));
    updateActFormState('selectedNotes', newSelectedNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNotesId]);

  useEffect(() => {
    if (actForm.car !== '' && actForm.car.includes('(') && actForm.car.includes(')')) {
      const carNumber = actForm.car.split('(');
      dispatch(getDriversByCarNumber(carNumber[1].replace(')', '')))
        .catch((error) => {
          handleError(error, setModalError);
        });
    } else {
      updateActFormState('driver', null);
      dispatch(resetDriversByCar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actForm.car]);

  useEffect(() => {
    if (actForm.organization && actForm.actAdditionDate) {
      const workAddress = getSharedNotesWorkAddress(actForm.selectedNotes);

      const params = {
        organizationName: actForm.organization,
        date: format(actForm.actAdditionDate, 'dd-MM-yyyy HH:mm:ss'),
        ...(workAddress && {
          street: workAddress.street,
          houseNumber: workAddress.houseNumber,
        }),
      };

      dispatch(getContractsListForSelect(params))
        .then((result) => {
          if (result.type === 'getContractsListForSelect/fulfilled') {
            const payload = result.payload as GetContractsListForSelectRes;
            if (payload && payload.contracts.length === 0) {
              showNotification({
                title: 'Нет договоров',
                message: workAddress
                  ? 'Нет договоров для организации, даты и адреса заявок. Создайте договор или проверьте адрес.'
                  : 'Для данной организации на выбранную дату нет договоров. Необходимо сначала создать договор.',
                icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
                styles: { icon: { background: 'orange' } },
                color: 'orange',
              });
            }
          }
        })
        .catch((error) => {
          handleError(error, setModalError);
          dispatch(resetContractsListForSelect());
        });
    } else {
      dispatch(resetContractsListForSelect());
      updateActFormState('selectedContract', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actForm.organization, actForm.actAdditionDate, actForm.selectedNotes]);

  const handleClose = () => {
    changeType('');
    resetCurrentActData();
    setActForm({
      selectedNotes: [],
      organization: '',
      car: '',
      driver: null,
      isSigned: false,
      actAdditionDate: null,
      selectedContract: null,
    });
    dispatch(resetCarsByCarNumber());
    dispatch(resetDriversByCar());
    dispatch(resetActData(type));
    dispatch(resetOrganizationsBySearch());
    dispatch(resetStreetsBySearch());
    dispatch(resetContractsListForSelect());
    setModalError('');
    handleSelectNote([]);
    if (addActModalOpened) {
      addActModalClose();
    }
    if (editActModalOpened) {
      editActModalClose();
    }
  };

  const handleOrganizationsInputChange = (value: string | null) => {
    if (value === null) {
      updateActFormState('organization', '');
      dispatch(resetOrganizationsBySearch());
      return;
    }
    if (value.length === 1) {
      dispatch(organizationsBySearch(value))
        .then(() => {
          updateActFormState('organization', value);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });

      return;
    }
    if (value.length === 0) {
      updateActFormState('organization', '');
      dispatch(resetOrganizationsBySearch());
    }

    updateActFormState('organization', value);
  };

  const handleCarInputChange = (value: string | null) => {
    if (value === null) {
      updateActFormState('car', '');
      dispatch(resetCarsByCarNumber());
      return;
    }
    if (value.length === 1) {
      dispatch(getCarByCarNumber(value))
        .then(() => {
          updateActFormState('car', value);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });

      return;
    }
    if (value.length === 0) {
      updateActFormState('car', '');
      dispatch(resetCarsByCarNumber());
    }

    updateActFormState('car', value);
  };

  const handleAddActSubmit = () => {
    const {
      organization,
      driver,
      car,
      actAdditionDate,
      selectedNotes,
      isSigned,
      selectedContract,
    } = actForm;

    if (organization && driver && car && actAdditionDate) {
      const request: AddNewActReq = {
        organization,
        vehicle: car,
        driver,
        actAdditionDate: format(actAdditionDate, 'dd-MM-yyyy HH:mm:ss'),
        actType: currentActData.type,
        completedWorks: currentActData.works,
        notesWithoutAct: selectedNotes,
        totalActSumm: +(+totalActSumm).toFixed(2),
        vat: +(+vat).toFixed(2),
        isSigned,
        contractId: Number(selectedContract),
      };

      dispatch(createNewAct(request))
        .then(() => {
          dispatch(editNotesWithoutActAfterAddAct(selectedNotesId));
          handleClose();
        })
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  return (
    <Modal
      opened={addActModalOpened || editActModalOpened}
      onClose={handleClose}
      withCloseButton
      centered
      closeOnClickOutside={false}
      title={
        addActModalOpened ? 'Добавление акта' : 'Редактирование акта'
      }
      size="xxl"
      lockScroll={false}
      classNames={{
        title: classes.modalTitle,
      }}
    >
      <Stack>
        <Select
          classNames={{
            dropdown: classes.selectDropdown,
          }}
          w="100%"
          label="Организация"
          placeholder="Введите значение"
          data={allOrganizationsBySearch}
          searchable
          onSearchChange={(value) => handleOrganizationsInputChange(value)}
          onChange={(value) => handleOrganizationsInputChange(value)}
          clearable
          value={actForm.organization}
          name="organizationSelect"
        />
        <Flex gap={10}>
          <Select
            classNames={{
              dropdown: classes.selectDropdown,
            }}
            w="50%"
            label="Машина"
            placeholder="Введите номер машины"
            data={carsByCarNumber}
            searchable
            onSearchChange={(value) => handleCarInputChange(value)}
            onChange={(value) => handleCarInputChange(value)}
            clearable
            value={actForm.car}
          />

          <Select
            classNames={{
              dropdown: classes.selectDropdown,
            }}
            w="50%"
            label="Водитель"
            placeholder="Выберите водителя"
            data={driversByCarNumber}
            onChange={(value) => updateActFormState('driver', value)}
            clearable
            value={actForm.driver}
          />
        </Flex>

        <Flex gap={10} align="center">
          <DatePicker
            label="Дата добавления акта"
            placeholder="Выберите дату"
            value={actForm.actAdditionDate ? new Date(actForm.actAdditionDate) : null}
            onChange={(value: Date | null) => {
              updateActFormState('actAdditionDate', value);
            }}
            maxDate={new Date()}
            w="50%"
          />
          <Checkbox
            label="Акт подписан"
            mt={20}
            checked={actForm.isSigned}
            onChange={(event) => updateActFormState('isSigned', event.currentTarget.checked)}
            classNames={{
              input: classes.input,
            }}
          />
        </Flex>

        <Select
          classNames={{
            dropdown: classes.selectDropdown,
          }}
          w="100%"
          label="Список договоров организации"
          placeholder="Выберите договор"
          data={contractsListForSelect.length > 0 ? contractsListForSelect.map((contract) => ({
            value: contract.id.toString(),
            label: `Договор № ${contract.contractNumber} от ${format(new Date(contract.creationDate), 'dd.MM.yyyy')} - ${contract.contractType}`,
          })) : []}
          onChange={(value) => updateActFormState('selectedContract', value)}
          clearable
          value={actForm.selectedContract}
        />

        {actForm.selectedNotes.length > 0 && (
          <Stack gap={10}>
            <Text>Заявки:</Text>

            <List size="md">
              {actForm.selectedNotes.map((el) => (
                <List.Item key={el.id}>
                  {el.street && (
                    <>
                      {el.street}
                      ,&nbsp;
                    </>
                  )}
                  {el.houseNumber && (
                    <>
                      д.&nbsp;
                      {el.houseNumber}
                    </>
                  )}
                  {el.entrance !== 0 && (
                    <>
                      ,&nbsp;
                      п.&nbsp;
                      {el.entrance}
                    </>
                  )}
                  {el.tel !== '' && (
                    <>
                      ,&nbsp;
                      т.&nbsp;
                      {el.tel}
                    </>
                  )}
                </List.Item>
              ))}
            </List>
          </Stack>
        )}

        {currentActData.works.length !== 0 && (
          <AddActTable currentActData={currentActData} type={type} />
        )}

        {modalError && (
          <Group>
            <Text style={{ fontSize: 18, color: 'red' }}>{modalError}</Text>
          </Group>
        )}

        <ModalButtons
          confirmBtnTitle="Добавить акт"
          cancelBtnTitle="Отменить"
          handleCancel={handleClose}
          handleConfirm={handleAddActSubmit}
          disabled={!(actForm.organization
            && actForm.driver
            && actForm.car
            && actForm.actAdditionDate
            && actForm.selectedNotes.length
            && actForm.selectedContract
          )}
        />
      </Stack>
    </Modal>
  );
}

export default ActModal;
