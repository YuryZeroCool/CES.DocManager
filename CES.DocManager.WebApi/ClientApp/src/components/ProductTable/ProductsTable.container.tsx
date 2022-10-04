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

const DIALOG_HEIGHT = 150;
const DIALOG_WIDTH = 200;

function ProductsTableContainer(props: Props) {
  const { productsTableError, setProductsTableError } = props;

  const [offSetX, setOffSetX] = useState<number>(0);

  const [offSetTop, setOffSetTop] = useState<number>(0);

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
    if (event.button === 2 && event.currentTarget.offsetParent) {
      dispatch(changeRowActiveId(id));
      dispatch(toggleMaterialReportDialog(true));
      setOffSetX(event.clientX);

      const tableHeight = event.currentTarget.offsetParent.clientHeight;
      const tableWidth = event.currentTarget.offsetParent.clientWidth;
      const tableTop = event.currentTarget.offsetParent.getBoundingClientRect().top;

      if (event.clientY - tableTop + DIALOG_HEIGHT < tableHeight) {
        setOffSetTop(event.currentTarget.offsetTop + (
          event.clientY - event.currentTarget.getBoundingClientRect().top));
      }
      if (event.clientY - tableTop + DIALOG_HEIGHT > tableHeight) {
        setOffSetTop(event.currentTarget.offsetTop + (
          event.clientY - event.currentTarget.getBoundingClientRect().top) - DIALOG_HEIGHT);
      }
      if (event.clientX + DIALOG_WIDTH > tableWidth) {
        setOffSetX(event.clientX - DIALOG_WIDTH);
      }
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
      offSetTop={offSetTop}
      accordionHeight={accordionHeight}
    />
  );
}

export default ProductsTableContainer;
