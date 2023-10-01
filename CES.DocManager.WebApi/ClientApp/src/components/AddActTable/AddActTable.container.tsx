import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddActTableComponent from './AddActTable.component';
import { Act, INotesState } from '../../types/MesTypes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { updateActDataFromFile } from '../../redux/reducers/mes/mesReducer';
import { RootState } from '../../redux/reducers/combineReducers';

interface Props {
  currentActData: Act;
  type: string;
}

function AddActTableContainer(props: Props) {
  const { currentActData, type } = props;

  const {
    totalActSumm,
    vat,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleInputNumberChange = (workName: string, value: string) => {
    dispatch(updateActDataFromFile({ type, workName, value }));
  };

  return (
    <AddActTableComponent
      currentActData={currentActData}
      totalActSumm={totalActSumm}
      vat={vat}
      handleInputNumberChange={handleInputNumberChange}
    />
  );
}

export default AddActTableContainer;
