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
import { editNotesWithoutActAfterAddAct, resetActData } from '../../redux/reducers/mes/mesReducer';
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
import getStreetsBySearch from '../../redux/actions/mes/getStreetsBySearch';

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

function AddActModalContainer(props: Props) {
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

  const [selectedNotes, setSelectedNotes] = useState<IFullNoteData[]>([]);
  const [organization, setOrganization] = useState<string>('');
  const [car, setCar] = useState<string>('');
  const [driver, setDriver] = useState<string | null>(null);
  const [actAdditionDate, setActAdditionDate] = useState<Date | null>(null);
  const [modalError, setModalError] = useState<string>('');
  const [counter, setCounter] = useState<number>(1);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const driverCombobox = useCombobox({
    onDropdownClose: () => driverCombobox.resetSelectedOption(),
  });

  const {
    notesWithoutAct,
    allOrganizationsBySearch,
    streetsBySearch,
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
    if (selectedNotesId.length === 0 && addActModalOpened) {
      const currentDate = new Date();
      currentDate.setHours(12, 0, 0);
      setSelectedNotes([{
        id: counter,
        comment: '',
        date: currentDate.toISOString(),
        entrance: 0,
        houseNumber: '',
        isChecked: true,
        street: '',
        tel: '',
      }]);
      setCounter((prevCounter) => (prevCounter + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addActModalOpened]);

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
    handleSelectNote([]);
    if (selectedNotesId.length === 0) {
      setSelectedNotes([]);
      setCounter(1);
    }
    if (addActModalOpened) {
      addActModalClose();
    }
    if (editActModalOpened) {
      editActModalClose();
    }
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

  const handleStreetSearchChange = (value: string, index: number) => {
    if (selectedNotes[index].street !== value) {
      dispatch(getStreetsBySearch(value))
        .then(() => {
          const updatedSelectedNotes = selectedNotes.map((el, i) => {
            if (i === index) {
              return { ...el, street: value };
            }
            return el;
          });
          setSelectedNotes(updatedSelectedNotes);
        })
        .catch((error) => {
          handleError(error, setModalError);
        });
    }
  };

  const handleEntranceChange = (value: string, index: number) => {
    const updatedSelectedNotes: IFullNoteData[] = selectedNotes.map((el, i) => {
      if (i === index) {
        return { ...el, entrance: Number(value) };
      }
      return el;
    });
    setSelectedNotes(updatedSelectedNotes);
  };

  const handleHouseNumberChange = (value: string, index: number) => {
    const updatedSelectedNotes: IFullNoteData[] = selectedNotes.map((el, i) => {
      if (i === index) {
        return { ...el, houseNumber: value };
      }
      return el;
    });
    setSelectedNotes(updatedSelectedNotes);
  };

  const handleTelChange = (value: string, index: number) => {
    const updatedSelectedNotes: IFullNoteData[] = selectedNotes.map((el, i) => {
      if (i === index) {
        return { ...el, tel: value };
      }
      return el;
    });
    setSelectedNotes(updatedSelectedNotes);
  };

  const handleAddButtonClick = () => {
    const currentDate = new Date();
    currentDate.setHours(12, 0, 0);
    setSelectedNotes((prevFormState) => ([
      ...prevFormState,
      {
        id: counter,
        comment: '',
        date: currentDate.toISOString(),
        entrance: 0,
        houseNumber: '',
        isChecked: true,
        street: '',
        tel: '',
      },
    ]));
    setCounter((prevCounter) => (prevCounter + 1));
  };

  const handleDeleteButtonClick = (id: number) => {
    if (selectedNotes.length > 1) {
      const newArr = selectedNotes.filter((el) => el.id !== id);
      setSelectedNotes(newArr);
    }
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
    <AddActModalComponent
      currentActData={currentActData}
      isAddActModalOpen={addActModalOpened}
      isEditActModalOpen={editActModalOpened}
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
      selectedNotesId={selectedNotesId}
      selectedNotes={selectedNotes}
      streetsBySearch={streetsBySearch}
      handleStreetSearchChange={handleStreetSearchChange}
      handleEntranceChange={handleEntranceChange}
      handleHouseNumberChange={handleHouseNumberChange}
      handleTelChange={handleTelChange}
      handleAddButtonClick={handleAddButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
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
