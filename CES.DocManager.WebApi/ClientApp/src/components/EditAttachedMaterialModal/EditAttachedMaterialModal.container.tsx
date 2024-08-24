import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import patchAttachedMaterial from '../../redux/actions/report/materialReport/patchAttachedMaterial';
import getAllBrands from '../../redux/actions/vehicle/getAllBrands';
import getNumbersPlateOfCar from '../../redux/actions/vehicle/getNumbersPlateOfCar';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleEditAttachedMaterialModal } from '../../redux/reducers/modals/modalsReducer';
import { editAttachedMaterial, resetEditedAttachedMaterial } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IMaterialAttachedResponse,
  IMaterialsResponse,
  IPatchAttachedMaterialData,
  Product,
} from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import { IVehicleResponse } from '../../types/VehicleTypes';
import EditAttachedMaterialModalComponent from './EditAttachedMaterialModal.component';

const defaultAttachedMaterial: IMaterialAttachedResponse = {
  id: 0,
  nameMaterial: '',
  nameParty: '',
  partyDate: '',
  unit: '',
  price: 0,
  count: 0,
  dateCreated: '',
  vehicleBrand: '',
  vehicleModel: '',
  numberPlateCar: '',
  accountName: '',
};

function EditAttachedMaterialModalContainer() {
  const [
    currentMaterial,
    setCurrentMaterial,
  ] = useState<IMaterialAttachedResponse>(defaultAttachedMaterial);

  const [modalError, setModalError] = useState<string>('');

  const [maxNumber, setMaxNumber] = useState<number>(0);

  const [editedProperties, setEditedProperties] = useState<IPatchAttachedMaterialData[]>([]);

  const { isEditAttachedMaterialModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const { allMaterials } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const { allBrands, numbersPlateOfCar } = useSelector<RootState,
  IVehicleResponse>((state) => state.vehicle);

  const {
    rowActiveId,
    allAttachedMaterials,
    editedAttachedMaterial,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  async function getCarInfo(): Promise<void> {
    try {
      await dispatch(getAllBrands(''));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setModalError(error.message);
      }
    }
  }

  async function getCarNumber(): Promise<void> {
    try {
      await dispatch(getNumbersPlateOfCar(currentMaterial.vehicleBrand));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setModalError(error.message);
      }
    }
  }

  async function getMaterials(accountName: string): Promise<void> {
    try {
      await dispatch(getAllMaterials(accountName));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setModalError(error.message);
      }
    }
  }

  const setProperties = (property: string, value: string) => {
    const el: IPatchAttachedMaterialData = {
      op: 'replace',
      path: property,
      value,
    };
    if (editedProperties.length === 0) {
      setEditedProperties([el]);
    } else {
      const index = editedProperties.findIndex((elem) => elem.path === property);
      if (index === -1) {
        setEditedProperties((prevEditedProperties) => ([...prevEditedProperties, el]));
      } else {
        const newEditedProperties = [...editedProperties];
        newEditedProperties[index] = { ...el };
        setEditedProperties(newEditedProperties);
      }
    }
  };

  const createMaxNumber = (currentElem: IMaterialAttachedResponse) => {
    const chosenMaterial = allMaterials.filter(
      (material: Product) => material.party.filter(
        (el) => el.partyName === currentElem.nameParty,
      ).length !== 0,
    );
    if (chosenMaterial.length !== 0) {
      const chosenMaterialParty = chosenMaterial[0].party.filter(
        (el) => el.partyName === currentElem.nameParty,
      );
      if (chosenMaterialParty.length !== 0) {
        setMaxNumber(chosenMaterialParty[0].count + currentElem.count);
      }
    }
  };

  useEffect(() => {
    const currentElem = allAttachedMaterials.filter((el) => el.id === rowActiveId)[0];
    setCurrentMaterial(currentElem);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCarInfo();

    if (allMaterials.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getMaterials(currentElem.accountName);
    } else {
      createMaxNumber(currentElem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createMaxNumber(currentMaterial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMaterials.length]);

  useEffect(() => {
    if (editedAttachedMaterial.accountName !== '') {
      try {
        setModalError('');
        dispatch(editAttachedMaterial(editedAttachedMaterial));
        dispatch(resetEditedAttachedMaterial());
        dispatch(toggleEditAttachedMaterialModal(false));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setModalError(`Не удалось отредактировать материал. ${error.message} Перезагрузите страницу.`);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedAttachedMaterial]);

  useEffect(() => {
    if (currentMaterial.vehicleBrand !== '') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getCarNumber();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMaterial.vehicleBrand]);

  const handleClose = () => {
    dispatch(toggleEditAttachedMaterialModal(false));
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'brandSelect') {
      setCurrentMaterial((prevCurrentMaterial) => (
        {
          ...prevCurrentMaterial,
          vehicleBrand: event.target.value,
          numberPlateCar: '',
        }
      ));
      setProperties('/VehicleBrand', event.target.value);
    }
    if (event.target.name === 'numbersPlateSelect') {
      setCurrentMaterial((prevCurrentMaterial) => (
        { ...prevCurrentMaterial, numberPlateCar: event.target.value }
      ));
      setProperties('/NumberPlateCar', event.target.value);
    }
    if (event.target.name === 'attachedMaterialNumber') {
      setCurrentMaterial((prevCurrentMaterial) => (
        { ...prevCurrentMaterial, count: Math.round((Number(event.target.value)) * 1000) / 1000 }
      ));
      setProperties('/Count', event.target.value);
    }
    setModalError('');
  };

  const handleSubmit = async () => {
    try {
      await dispatch(patchAttachedMaterial({
        id: rowActiveId,
        data: editedProperties,
      }));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setModalError(error.message);
      }
    }
  };

  return (
    <EditAttachedMaterialModalComponent
      isEditAttachedMaterialModalOpen={isEditAttachedMaterialModalOpen}
      allBrands={allBrands}
      numbersPlateOfCar={numbersPlateOfCar}
      currentMaterial={currentMaterial}
      maxNumber={maxNumber}
      modalError={modalError}
      handleClose={handleClose}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default EditAttachedMaterialModalContainer;
