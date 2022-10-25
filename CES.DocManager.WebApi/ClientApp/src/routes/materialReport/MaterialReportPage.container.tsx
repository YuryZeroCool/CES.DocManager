import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import downloadActOfWriteoffOfSpareParts from '../../redux/actions/report/materialReport/downloadActOfWriteoffOfSpareParts';
import getAllDecommissionedMaterials from '../../redux/actions/report/materialReport/getAllDecommissionedMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { changePageType, changeRowActiveId } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse, ReportErrors } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import MaterialReportPageComponent from './MaterialReportPage.component';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function MaterialReportPageContainer() {
  const [productsTableError, setProductsTableError] = useState<string>('');
  const [reportName, setReportName] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [period, setPeriod] = useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = useState<ReportErrors>(
    { reportNameError: false, periodError: false },
  );

  const {
    isMaterialReportDialogOpen,
    isCarAttachmentModalOpen,
    isAddMaterialsWriteOffModalOpen,
  } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    materialsTableType,
    pageType,
    actOfWriteoffOfSpareParts,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getDecommissionedMaterials(): Promise<void> {
      if (pageType === 'История ремонтов') {
        try {
          await dispatch(getAllDecommissionedMaterials(''));
        } catch (error) {
          if (error instanceof Error || error instanceof AxiosError) {
            setProductsTableError(error.message);
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDecommissionedMaterials();
  }, [dispatch, pageType]);

  useEffect(() => {
    if (period) {
      setFile(`${MONTHS[dayjs(period).get('month')]}_${dayjs(period).get('year')}.xls`);
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, periodError: false }));
    }
  }, [period]);

  useEffect(() => {
    if (actOfWriteoffOfSpareParts !== null) {
      const blob = new Blob([actOfWriteoffOfSpareParts]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      const fileName = file;
      link.download = fileName;
      link.click();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actOfWriteoffOfSpareParts]);

  const handleClick = () => {
    if (isMaterialReportDialogOpen) {
      dispatch(toggleMaterialReportDialog(false));
      dispatch(changeRowActiveId(0));
    }
  };

  const handleHistoryBtnClick = () => {
    dispatch(changePageType('История ремонтов'));
  };

  const handleReportNameChange = (event: SelectChangeEvent) => {
    if (event.target.value !== '') {
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, reportNameError: false }));
    }
    setReportName(event.target.value);
  };

  const handleMaterialsBtnClick = () => {
    dispatch(changePageType('Материалы'));
  };

  const handleReportsBtnClick = () => {
    dispatch(changePageType('Отчеты'));
  };

  const getMonth = (): number => {
    const monthNumber = dayjs(period).month() + 1;
    return monthNumber;
  };

  const handleDownload = async () => {
    if (reportName === '') {
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, reportNameError: true }));
    }
    if (period === null) {
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, periodError: true }));
    }
    try {
      if (reportName === 'Акт списания запчастей') {
        await dispatch(downloadActOfWriteoffOfSpareParts(getMonth()));
      }
      if (reportName === 'Акт списания материалов') {
        console.log('Акт списания материалов');
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setProductsTableError(error.message);
      }
    }
  };

  return (
    <MaterialReportPageComponent
      productsTableError={productsTableError}
      isCarAttachmentModalOpen={isCarAttachmentModalOpen}
      isAddMaterialsWriteOffModalOpen={isAddMaterialsWriteOffModalOpen}
      materialsTableType={materialsTableType}
      pageType={pageType}
      reportName={reportName}
      period={period}
      errorMessage={errorMessage}
      setProductsTableError={setProductsTableError}
      handleClick={handleClick}
      handleHistoryBtnClick={handleHistoryBtnClick}
      handleMaterialsBtnClick={handleMaterialsBtnClick}
      handleReportsBtnClick={handleReportsBtnClick}
      handleReportNameChange={handleReportNameChange}
      setPeriod={setPeriod}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleDownload={handleDownload}
    />
  );
}

export default MaterialReportPageContainer;
