import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addUsedMaterial from '../../redux/actions/report/materialReport/addUsedMaterial';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddUsedMaterialModal } from '../../redux/reducers/modals/modalsReducer';
import { editAllMaterialsWritingOffMaterial } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IAddUsedMaterialRequest,
  IMaterialsResponse,
  Product,
} from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import AddUsedMaterialModalComponent from './AddUsedMaterialModal.component';

const defaultUsedMaterial: Product = {
  id: 0,
  name: '',
  party: [],
  unit: '',
};

function AddUsedMaterialModalContainer() {
  const [usedMaterialModalError, setUsedMaterialModalError] = useState<string>('');
  const [currentMaterial, setCurrentMaterial] = useState<Product>(defaultUsedMaterial);
  const [currentMaterialCount, setCurrentMaterialCount] = useState<number>(1);
  const [maxNumber, setMaxNumber] = useState<number>(0);

  const { isAddUsedMaterialModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const materials = useSelector<RootState, Product[]>((state) => state.materials.getAllMaterials);

  const {
    rowActiveId,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    const chosenMaterial = materials.filter(
      (material: Product) => material.party.filter((el) => el.partyId === rowActiveId).length !== 0,
    )[0];
    const chosenMaterialParty = chosenMaterial.party.filter(
      (el) => el.partyId === rowActiveId,
    )[0];
    const data: Product = {
      id: chosenMaterial.id,
      name: chosenMaterial.name,
      party: [{ ...chosenMaterialParty, count: currentMaterialCount }],
      unit: chosenMaterial.unit,
    };
    setCurrentMaterial(data);
    setMaxNumber(chosenMaterialParty.count);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentMaterial((prevCurrentMaterial) => ({
      ...prevCurrentMaterial,
      party: [{ ...prevCurrentMaterial.party[0], count: currentMaterialCount }],
    }));
  }, [currentMaterialCount]);

  const handleClose = () => {
    dispatch(toggleAddUsedMaterialModal(false));
  };

  const onSubmit = async () => {
    try {
      const data: IAddUsedMaterialRequest = {
        count: currentMaterialCount,
        partyName: currentMaterial.party.filter((el) => el.partyId === rowActiveId)[0].partyName,
      };
      await dispatch(addUsedMaterial(data));
      dispatch(editAllMaterialsWritingOffMaterial(currentMaterial));
      dispatch(toggleAddUsedMaterialModal(false));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setUsedMaterialModalError(error.message);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMaterialCount(Number(event.target.value));
  };

  return (
    <AddUsedMaterialModalComponent
      isAddUsedMaterialModalOpen={isAddUsedMaterialModalOpen}
      currentMaterial={currentMaterial}
      maxNumber={maxNumber}
      currentMaterialCount={currentMaterialCount}
      handleClose={handleClose}
      handleChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    />
  );
}

export default AddUsedMaterialModalContainer;
