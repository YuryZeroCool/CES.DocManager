import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { changeRowActiveId, resetAllMaterials } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AllMaterialsResponse, IMaterialsResponse } from '../../types/ReportTypes';
import ProductsTableComponent from './ProductsTable.component';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

function ProductsTableContainer(props: Props) {
  const { productsTableError, setProductsTableError } = props;

  const [offSetX, setOffSetX] = useState<number>(0);

  const [offSetY, setOffSetY] = useState<number>(0);

  const materials = useSelector<RootState,
  AllMaterialsResponse | undefined>((state) => state.materials.getAllMaterials);

  const {
    currentGroupAccount,
    rowActiveId,
    status,
    accordionHeight,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

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

  const handleContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault();
    if (event.button === 2) {
      dispatch(changeRowActiveId(id));
      dispatch(toggleMaterialReportDialog(true));
      setOffSetX(event.clientX);
      setOffSetY(window.pageYOffset + event.clientY);
    }
  };

  return (
    <ProductsTableComponent
      materials={materials}
      status={status}
      productsTableError={productsTableError}
      handleContextMenu={handleContextMenu}
      rowActiveId={rowActiveId}
      offSetX={offSetX}
      offSetY={offSetY}
      accordionHeight={accordionHeight}
    />
  );
}

export default ProductsTableContainer;
