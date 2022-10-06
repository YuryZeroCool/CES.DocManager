import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterial,
  changeRowActiveId,
  editAllMaterials,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AllMaterialsResponse, IMaterialsResponse, Party } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
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

  const { isMaterialReportDialogOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    currentGroupAccount,
    rowActiveId,
    status,
    accordionHeight,
    createdAttachedMaterial,
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

  useEffect(() => {
    dispatch(editAllMaterials(createdAttachedMaterial));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdAttachedMaterial]);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    el: Party,
  ) => {
    event.preventDefault();
    if (event.button === 2 && event.currentTarget.offsetParent) {
      dispatch(changeAttachedMaterial({ party: el.partyName, count: el.count }));
      dispatch(changeRowActiveId(el.partyId));
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
      isMaterialReportDialogOpen={isMaterialReportDialogOpen}
    />
  );
}

export default ProductsTableContainer;
