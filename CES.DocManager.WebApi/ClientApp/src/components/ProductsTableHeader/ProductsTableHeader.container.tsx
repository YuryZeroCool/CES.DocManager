import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllGroupAccounts from '../../redux/actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import getAllUsedMaterials from '../../redux/actions/report/materialReport/getAllUsedMaterials';
import uploadNewMaterials from '../../redux/actions/report/materialReport/uploadNewMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddMaterialsWriteOffModal, toggleLoaderModal } from '../../redux/reducers/modals/modalsReducer';
import {
  changeAttachedMaterialsSearchValue,
  changeDecommissionedMaterialsSearchValue,
  changeIsUploadNewMaterialsLoader,
  changeMaterialsSearchValue,
  changeMaterialsTableType,
  changePeriod,
  changeUploadMaterialsMessage,
  changeUsedMaterialsSearchValue,
  resetAllMaterials,
  resetAllUsedMaterials,
  toggleCheckboxByDateInMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse, IPeriod } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import ProductsTableHeaderComponent from './ProductsTableHeader.component';

function ProductsTableHeaderContainer() {
  const [fileName, setFileName] = useState<string>('');
  const [materialsError, setMaterialsError] = useState<string>('');
  const [uploadFileError, setUploadFileError] = useState<boolean>(false);

  const dispatch: IAuthResponseType = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    materialsTableType,
    pageType,
    searchValue,
    currentGroupAccount,
    isUploadNewMaterialsLoader,
    uploadMaterialsMessage,
    isCheckedByDate,
    allAttachedMaterials,
    period,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const { isLoaderModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const [calendarPeriod, setCalendarPeriod] = useState<Dayjs | null>(period);

  const countCurrentPeriod = (): IPeriod => {
    let currentMonth = 0;
    let currentYear = 0;
    let currentPeriod: IPeriod = {
      month: 0,
      year: 0,
    };
    if (period) {
      currentMonth = period.month();
      currentYear = period.year();
      currentPeriod = {
        month: currentMonth + 1,
        year: currentYear,
      };
    }
    return currentPeriod;
  };

  async function getMaterials(): Promise<void> {
    try {
      if (materialsTableType === 'Свободные') {
        if (currentGroupAccount && currentGroupAccount.length !== 0) {
          dispatch(resetAllMaterials());
          await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
        }
      }
      if (materialsTableType === 'Списанные') {
        dispatch(resetAllUsedMaterials());
        await dispatch(getAllUsedMaterials(countCurrentPeriod()));
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setMaterialsError(error.message);
      }
    }
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (uploadMaterialsMessage !== '') {
      timerId = setTimeout(() => {
        dispatch(changeUploadMaterialsMessage(''));
        dispatch(toggleLoaderModal(false));
      }, 1500);
    }
    return function cleanup() {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadMaterialsMessage]);

  useEffect(() => {
    if (isUploadNewMaterialsLoader) {
      dispatch(toggleLoaderModal(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploadNewMaterialsLoader]);

  useEffect(() => {
    if (fileName === '') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getMaterials();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  useEffect(() => {
    if (period) {
      if (!calendarPeriod) {
        setCalendarPeriod(period);
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getMaterials();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeMaterialsTableType(event.target.value));
  };

  const handleUsedMaterialsCalendarChange = (value: Dayjs | null) => {
    if (value) {
      setCalendarPeriod(value);
    }
  };

  const handleUsedMaterialsCalendarClose = () => {
    if (calendarPeriod) {
      dispatch(changePeriod(calendarPeriod));
    }
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
      await dispatch(getAllGroupAccounts(''));
      setFileName('');
      if (uploadFileError) {
        setUploadFileError(false);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        dispatch(changeIsUploadNewMaterialsLoader(false));
        dispatch(changeUploadMaterialsMessage(error.message));
        setUploadFileError(true);
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
    if (pageType === 'Материалы' && materialsTableType === 'Списанные') {
      dispatch(changeUsedMaterialsSearchValue(event.target.value.toLocaleLowerCase()));
    }
    if (pageType === 'История ремонтов') {
      dispatch(changeDecommissionedMaterialsSearchValue(event.target.value.toLocaleLowerCase()));
    }
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCheckboxByDateInMaterials(event.target.checked));
  };

  return (
    <ProductsTableHeaderComponent
      materialsTableType={materialsTableType}
      pageType={pageType}
      fileName={fileName}
      searchValue={searchValue}
      isUploadNewMaterialsLoader={isUploadNewMaterialsLoader}
      uploadMaterialsMessage={uploadMaterialsMessage}
      isLoaderModalOpen={isLoaderModalOpen}
      uploadFileError={uploadFileError}
      fileInputRef={fileInputRef}
      isCheckedByDate={isCheckedByDate}
      allAttachedMaterials={allAttachedMaterials}
      calendarPeriod={calendarPeriod}
      handleUsedMaterialsCalendarChange={handleUsedMaterialsCalendarChange}
      handleUsedMaterialsCalendarClose={handleUsedMaterialsCalendarClose}
      handleChange={handleChange}
      handleChangeCheckbox={handleChangeCheckbox}
      handleClick={handleClick}
      handleInputFileChange={handleInputFileChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleSubmit={handleSubmit}
      handleSearchValueChange={handleSearchValueChange}
    />
  );
}

export default ProductsTableHeaderContainer;
