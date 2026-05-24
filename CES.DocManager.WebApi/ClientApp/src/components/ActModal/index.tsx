import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse } from 'date-fns';
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
import updateAct from 'redux/actions/mes/updateAct';
import { resetOrganizationsBySearch } from 'redux/reducers/mes/organizationReducer';
import {
  changeSelectedActId,
  editActsListAfterUpdate,
  resetActData,
  setActDataForEdit,
} from 'redux/reducers/mes/mesReducer';
import { resetCarsByCarNumber } from 'redux/reducers/vehicle/vehicleReducer';
import {
  editNotesWithoutActAfterAddAct,
  resetStreetsBySearch,
} from 'redux/reducers/mes/notesWithoutActReducer';
import {
  Act,
  ActModalFormState,
  INotesState,
} from 'types/MesTypes';
import { IVehicleResponse } from 'types/VehicleTypes';
import { IDriverResponse } from 'types/DriversType';
import { NoteFullContactInfo, NotesWithoutActState, NoteWithoutAct } from 'types/mes/NotesWithoutActTypes';
import { OrganizationState } from 'types/mes/OrganizationTypes';
import { ContractState, GetContractsListForSelectRes } from 'types/mes/ContractTypes';
import { resetContractsListForSelect } from 'redux/reducers/mes/contractReducer';
import handleError from 'utils';
import { getSharedNotesWorkAddress } from 'utils/noteWorkAddress';
import AddActTable from 'components/AddActTable';
import ModalButtons from 'components/ModalButtons';
import DatePicker from 'components/DatePicker';

import classes from './styles.module.css';

const mapActNoteToNoteWithoutAct = (note: NoteFullContactInfo): NoteWithoutAct => ({
  id: note.id,
  date: note.date,
  comment: '',
  isChecked: true,
  street: note.street,
  entrance: note.entrance,
  houseNumber: note.houseNumber,
  tel: note.tel,
});

const parseActDate = (dateString: string) => {
  try {
    return parse(dateString, 'dd-MM-yyyy HH:mm:ss', new Date());
  } catch {
    return new Date(dateString);
  }
};

const getCarNumberFromValue = (car: string) => {
  if (car.includes('(') && car.includes(')')) {
    return car.split('(')[1].replace(')', '').trim();
  }
  return car.trim();
};

const withCurrentOption = (currentValue: string, options: string[]) => (
  currentValue && !options.includes(currentValue)
    ? [currentValue, ...options]
    : options
);

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
  const [organizationSearchValue, setOrganizationSearchValue] = useState('');
  const [carSearchValue, setCarSearchValue] = useState('');

  const {
    totalActSumm,
    vat,
    actsList,
    selectedActId,
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
    if (editActModalOpened) return;

    const newSelectedNotes = notesWithoutAct.filter((note) => selectedNotesId.includes(note.id));
    updateActFormState('selectedNotes', newSelectedNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNotesId, editActModalOpened]);

  useEffect(() => {
    if (!editActModalOpened || !selectedActId) return;

    const act = actsList.find((item) => item.id === selectedActId);
    if (!act) return;

    changeType(act.actType);
    dispatch(setActDataForEdit({
      type: act.actType,
      works: act.works ?? [],
      total: act.total,
      vat: act.vat,
    }));

    const loadEditData = async () => {
      let carValue = act.numberPlateOfCar;

      if (act.numberPlateOfCar) {
        try {
          const cars = await dispatch(getCarByCarNumber(act.numberPlateOfCar)).unwrap();
          const matchedCar = cars.find((item) => item.includes(`(${act.numberPlateOfCar})`));
          if (matchedCar) {
            carValue = matchedCar;
          }
        } catch (error) {
          handleError(error, setModalError);
        }
      }

      setOrganizationSearchValue(act.organization);
      setCarSearchValue(carValue);

      setActForm({
        selectedNotes: (act.notesWithoutAct ?? []).map(mapActNoteToNoteWithoutAct),
        organization: act.organization,
        car: carValue,
        driver: act.driver,
        isSigned: act.isSigned,
        actAdditionDate: parseActDate(act.dateOfWorkCompletion),
        selectedContract: act.contractId ? String(act.contractId) : null,
      });
    };

    loadEditData().catch((error) => {
      handleError(error, setModalError);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editActModalOpened, selectedActId]);

  useEffect(() => {
    if (!actForm.car) {
      updateActFormState('driver', null);
      dispatch(resetDriversByCar());
      return;
    }

    const carNumber = getCarNumberFromValue(actForm.car);
    if (!carNumber) return;

    dispatch(getDriversByCarNumber(carNumber))
      .catch((error) => {
        handleError(error, setModalError);
      });
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
    dispatch(changeSelectedActId(0));
    setOrganizationSearchValue('');
    setCarSearchValue('');
    setModalError('');
    handleSelectNote([]);
    if (addActModalOpened) {
      addActModalClose();
    }
    if (editActModalOpened) {
      editActModalClose();
    }
  };

  const handleOrganizationSearchChange = (value: string) => {
    setOrganizationSearchValue(value);
    if (value.length === 1) {
      dispatch(organizationsBySearch(value)).catch((error) => {
        handleError(error, setModalError);
      });
      updateActFormState('organization', value);
      return;
    }
    if (value.length === 0) {
      updateActFormState('organization', '');
      dispatch(resetOrganizationsBySearch());
      return;
    }
    updateActFormState('organization', value);
  };

  const handleOrganizationChange = (value: string | null) => {
    if (value === null) {
      updateActFormState('organization', '');
      setOrganizationSearchValue('');
      dispatch(resetOrganizationsBySearch());
      return;
    }
    updateActFormState('organization', value);
    setOrganizationSearchValue(value);
  };

  const handleCarSearchChange = (value: string) => {
    setCarSearchValue(value);
    if (value.length === 1) {
      dispatch(getCarByCarNumber(value)).catch((error) => {
        handleError(error, setModalError);
      });
      updateActFormState('car', value);
      return;
    }
    if (value.length === 0) {
      updateActFormState('car', '');
      dispatch(resetCarsByCarNumber());
      return;
    }
    updateActFormState('car', value);
  };

  const handleCarChange = (value: string | null) => {
    if (value === null) {
      updateActFormState('car', '');
      setCarSearchValue('');
      dispatch(resetCarsByCarNumber());
      return;
    }
    updateActFormState('car', value);
    setCarSearchValue(value);
    updateActFormState('driver', null);
  };

  const organizationOptions = useMemo(
    () => withCurrentOption(actForm.organization, allOrganizationsBySearch),
    [actForm.organization, allOrganizationsBySearch],
  );

  const carOptions = useMemo(
    () => withCurrentOption(actForm.car, carsByCarNumber),
    [actForm.car, carsByCarNumber],
  );

  const driverOptions = useMemo(
    () => withCurrentOption(actForm.driver ?? '', driversByCarNumber),
    [actForm.driver, driversByCarNumber],
  );

  const { selectedContract: selectedContractId } = actForm;

  const contractOptions = useMemo(() => {
    const options = contractsListForSelect.map((contract) => {
      const creationDate = format(new Date(contract.creationDate), 'dd.MM.yyyy');
      return {
        value: contract.id.toString(),
        label: `Договор № ${contract.contractNumber} от ${creationDate} - ${contract.contractType}`,
      };
    });

    const hasSelectedContract = selectedContractId
      && !options.some((item) => item.value === selectedContractId);
    if (hasSelectedContract) {
      const act = actsList.find((item) => item.id === selectedActId);
      if (act?.contractNumber) {
        options.unshift({
          value: selectedContractId,
          label: `Договор № ${act.contractNumber}`,
        });
      }
    }

    return options;
  }, [actsList, selectedContractId, contractsListForSelect, selectedActId]);

  const handleActSubmit = () => {
    const {
      organization,
      driver,
      car,
      actAdditionDate,
      selectedNotes,
      isSigned,
      selectedContract,
    } = actForm;

    if (organization && driver && car && actAdditionDate && selectedContract) {
      const requestBody = {
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

      if (editActModalOpened) {
        dispatch(updateAct({ id: selectedActId, ...requestBody }))
          .unwrap()
          .then((payload) => {
            dispatch(editActsListAfterUpdate(payload));
            handleClose();
          })
          .catch((error) => {
            handleError(error, setModalError);
          });
        return;
      }

      dispatch(createNewAct(requestBody))
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
          data={organizationOptions}
          searchable
          searchValue={organizationSearchValue}
          onSearchChange={handleOrganizationSearchChange}
          onChange={handleOrganizationChange}
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
            data={carOptions}
            searchable
            searchValue={carSearchValue}
            onSearchChange={handleCarSearchChange}
            onChange={handleCarChange}
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
            data={driverOptions}
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
          data={contractOptions}
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
          confirmBtnTitle={editActModalOpened ? 'Сохранить' : 'Добавить акт'}
          cancelBtnTitle="Отменить"
          handleCancel={handleClose}
          handleConfirm={handleActSubmit}
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
