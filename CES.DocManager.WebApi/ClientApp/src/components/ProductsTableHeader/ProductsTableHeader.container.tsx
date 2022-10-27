import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadNewMaterials from '../../redux/actions/report/materialReport/uploadNewMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddMaterialsWriteOffModal } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterialsSearchValue,
  changeDecommissionedMaterialsSearchValue,
  changeMaterialsSearchValue,
  changeMaterialsTableType,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse } from '../../types/ReportTypes';
import ProductsTableHeaderComponent from './ProductsTableHeader.component';

function ProductsTableHeaderContainer() {
  const {
    materialsTableType,
    pageType,
    searchValue,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const [fileName, setFileName] = useState<string>('');
  const [productTableHeaderError, setProductTableHeaderError] = useState<string>('');

  const dispatch: IAuthResponseType = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeMaterialsTableType(event.target.value));
  };

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.value.split('\\');
    setFileName(name[name.length - 1]);
  };

  const handleClick = () => {
    dispatch(toggleAddMaterialsWriteOffModal(true));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData: FormData = new FormData(event.currentTarget);
      await dispatch(uploadNewMaterials(formData));
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setProductTableHeaderError(error.message);
      }
    }
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (pageType === 'Материалы' && materialsTableType === 'Свободные') {
      dispatch(changeMaterialsSearchValue(event.target.value.toLocaleLowerCase()));
    }
    if (pageType === 'Материалы' && materialsTableType === 'Прикрепленные') {
      dispatch(changeAttachedMaterialsSearchValue(event.target.value.toLocaleLowerCase()));
    }
    if (pageType === 'История ремонтов') {
      dispatch(changeDecommissionedMaterialsSearchValue(event.target.value.toLocaleLowerCase()));
    }
  };

  return (
    <ProductsTableHeaderComponent
      materialsTableType={materialsTableType}
      pageType={pageType}
      fileName={fileName}
      searchValue={searchValue}
      handleChange={handleChange}
      handleClick={handleClick}
      handleInputFileChange={handleInputFileChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleSubmit={handleSubmit}
      handleSearchValueChange={handleSearchValueChange}
    />
  );
}

export default ProductsTableHeaderContainer;
