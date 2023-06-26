import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal } from '../../redux/reducers/modals/modalsReducer';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import MesPageComponent from './MesPage.component';
import { IModal } from '../../types/type';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');

  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
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

  const handleClick = () => {
    dispatch(toggleAddActModal(true));
  };

  return (
    <MesPageComponent
      isAddActModalOpen={isAddActModalOpen}
      isEditNoteModalOpen={isEditNoteModalOpen}
      mesError={mesError}
      handleClick={handleClick}
    />
  );
}

export default MesPageContainer;
