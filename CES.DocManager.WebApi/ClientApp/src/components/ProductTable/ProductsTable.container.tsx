import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { resetAllMaterials } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AllMaterialsResponse, CurrentGroupAccountResponse } from '../../types/ReportTypes';
import ProductsTableComponent from './ProductsTable.component';

function ProductsTableContainer() {
  const materials = useSelector<RootState,
  AllMaterialsResponse | undefined>((state) => state.materials.getAllMaterials);

  const currentGroupAccount = useSelector<RootState,
  CurrentGroupAccountResponse | undefined>((state) => state.materials.currentGroupAccount);

  const status = useSelector<RootState, string>((state) => state.materials.status);

  const [productsTableError, setProductsTableError] = useState<string>('');

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getMaterials(): Promise<void> {
      if (currentGroupAccount && currentGroupAccount !== '') {
        try {
          dispatch(resetAllMaterials());
          await dispatch(getAllMaterials(currentGroupAccount));
        } catch (error) {
          if (error instanceof Error || error instanceof AxiosError) {
            setProductsTableError(error.message);
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  }, [dispatch, currentGroupAccount]);

  return (
    <ProductsTableComponent
      materials={materials}
      currentGroupAccount={currentGroupAccount}
      status={status}
      productsTableError={productsTableError}
    />
  );
}

export default ProductsTableContainer;
