import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddMaterialsWriteOffModal } from '../../redux/reducers/modals/modalsReducer';
import { changeMaterialsTableType } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import ProductsTableHeaderComponent from './ProductsTableHeader.component';

function ProductsTableHeaderContainer() {
  const {
    materialsTableType,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeMaterialsTableType(event.target.value));
  };

  const handleClick = () => {
    dispatch(toggleAddMaterialsWriteOffModal(true));
  };

  return (
    <ProductsTableHeaderComponent
      type={materialsTableType}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  );
}

export default ProductsTableHeaderContainer;
