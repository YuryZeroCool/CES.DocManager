import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllAttachedMaterials from '../../redux/actions/report/materialReport/getAllAttachedMaterials';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterial,
  changeRowActiveId,
  editAllMaterials,
  resetAllAttachedMaterials,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  AllMaterialsResponse,
  IAllDecommissionedMaterials,
  IMaterialsResponse,
  Party,
} from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import ProductsTableComponent from './ProductsTable.component';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

const DIALOG_WIDTH = 200;

function ProductsTableContainer(props: Props) {
  const { productsTableError, setProductsTableError } = props;

  const [offSetX, setOffSetX] = useState<number>(0);

  const [offSetTop, setOffSetTop] = useState<number>(0);

  const [tableHeight, setTableHeight] = useState<number>(0);

  const [tableWidth, setTableWidth] = useState<number>(0);

  const [tableIndexArr, setTableIndexArr] = useState<number[]>([]);

  const [isDialogHightBigger, setIsDialogHightBigger] = useState<boolean>(false);

  const materials = useSelector<RootState,
  AllMaterialsResponse | undefined>((state) => state.materials.getAllMaterials);

  const { isMaterialReportDialogOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    allAttachedMaterials,
    materialsTableType,
    currentGroupAccount,
    rowActiveId,
    status,
    accordionHeight,
    createdAttachedMaterial,
    allDecommissionedMaterials,
    pageType,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const DIALOG_HEIGHT = materialsTableType === 'Свободные' ? 150 : 100;

  const TABLE_HEAD_HEIGHT = 57;

  const divElRef = React.createRef<HTMLDivElement>();

  async function getMaterials(): Promise<void> {
    try {
      if (materialsTableType === 'Свободные') {
        if (currentGroupAccount && currentGroupAccount.length !== 0) {
          dispatch(resetAllMaterials());
          await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
        }
      }
      if (materialsTableType === 'Прикрепленные') {
        dispatch(resetAllAttachedMaterials());
        await dispatch(getAllAttachedMaterials(''));
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setProductsTableError(error.message);
      }
    }
  }

  const createTableIndexes = () => {
    const numbersArr = [];
    if (materials) {
      for (let i = 0; i < materials.length; i += 1) {
        numbersArr.push(i + 1);
      }
      setTableIndexArr(numbersArr);
    }
  };

  useEffect(() => {
    if (materials?.length !== 0) {
      createTableIndexes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials?.length]);

  useEffect(() => {
    if (divElRef.current) {
      setTableHeight(divElRef.current.getBoundingClientRect().height);
      setTableWidth(divElRef.current.getBoundingClientRect().width);
    }
  }, [divElRef]);

  useEffect(() => {
    if (DIALOG_HEIGHT > tableHeight - TABLE_HEAD_HEIGHT) {
      setIsDialogHightBigger(true);
    } else {
      setIsDialogHightBigger(false);
    }
  }, [DIALOG_HEIGHT, tableHeight]);

  useEffect(() => {
    setProductsTableError('');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialsTableType]);

  useEffect(() => {
    if (createdAttachedMaterial.nameMaterial !== '') {
      dispatch(editAllMaterials(createdAttachedMaterial));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdAttachedMaterial]);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id?: number,
    el?: Party,
    material?: IAllDecommissionedMaterials,
  ) => {
    event.preventDefault();
    if (event.button === 2 && event.currentTarget.offsetParent) {
      if (pageType === 'Материалы' && materialsTableType === 'Свободные' && el) {
        dispatch(changeAttachedMaterial({ party: el.partyName, count: el.count }));
        dispatch(changeRowActiveId(el.partyId));
      }
      if (pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && id) {
        dispatch(changeRowActiveId(id));
      }
      if (pageType === 'История ремонтов' && material) {
        dispatch(changeRowActiveId(material.id));
      }

      dispatch(toggleMaterialReportDialog(true));
      setOffSetX(event.clientX);

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
      allAttachedMaterials={allAttachedMaterials}
      allDecommissionedMaterials={allDecommissionedMaterials}
      pageType={pageType}
      status={status}
      productsTableError={productsTableError}
      rowActiveId={rowActiveId}
      offSetX={offSetX}
      offSetTop={offSetTop}
      accordionHeight={accordionHeight}
      isMaterialReportDialogOpen={isMaterialReportDialogOpen}
      materialsTableType={materialsTableType}
      isDialogHightBigger={isDialogHightBigger}
      divElRef={divElRef}
      tableIndexArr={tableIndexArr}
      handleContextMenu={handleContextMenu}
    />
  );
}

export default ProductsTableContainer;
