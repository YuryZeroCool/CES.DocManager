import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';

import MesPageComponent from './MesPage.component';

function MesPageContainer() {
  const { isAddActModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );
  const dispatch: IAuthResponseType = useDispatch();

  const handleClick = () => {
    dispatch(toggleAddActModal(true));
  };

  return (
    <MesPageComponent
      isAddActModalOpen={isAddActModalOpen}
      handleClick={handleClick}
    />
  );
}

export default MesPageContainer;
