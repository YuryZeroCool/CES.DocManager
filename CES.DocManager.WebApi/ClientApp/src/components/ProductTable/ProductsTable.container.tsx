import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllAttachedMaterials from '../../redux/actions/report/materialReport/getAllAttachedMaterials';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterial,
  changePeriod,
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
  IUsedMaterialResponse,
  Party,
  Product,
} from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import ProductsTableComponent from './ProductsTable.component';
import { DIALOG_WIDTH, TABLE_HEAD_HEIGHT } from './ProductTable.config';

interface Props {
  productsTableError: string;
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

type MaterialsType = Product[]
| IMaterialAttachedResponse[]
| IAllDecommissionedMaterials[]
| IUsedMaterialResponse[];

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
  const [dialogHeight, setDialogHeight] = useState<number>(150);
  const [
    filteredAttachedMaterials,
    setFilteredAttachedMaterials,
  ] = useState<IMaterialAttachedResponse[]>([]);
  const [
    filteredUsedMaterials,
    setFilteredUsedMaterials,
  ] = useState<IUsedMaterialResponse[]>([]);
  const [
    filteredDecommissionedMaterials,
    setFilteredDecommissionedMaterials,
  ] = useState<IAllDecommissionedMaterials[]>([]);

  const { allMaterials } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const { isMaterialReportDialogOpen } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    allAttachedMaterials,
    allUsedMaterials,
    materialsTableType,
    currentGroupAccount,
    rowActiveId,
    status,
    createdAttachedMaterial,
    allDecommissionedMaterials,
    pageType,
    searchValue,
    totalCount,
    totalSum,
    isCheckedByDate,
    period,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  const FIRST_ROW_HEIGHT = materialsTableType === 'Свободные' ? 55 : 0;

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
      if (materialsTableType === 'Списанные') {
        if (!period) {
          const currentMonth = dayjs().month();
          const currentYear = dayjs().year();
          const currentPeriod = {
            month: currentMonth === 0 ? 12 : currentMonth,
            year: currentMonth === 0 ? (currentYear - 1) : currentYear,
          };
          dispatch(changePeriod(dayjs().set('year', currentPeriod.year).set('month', currentPeriod.month - 1)));
        }
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setProductsTableError(error.message);
      }
    }
  }

  const createTableIndexes = (data: MaterialsType) => {
    const numbersArr = [];
    for (let i = 0; i < data.length; i += 1) {
      numbersArr.push(i + 1);
    }
    setTableIndexArr(numbersArr);
  };

  const filterMaterials = (): Product[] => {
    const arr: Product[] = [];
    if (!isCheckedByDate) {
      for (let i = 0; i < allMaterials.length; i += 1) {
        const ifIncludeName = allMaterials[i].name.toLowerCase().includes(
          searchValue.materialsSearchValue,
        );
        const filteredElem = {
          ...allMaterials[i],
          party: [
            ...allMaterials[i].party.filter((elem) => (
              elem.partyName.startsWith(searchValue.materialsSearchValue)
            )),
          ],
        };
        if (ifIncludeName) {
          arr.push(allMaterials[i]);
          // eslint-disable-next-line no-continue
          continue;
        }
        if (filteredElem.party.length !== 0) {
          arr.push(filteredElem);
        }
      }
    } else {
      allMaterials.forEach((el: Product) => {
        const filteredElem = {
          ...el,
          party: [...el.party.filter((elem) => elem.partyDate.toString().startsWith(
            searchValue.materialsSearchValue,
          ))],
        };
        if (filteredElem.party.length !== 0) {
          arr.push(filteredElem);
        }
      });
    }
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

  const filterUsedMaterials = (): IUsedMaterialResponse[] => {
    const arr = allUsedMaterials.filter(
      (el) => el.nameMaterial.toLowerCase().includes(searchValue.usedMaterialSearchValue)
      || el.nameParty.includes(searchValue.usedMaterialSearchValue),
    );
    return arr;
  };

  const filterDecommissionedMaterials = (): IAllDecommissionedMaterials[] => {
    const arr = allDecommissionedMaterials.filter(
      (el) => el.carMechanic.toLowerCase().includes(
        searchValue.decommissionedMaterialsSearchValue,
      )
      || el.currentDate?.toString().includes(searchValue.decommissionedMaterialsSearchValue)
      || `${el.materials[0].vehicleBrand}(${el.materials[0].numberPlateCar})`.toLowerCase().includes(searchValue.decommissionedMaterialsSearchValue),
    );
    return arr;
  };

  useEffect(() => {
    if (divElRef.current) {
      setTableHeight(divElRef.current.getBoundingClientRect().height);
      setTableWidth(divElRef.current.getBoundingClientRect().width);
    }
  }, [divElRef]);

  useEffect(() => {
    if (dialogHeight > tableHeight - TABLE_HEAD_HEIGHT) {
      setIsDialogHightBigger(true);
    } else {
      setIsDialogHightBigger(false);
    }
  }, [dialogHeight, tableHeight]);

  useEffect(() => {
    if (pageType === 'Материалы' && (materialsTableType === 'Прикрепленные' || materialsTableType === 'Списанные')) {
      setDialogHeight(100);
    } else {
      setDialogHeight(150);
    }
  }, [pageType, materialsTableType]);

  useEffect(() => {
    if (allMaterials.length !== 0) {
      setFilteredMaterials(filterMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMaterials]);

  useEffect(() => {
    if (allUsedMaterials.length !== 0) {
      setFilteredUsedMaterials(filterUsedMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsedMaterials]);

  useEffect(() => {
    if (allAttachedMaterials.length !== 0) {
      setFilteredAttachedMaterials(filterAttachedMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAttachedMaterials]);

  useEffect(() => {
    if (allDecommissionedMaterials.length !== 0) {
      setFilteredDecommissionedMaterials(filterDecommissionedMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDecommissionedMaterials]);

  useEffect(() => {
    createTableIndexes(filteredMaterials);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMaterials]);

  useEffect(() => {
    createTableIndexes(filteredUsedMaterials);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredUsedMaterials]);

  useEffect(() => {
    createTableIndexes(filteredAttachedMaterials);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAttachedMaterials]);

  useEffect(() => {
    createTableIndexes(filteredDecommissionedMaterials);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDecommissionedMaterials]);

  useEffect(() => {
    if (allMaterials.length !== 0) {
      setFilteredMaterials(filterMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.materialsSearchValue]);

  useEffect(() => {
    setFilteredAttachedMaterials(filterAttachedMaterials());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.attachedMaterialsSearchValue]);

  useEffect(() => {
    setFilteredUsedMaterials(filterUsedMaterials());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.usedMaterialSearchValue]);

  useEffect(() => {
    setFilteredDecommissionedMaterials(filterDecommissionedMaterials());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.decommissionedMaterialsSearchValue]);

  useEffect(() => {
    if (allMaterials.length !== 0) {
      setFilteredMaterials(filterMaterials());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedByDate]);

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

  const countDialogYOffset = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    if (event.currentTarget.offsetParent) {
      const tableTop = event.currentTarget.offsetParent.getBoundingClientRect().top;

      if (dialogHeight > tableHeight - TABLE_HEAD_HEIGHT - FIRST_ROW_HEIGHT
      || event.clientY - tableTop - TABLE_HEAD_HEIGHT < dialogHeight) {
        setIsDialogHightBigger(true);
      } else {
        setIsDialogHightBigger(false);
      }

      if (event.clientY - tableTop + dialogHeight < tableHeight) {
        setOffSetTop(event.currentTarget.offsetTop + (
          event.clientY - event.currentTarget.getBoundingClientRect().top));
      }

      if (event.clientY - tableTop + dialogHeight > tableHeight) {
        setOffSetTop(event.currentTarget.offsetTop + (
          event.clientY - event.currentTarget.getBoundingClientRect().top) - dialogHeight);
      }

      if (event.clientX + DIALOG_WIDTH > tableWidth) {
        setOffSetX(event.clientX - DIALOG_WIDTH);
      }
    }
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id?: number,
    el?: Party,
    material?: IAllDecommissionedMaterials,
  ) => {
    event.preventDefault();
    if (event.button === 2 && event.currentTarget.offsetParent) {
      if (pageType === 'Материалы' && materialsTableType === 'Свободные' && el) {
        dispatch(changeAttachedMaterial({
          party: el.partyName,
          count: el.count,
          unit: allMaterials.filter((e) => (
            e.party.filter((elem) => elem.partyId === el.partyId)).length !== 0)[0].unit,
        }));
        dispatch(changeRowActiveId(el.partyId));
      }
      if (pageType === 'Материалы' && materialsTableType === 'Прикрепленные' && id) {
        dispatch(changeRowActiveId(id));
      }
      if (pageType === 'Материалы' && materialsTableType === 'Списанные' && id) {
        dispatch(changeRowActiveId(id));
      }
      if (pageType === 'История ремонтов' && material) {
        dispatch(changeRowActiveId(material.id));
      }

      dispatch(toggleMaterialReportDialog(true));
      setOffSetX(event.clientX);
      countDialogYOffset(event);
    }
  };

  return (
    <ProductsTableComponent
      materials={searchValue.materialsSearchValue === '' ? allMaterials : filteredMaterials}
      baseMaterials={allMaterials}
      allUsedMaterials={searchValue.usedMaterialSearchValue === '' ? allUsedMaterials : filteredUsedMaterials}
      baseAllUsedMaterials={allUsedMaterials}
      allAttachedMaterials={searchValue.attachedMaterialsSearchValue === '' ? allAttachedMaterials : filteredAttachedMaterials}
      baseAllAttachedMaterials={allAttachedMaterials}
      allDecommissionedMaterials={searchValue.decommissionedMaterialsSearchValue === '' ? allDecommissionedMaterials : filteredDecommissionedMaterials}
      pageType={pageType}
      status={status}
      productsTableError={productsTableError}
      editMaterialsError={editMaterialsError}
      rowActiveId={rowActiveId}
      offSetX={offSetX}
      offSetTop={offSetTop}
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
