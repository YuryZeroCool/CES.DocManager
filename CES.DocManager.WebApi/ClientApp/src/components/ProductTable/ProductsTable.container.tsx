import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { resetAllMaterials } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AllMaterialsResponse, CurrentGroupAccountResponse } from '../../types/ReportTypes';
import ProductsTableComponent from './ProductsTable.component';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

function ProductsTableContainer(props: Props) {
  const { productsTableError, setProductsTableError } = props;

  const materials = useSelector<RootState,
  AllMaterialsResponse | undefined>((state) => state.materials.getAllMaterials);

  const currentGroupAccount = useSelector<RootState,
  CurrentGroupAccountResponse | undefined>((state) => state.materials.currentGroupAccount);

  const status = useSelector<RootState, string>((state) => state.materials.status);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getMaterials(): Promise<void> {
      if (currentGroupAccount && currentGroupAccount.length !== 0) {
        try {
          dispatch(resetAllMaterials());
          await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
        } catch (error) {
          if (error instanceof Error || error instanceof AxiosError) {
            setProductsTableError(error.message);
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductsTableComponent
      materials={materials}
      status={status}
      productsTableError={productsTableError}
    />
  );
}

export default ProductsTableContainer;
