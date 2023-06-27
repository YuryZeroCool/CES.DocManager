import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal, toggleAddOrganizationModal } from '../../redux/reducers/modals/modalsReducer';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import MesPageComponent from './MesPage.component';
import { IModal } from '../../types/type';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');

  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    dispatch(getAllNotes())
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          setMesError(error.message);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddActBtnClick = () => {
    dispatch(toggleAddActModal(true));
  };

  const handleAddOrganizationBtnClick = () => {
    dispatch(toggleAddOrganizationModal(true));
  };

  return (
    <MesPageComponent
      isAddActModalOpen={isAddActModalOpen}
      isEditNoteModalOpen={isEditNoteModalOpen}
      isAddOrganizationModalOpen={isAddOrganizationModalOpen}
      mesError={mesError}
      handleAddActBtnClick={handleAddActBtnClick}
      handleAddOrganizationBtnClick={handleAddOrganizationBtnClick}
    />
  );
}

export default MesPageContainer;
