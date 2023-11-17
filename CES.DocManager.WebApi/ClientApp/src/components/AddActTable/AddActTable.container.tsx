import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddActTableComponent from './AddActTable.component';
import { Act, INotesState } from '../../types/MesTypes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { RootState } from '../../redux/reducers/combineReducers';
import { updateActDataFromFile, updateActTotalSumm } from '../../redux/reducers/mes/mesReducer';

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
    dispatch(updateActTotalSumm(type));
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
