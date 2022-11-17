import { SelectChangeEvent } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAttachedMaterial from '../../redux/actions/report/materialReport/createAttachedMaterial';
import getAllBrands from '../../redux/actions/vehicle/getAllBrands';
import getNumbersPlateOfCar from '../../redux/actions/vehicle/getNumbersPlateOfCar';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleCarAttachmentModal } from '../../redux/reducers/modals/modalsReducer';
import { changeAttachedMaterial, resetAttachedMaterial, resetCreatedAttachedMaterial } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { MaterialAttached } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import { IVehicleResponse } from '../../types/VehicleTypes';
import CarAttachmentModalComponent from './CarAttachmentModal.component';

function CarAttachmentModalContainer() {
  const { isCarAttachmentModalOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const { allBrands, numbersPlateOfCar } = useSelector<RootState,
  IVehicleResponse>((state) => state.vehicle);

  const attachedMaterial = useSelector<RootState,
  MaterialAttached>((state) => state.materials.attachedMaterial);

  const [modalError, setModalError] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [numbersPlateOfCarState, setNumbersPlateOfCarState] = useState<string>('');
  const [attachedMaterialNumber, setAttachedMaterialNumber] = useState<number>(0);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getBrands(): Promise<void> {
      try {
        await dispatch(getAllBrands(''));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setModalError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBrands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getNumbersPlate(): Promise<void> {
      try {
        if (brand !== '') {
          await dispatch(getNumbersPlateOfCar(brand));
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setModalError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getNumbersPlate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  useEffect(() => {
    async function addAttachedMaterial(): Promise<void> {
      try {
        if (attachedMaterial.brand !== '' && attachedMaterial.numberPlateOfCar !== '') {
          await dispatch(createAttachedMaterial(attachedMaterial));
          dispatch(resetAttachedMaterial());
          dispatch(resetCreatedAttachedMaterial());
          dispatch(toggleCarAttachmentModal(false));
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setModalError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addAttachedMaterial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachedMaterial.numberPlateOfCar]);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'brandSelect') {
      setBrand(event.target.value);
    }
    if (event.target.name === 'numbersPlateSelect') {
      setNumbersPlateOfCarState(event.target.value);
    }
    if (event.target.name === 'attachedMaterialNumber') {
      setAttachedMaterialNumber(Number(event.target.value));
    }
  };

  const handleClose = () => {
    dispatch(toggleCarAttachmentModal(false));
  };

  const handleSubmit = () => {
    dispatch(changeAttachedMaterial({
      brand,
      numberPlateOfCar: numbersPlateOfCarState,
      count: attachedMaterialNumber,
    }));
  };

  return (
    <CarAttachmentModalComponent
      brand={brand}
      unit={attachedMaterial.unit}
      numbersPlateOfCarState={numbersPlateOfCarState}
      attachedMaterialNumber={attachedMaterialNumber}
      maxNumber={attachedMaterial.count !== undefined ? attachedMaterial.count : 0}
      isCarAttachmentModalOpen={isCarAttachmentModalOpen}
      allBrands={allBrands}
      numbersPlateOfCar={numbersPlateOfCar}
      handleClose={handleClose}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default CarAttachmentModalContainer;
