import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal, toggleAddOrganizationModal } from '../../redux/reducers/modals/modalsReducer';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import MesPageComponent from './MesPage.component';
import { changeMesPageType } from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';
import getOrganizations from '../../redux/actions/mes/getOrganizations';
import { IModal } from '../../types/type';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');

  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const {
    mesPageType,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
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

  useEffect(() => {
    if (mesPageType === 'Заявки') {
      setMesError('');
      dispatch(getAllNotes())
        .catch((error) => {
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
        });
    }
    if (mesPageType === 'Организации') {
      setMesError('');
      dispatch(getOrganizations())
        .catch((error) => {
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesPageType]);

  const handleAddActBtnClick = () => {
    dispatch(toggleAddActModal(true));
  };

  const handleAddOrganizationBtnClick = () => {
    dispatch(toggleAddOrganizationModal(true));
  };

  const handleChangeMesPageType = (value: string) => {
    dispatch(changeMesPageType(value));
  };

  const handleChangeErrorMessage = (value: string) => {
    setMesError(value);
  };

  return (
    <MesPageComponent
      isAddActModalOpen={isAddActModalOpen}
      isEditNoteModalOpen={isEditNoteModalOpen}
      isAddOrganizationModalOpen={isAddOrganizationModalOpen}
      isEditOrganizationModalOpen={isEditOrganizationModalOpen}
      mesError={mesError}
      mesPageType={mesPageType}
      handleAddActBtnClick={handleAddActBtnClick}
      handleAddOrganizationBtnClick={handleAddOrganizationBtnClick}
      handleChangeMesPageType={handleChangeMesPageType}
      handleChangeErrorMessage={handleChangeErrorMessage}
    />
  );
}

export default MesPageContainer;
