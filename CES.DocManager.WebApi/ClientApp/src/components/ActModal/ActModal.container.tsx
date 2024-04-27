import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInputState } from '@mantine/hooks';

import { IAuthResponseType } from '../../redux/store/configureStore';
import { resetDriversByCar } from '../../redux/reducers/drivers/driversReducer';
import { RootState } from '../../redux/reducers/combineReducers';
import organizationsBySearch from '../../redux/actions/mes/organizationsBySearch';
import getCarByCarNumber from '../../redux/actions/vehicle/getCarByCarNumber';
import getDriversByCarNumber from '../../redux/actions/drivers/getDriversByCarNumber';
import createNewAct from '../../redux/actions/mes/createNewAct';
import {
  editNotesWithoutActAfterAddAct,
  resetActData,
  resetOrganizationsBySearch,
  resetStreetsBySearch,
} from '../../redux/reducers/mes/mesReducer';
import { resetCarsByCarNumber } from '../../redux/reducers/vehicle/vehicleReducer';
import {
  Act,
  AddNewActReq,
  IFullNoteData,
  INotesState,
} from '../../types/MesTypes';
import { IVehicleResponse } from '../../types/VehicleTypes';
import { IDriverResponse } from '../../types/DriversType';
import handleError from '../../utils';
import ActModalComponent from './ActModal.component';

interface Props {
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

function ActModalContainer(props: Props) {
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

  const [selectedNotes, setSelectedNotes] = useInputState<IFullNoteData[]>([]);
  const [organization, setOrganization] = useInputState('');
  const [car, setCar] = useInputState('');
  const [driver, setDriver] = useState<string | null>(null);
  const [actAdditionDate, setActAdditionDate] = useState<Date | null>(null);
  const [modalError, setModalError] = useState<string>('');

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
    dispatch(resetCarsByCarNumber());
    dispatch(resetDriversByCar());
    dispatch(resetActData(type));
    dispatch(resetOrganizationsBySearch());
    dispatch(resetStreetsBySearch());
    setModalError('');
    handleSelectNote([]);
    setSelectedNotes([]);
    if (addActModalOpened) {
      addActModalClose();
    }
    if (editActModalOpened) {
      editActModalClose();
    }
  };

  const handleOrganizationsInputChange = (value: string | null) => {
    if (value === null) {
      setOrganization('');
      dispatch(resetOrganizationsBySearch());
      return;
    }
    if (value.length === 1) {
      dispatch(organizationsBySearch(value))
        .then(() => {
          setOrganization(value);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });

      return;
    }
    if (value.length === 0) {
      setOrganization('');
      dispatch(resetOrganizationsBySearch());
    }

    setOrganization(value);
  };

  const handleCarInputChange = (value: string | null) => {
    if (value === null) {
      setCar('');
      dispatch(resetCarsByCarNumber());
      return;
    }
    if (value.length === 1) {
      dispatch(getCarByCarNumber(value))
        .then(() => {
          setCar(value);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });

      return;
    }
    if (value.length === 0) {
      setCar('');
      dispatch(resetCarsByCarNumber());
    }

    setCar(value);
  };

  const handleDriverSelectChange = (value: string | null) => {
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
        totalActSumm: +(+totalActSumm).toFixed(2),
        vat: +(+vat).toFixed(2),
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
    <ActModalComponent
      currentActData={currentActData}
      isAddActModalOpen={addActModalOpened}
      isEditActModalOpen={editActModalOpened}
      type={type}
      organization={organization}
      allOrganizationsBySearch={allOrganizationsBySearch}
      carsByCarNumber={carsByCarNumber}
      car={car}
      driversByCarNumber={driversByCarNumber}
      driver={driver}
      actAdditionDate={actAdditionDate}
      modalError={modalError}
      selectedNotesId={selectedNotesId}
      selectedNotes={selectedNotes}
      handleClose={handleClose}
      handleOrganizationsInputChange={handleOrganizationsInputChange}
      handleCarInputChange={handleCarInputChange}
      handleDriverSelectChange={handleDriverSelectChange}
      handleActAdditionDateChange={handleActAdditionDateChange}
      handleAddActSubmit={handleAddActSubmit}
    />
  );
}

export default ActModalContainer;
