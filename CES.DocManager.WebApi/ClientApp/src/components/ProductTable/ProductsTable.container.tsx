import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AllMaterialsResponse } from '../../types/ReportTypes';
import ProductsTableComponent from './ProductsTable.component';

function ProductsTableContainer() {
  const materials = useSelector<RootState,
  AllMaterialsResponse | undefined>((state) => state.materials.getAll);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getMaterials(): Promise<void> {
      await dispatch(getAllMaterials('По счету 10.5'));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  }, [dispatch]);

  return (
    <ProductsTableComponent materials={materials} />
  );
}

export default ProductsTableContainer;
