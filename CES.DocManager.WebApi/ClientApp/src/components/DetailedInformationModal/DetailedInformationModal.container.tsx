import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleDetailedInformationModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IAllDecommissionedMaterials, IMaterialsResponse } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import DetailedInformationModalComponent from './DetailedInformationModal.component';

const defaultData: IAllDecommissionedMaterials = {
  id: 0,
  carMechanic: '',
  currentDate: null,
  materials: [],
};

function DetailedInformationModalContainer() {
  const [repairInfo, setRepairInfo] = useState<IAllDecommissionedMaterials>(defaultData);
  const { isDetailedInformationModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const { rowActiveId, allDecommissionedMaterials } = useSelector<RootState, IMaterialsResponse>(
    (state) => state.materials,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    setRepairInfo(
      allDecommissionedMaterials.filter((currentValue) => currentValue.id === rowActiveId)[0],
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    dispatch(toggleDetailedInformationModal(false));
  };

  return (
    <DetailedInformationModalComponent
      isDetailedInformationModalOpen={isDetailedInformationModalOpen}
      repairInfo={repairInfo}
      handleClose={handleClose}
    />
  );
}

export default DetailedInformationModalContainer;
