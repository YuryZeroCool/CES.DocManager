import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCombobox } from '@mantine/core';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { resetDriversByCar } from '../../redux/reducers/drivers/driversReducer';
import { RootState } from '../../redux/reducers/combineReducers';
import organizationsBySearch from '../../redux/actions/mes/organizationsBySearch';
import getCarByCarNumber from '../../redux/actions/vehicle/getCarByCarNumber';
import getDriversByCarNumber from '../../redux/actions/drivers/getDriversByCarNumber';
import createNewAct from '../../redux/actions/mes/createNewAct';
import { resetActData } from '../../redux/reducers/mes/mesReducer';
import {
  Act,
  AddNewActReq,
  IFullNoteData,
  INotesState,
} from '../../types/MesTypes';
import { IVehicleResponse } from '../../types/VehicleTypes';
import { IDriverResponse } from '../../types/DriversType';
import AddActModalComponent from './AddActModal.component';
import handleError from '../../utils';

interface Props {
  selectedNotesId: number[];
  currentActData: Act;
  type: string;
  addActModalOpened: boolean;
  addActModalClose: () => void;
  resetCurrentActData: () => void;
  changeType: (value: string) => void;
}

function AddActModalContainer(props: Props) {
  const {
    selectedNotesId,
    currentActData,
    type,
    addActModalOpened,
    addActModalClose,
    resetCurrentActData,
    changeType,
  } = props;

  const [selectedNotes, setSelectedNotes] = useState<IFullNoteData[]>([]);
  const [organization, setOrganization] = useState<string>('');
  const [car, setCar] = useState<string>('');
  const [driver, setDriver] = useState<string | null>(null);
  const [actAdditionDate, setActAdditionDate] = useState<Date | null>(null);
  const [modalError, setModalError] = useState<string>('');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const driverCombobox = useCombobox({
    onDropdownClose: () => driverCombobox.resetSelectedOption(),
  });

  const {
    notesWithoutAct,
    allOrganizationsBySearch,
    totalActSumm,
    vat,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
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

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    const newSelectedNotes = notesWithoutAct.filter((note) => selectedNotesId.includes(note.id));

    setSelectedNotes(newSelectedNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNotesId]);

  useEffect(() => {
    if (car !== '' && car.includes('(') && car.includes(')')) {
      const carNumber = car.split('(');
      dispatch(getDriversByCarNumber(carNumber[1].replace(')', '')))
        .catch((error) => {
          handleError(error, setModalError);
        });
    } else {
      setDriver(null);
      dispatch(resetDriversByCar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);

  const handleClose = () => {
    changeType('');
    resetCurrentActData();
    setOrganization('');
    setCar('');
    setDriver(null);
    setActAdditionDate(null);
    dispatch(resetDriversByCar());
    dispatch(resetActData(type));
    setModalError('');
    addActModalClose();
  };

  const handleOrganizationsInputChange = (value: string) => {
    if (organization !== value) {
      dispatch(organizationsBySearch(value))
        .then(() => {
          setOrganization(value);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  const changeCarInputValue = (value: string) => {
    setCar(value);
  };

  const handleCarInputChange = (value: string) => {
    changeCarInputValue(value);

    dispatch(getCarByCarNumber(value))
      .then(() => {
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
      })
      .catch((error) => {
        handleError(error, setModalError);
      });
  };

  const handleDriverSelectChange = (value: string) => {
    setDriver(value);
  };

  const handleActAdditionDateChange = (value: Date | null) => {
    setActAdditionDate(value);
  };

  const handleAddActSubmit = () => {
    if (organization && driver && car && actAdditionDate) {
      const request: AddNewActReq = {
        organization,
        vehicle: car,
        driver,
        actAdditionDate,
        actType: currentActData.type,
        completedWorks: currentActData.works,
        notesWithoutAct: selectedNotes,
        totalActSumm,
        vat,
      };

      dispatch(createNewAct(request))
        .then(() => handleClose())
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  return (
    <AddActModalComponent
      currentActData={currentActData}
      isAddActModalOpen={addActModalOpened}
      type={type}
      organization={organization}
      allOrganizationsBySearch={allOrganizationsBySearch}
      carsByCarNumber={carsByCarNumber}
      car={car}
      combobox={combobox}
      driverCombobox={driverCombobox}
      driversByCarNumber={driversByCarNumber}
      driver={driver}
      actAdditionDate={actAdditionDate}
      modalError={modalError}
      handleClose={handleClose}
      handleOrganizationsInputChange={handleOrganizationsInputChange}
      handleCarInputChange={handleCarInputChange}
      changeCarInputValue={changeCarInputValue}
      handleDriverSelectChange={handleDriverSelectChange}
      handleActAdditionDateChange={handleActAdditionDateChange}
      handleAddActSubmit={handleAddActSubmit}
    />
  );
}

export default AddActModalContainer;
