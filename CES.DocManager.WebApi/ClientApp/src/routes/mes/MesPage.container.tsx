import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import MesPageComponent from './MesPage.component';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { INotesState } from '../../types/MesTypes';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');

  const { isAddActModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const { allNotes } = useSelector<RootState, INotesState>(
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

  const handleClick = () => {
    dispatch(toggleAddActModal(true));
  };

  return (
    <MesPageComponent
      isAddActModalOpen={isAddActModalOpen}
      handleClick={handleClick}
      allNotes={allNotes}
    />
  );
}

export default MesPageContainer;
