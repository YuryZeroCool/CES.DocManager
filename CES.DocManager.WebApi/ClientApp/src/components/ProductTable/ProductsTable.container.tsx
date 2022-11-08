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
  editAllMaterialsAttachingMaterial,
  resetAllAttachedMaterials,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IAllDecommissionedMaterials,
  IMaterialAttachedResponse,
  IMaterialsResponse,
  Party,
  Product,
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

  const [editMaterialsError, setEditMaterialsError] = useState<string>('');

  const [offSetX, setOffSetX] = useState<number>(0);

  const [offSetTop, setOffSetTop] = useState<number>(0);

  const [tableHeight, setTableHeight] = useState<number>(0);

  const [tableWidth, setTableWidth] = useState<number>(0);

  const [tableIndexArr, setTableIndexArr] = useState<number[]>([]);

  const [isDialogHightBigger, setIsDialogHightBigger] = useState<boolean>(false);

  const [filteredMaterials, setFilteredMaterials] = useState<Product[]>([]);

  const [
    filteredAttachedMaterials,
    setFilteredAttachedMaterials,
  ] = useState<IMaterialAttachedResponse[]>([]);

  const [
    filteredDecommissionedMaterials,
    setFilteredDecommissionedMaterials,
  ] = useState<IAllDecommissionedMaterials[]>([]);

  const materials = useSelector<RootState, Product[]>((state) => state.materials.getAllMaterials);

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
    searchValue,
    totalCount,
    totalSum,
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

  const createTableIndexes = (data: Product[] | IMaterialAttachedResponse[]) => {
    const numbersArr = [];
    for (let i = 0; i < data.length; i += 1) {
      numbersArr.push(i + 1);
    }
    setTableIndexArr(numbersArr);
  };

  const filterMaterials = (): Product[] => {
    const arr = materials.filter((el) => el.name.toLowerCase().includes(
      searchValue.materialsSearchValue,
    )
      || el.party.filter((elem) => (
        elem.partyName.includes(searchValue.materialsSearchValue))).length !== 0);
    return arr;
  };

  const filterAttachedMaterials = (): IMaterialAttachedResponse[] => {
    const arr = allAttachedMaterials.filter(
      (el) => el.nameMaterial.toLowerCase().includes(searchValue.attachedMaterialsSearchValue)
      || el.nameParty.includes(searchValue.attachedMaterialsSearchValue)
      || `${el.vehicleBrand}(${el.numberPlateCar})`.toLowerCase().includes(searchValue.attachedMaterialsSearchValue),
    );
    return arr;
  };

  useEffect(() => {
    if (materials.length !== 0) {
      createTableIndexes(materials);
      setFilteredMaterials(filterMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials.length]);

  useEffect(() => {
    if (allAttachedMaterials.length !== 0) {
      createTableIndexes(allAttachedMaterials);
      setFilteredAttachedMaterials(filterAttachedMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAttachedMaterials.length]);

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
    setFilteredMaterials(filterMaterials());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.materialsSearchValue]);

  useEffect(() => {
    setFilteredAttachedMaterials(filterAttachedMaterials());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.attachedMaterialsSearchValue]);

  useEffect(() => {
    setFilteredDecommissionedMaterials(
      allDecommissionedMaterials.filter(
        (el) => el.carMechanic.toLowerCase().includes(
          searchValue.decommissionedMaterialsSearchValue,
        )
        || el.currentDate?.toString().includes(searchValue.decommissionedMaterialsSearchValue)
        || `${el.materials[0].vehicleBrand}(${el.materials[0].numberPlateCar})`.toLowerCase().includes(searchValue.decommissionedMaterialsSearchValue),
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.decommissionedMaterialsSearchValue]);

  useEffect(() => {
    setProductsTableError('');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialsTableType]);

  useEffect(() => {
    if (createdAttachedMaterial.nameMaterial && createdAttachedMaterial.nameMaterial !== '') {
      try {
        dispatch(editAllMaterialsAttachingMaterial(createdAttachedMaterial));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setEditMaterialsError(error.message);
        }
      }
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
      materials={searchValue.materialsSearchValue === '' ? materials : filteredMaterials}
      allAttachedMaterials={searchValue.attachedMaterialsSearchValue === '' ? allAttachedMaterials : filteredAttachedMaterials}
      allDecommissionedMaterials={searchValue.decommissionedMaterialsSearchValue === '' ? allDecommissionedMaterials : filteredDecommissionedMaterials}
      pageType={pageType}
      status={status}
      productsTableError={productsTableError}
      editMaterialsError={editMaterialsError}
      rowActiveId={rowActiveId}
      offSetX={offSetX}
      offSetTop={offSetTop}
      accordionHeight={accordionHeight}
      isMaterialReportDialogOpen={isMaterialReportDialogOpen}
      materialsTableType={materialsTableType}
      isDialogHightBigger={isDialogHightBigger}
      divElRef={divElRef}
      tableIndexArr={tableIndexArr}
      searchValue={searchValue}
      totalCount={totalCount}
      totalSum={totalSum}
      handleContextMenu={handleContextMenu}
    />
  );
}

export default ProductsTableContainer;
