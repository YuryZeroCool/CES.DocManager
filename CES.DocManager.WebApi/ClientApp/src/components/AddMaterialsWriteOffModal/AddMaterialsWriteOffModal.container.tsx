import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addDecommissionedMaterial from '../../redux/actions/report/materialReport/addDecommissionedMaterials';
import getAllAttachedMaterials from '../../redux/actions/report/materialReport/getAllAttachedMaterials';
import getAllMechanics from '../../redux/actions/report/materialReport/getAllMechanics';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddMaterialsWriteOffModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IDecommissionedMaterialRequest,
  IMaterialAttachedResponse,
  IMaterialsResponse,
  IMaterialsWriteOffForm,
  ITableAttachedMaterials,
} from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import AddMaterialsWriteOffModalComponent from './AddMaterialsWriteOffModal.component';

const defaultFormValues: IMaterialsWriteOffForm = {
  currentDate: null,
  mechanic: '',
  car: '',
  materialsByCar: [],
};

const tableAttachedMaterials: ITableAttachedMaterials = {
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
  currentCount: 0,
};

const defaultMaterialsArr: ITableAttachedMaterials[] = [
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
  tableAttachedMaterials,
];

function AddMaterialsWriteOffModalContainer() {
  const [mechanicsError, setMechanicsError] = useState<string>('');

  const [attachedMaterialsByCar, setAttachedMaterialsByCar] = useState<
  IMaterialAttachedResponse[]>([]);

  const [checkedAttachedMaterials, setCheckedAttachedMaterials] = useState<
  IMaterialAttachedResponse[]>([]);

  const [tableAttachedMaterialsArray, setTableAttachedMaterialsArray] = useState<
  ITableAttachedMaterials[]>(defaultMaterialsArr);

  const [formState, setFormState] = useState<IMaterialsWriteOffForm>(defaultFormValues);

  const { allMechanics, allAttachedMaterials } = useSelector<RootState, IMaterialsResponse>(
    (state) => state.materials,
  );

  const { isAddMaterialsWriteOffModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const getCarData = (value: string) => {
    const carInfo = value.split(' ');
    const carData = {
      carBrand: carInfo.splice(0, 1)[0],
      carNumber: carInfo.join(' ').slice(1, -1),
    };
    return carData;
  };

  const getAttachedMaterialsByCar = (value: string) => {
    const carData = getCarData(value);
    setAttachedMaterialsByCar(allAttachedMaterials.filter(
      (el: IMaterialAttachedResponse) => el.vehicleBrand === carData.carBrand
      && el.numberPlateCar === carData.carNumber,
    ));
  };

  const getCheckedAttachedMaterials = (materialsByCar: string[]) => {
    const arr: IMaterialAttachedResponse[] = [];
    materialsByCar.forEach((el) => {
      arr.push(...attachedMaterialsByCar.filter((material) => el === material.nameMaterial));
    });
    setCheckedAttachedMaterials([...arr]);
  };

  useEffect(() => {
    async function getMechanics(): Promise<void> {
      try {
        await dispatch(getAllMechanics(''));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setMechanicsError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMechanics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAttachedMaterialsByCar(formState.car);
    setFormState((prevFormState) => ({ ...prevFormState, materialsByCar: [] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.car]);

  useEffect(() => {
    getCheckedAttachedMaterials(formState.materialsByCar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.materialsByCar]);

  useEffect(() => {
    const lastIndex = checkedAttachedMaterials.length - 1;
    const materials = [...tableAttachedMaterialsArray];
    materials[lastIndex] = { ...materials[lastIndex], ...checkedAttachedMaterials[lastIndex] };
    for (let i = lastIndex + 1; i < materials.length; i += 1) {
      materials[i] = { ...materials[i], ...tableAttachedMaterials };
    }
    setTableAttachedMaterialsArray(materials);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedAttachedMaterials]);

  const getAllAttachedCars = () => {
    const attachedCars: string[] = [];
    allAttachedMaterials.forEach((el: IMaterialAttachedResponse) => {
      const str = `${el.vehicleBrand} (${el.numberPlateCar})`;
      if (attachedCars.indexOf(str) === -1) {
        attachedCars.push(str);
      }
    });
    return attachedCars;
  };

  const handleClose = () => {
    dispatch(toggleAddMaterialsWriteOffModal(false));
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'mechanic') {
      setFormState((prevFormState) => ({ ...prevFormState, mechanic: event.target.value }));
    }
    if (event.target.name === 'car') {
      setFormState((prevFormState) => ({ ...prevFormState, car: event.target.value }));
    }
  };

  const changeMaterialsByCar = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormState((prevFormState) => (
      {
        ...prevFormState,
        materialsByCar: typeof value === 'string' ? value.split(',') : value,
      }
    ));
  };

  const changeCurrentDate = (value: Date | null) => {
    setFormState((prevFormState) => ({ ...prevFormState, currentDate: value }));
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const materials = [...tableAttachedMaterialsArray];
    const index = materials.findIndex((el) => el.id === id);
    materials[index] = { ...materials[index], currentCount: Number(event.target.value) };
    setTableAttachedMaterialsArray(materials);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const decommissionedMaterials = tableAttachedMaterialsArray.filter((el) => el.nameMaterial !== '');
    const allMaterials: IMaterialAttachedResponse[] = decommissionedMaterials.map((el) => {
      const newEl: IMaterialAttachedResponse = {
        accountName: el.accountName,
        count: el.currentCount,
        dateCreated: el.dateCreated,
        id: el.id,
        nameMaterial: el.nameMaterial,
        nameParty: el.nameParty,
        numberPlateCar: el.numberPlateCar,
        partyDate: el.partyDate,
        price: el.price,
        unit: el.unit,
        vehicleBrand: el.vehicleBrand,
        vehicleModel: el.vehicleModel,
      };
      return newEl;
    });
    const data: IDecommissionedMaterialRequest = {
      carMechanic: formState.mechanic,
      currentDate: formState.currentDate,
      materials: allMaterials,
    };
    try {
      await dispatch(addDecommissionedMaterial(data));
      await dispatch(getAllAttachedMaterials(''));
      dispatch(toggleAddMaterialsWriteOffModal(false));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setMechanicsError(error.message);
      }
    }
  };

  return (
    <AddMaterialsWriteOffModalComponent
      isAddMaterialsWriteOffModalOpen={isAddMaterialsWriteOffModalOpen}
      formState={formState}
      allMechanics={allMechanics}
      attachedMaterialsByCar={attachedMaterialsByCar}
      tableAttachedMaterialsArray={tableAttachedMaterialsArray}
      handleClose={handleClose}
      handleChange={handleChange}
      changeCurrentDate={changeCurrentDate}
      changeMaterialsByCar={changeMaterialsByCar}
      attachedCars={getAllAttachedCars()}
      handleNumberChange={handleNumberChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddMaterialsWriteOffModalContainer;
