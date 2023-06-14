import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import AddActModalComponent from './AddActModal.component';

function AddActModalContainer() {
  const { isAddActModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );
  const dispatch: IAuthResponseType = useDispatch();

  const handleClose = () => {
    dispatch(toggleAddActModal(false));
  };
  return (
    <AddActModalComponent
      isAddActModalOpen={isAddActModalOpen}
      handleClose={handleClose}
    />
  );
}

export default AddActModalContainer;
