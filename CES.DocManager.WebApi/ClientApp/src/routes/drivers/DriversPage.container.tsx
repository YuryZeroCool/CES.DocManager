import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddDriverModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import DriversPageComponent from './DriversPage.component';

function DriversPageContainer() {
  const { isAddDriverModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );
  const dispatch: IAuthResponseType = useDispatch();

  const handleClick = () => {
    dispatch(toggleAddDriverModal(true));
  };

  return (
    <DriversPageComponent
      handleClick={handleClick}
      isAddDriverModalOpen={isAddDriverModalOpen}
    />
  );
}

export default DriversPageContainer;
