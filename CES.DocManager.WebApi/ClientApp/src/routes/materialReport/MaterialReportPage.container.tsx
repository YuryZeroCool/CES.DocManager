import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import downloadActOfWriteoffOfSpareParts from '../../redux/actions/report/materialReport/downloadActOfWriteoffOfSpareParts';
import downloadActOfWritingOffMaterials from '../../redux/actions/report/materialReport/downloadActOfWritingOffMaterials';
import getAllAttachedMaterials from '../../redux/actions/report/materialReport/getAllAttachedMaterials';
import getAllDecommissionedMaterials from '../../redux/actions/report/materialReport/getAllDecommissionedMaterials';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleMaterialReportDialog } from '../../redux/reducers/modals/modalsReducer';
import { changePageType, changeRowActiveId } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IMaterialsResponse, IPeriod, ReportErrors } from '../../types/ReportTypes';
import { IModal } from '../../types/type';
import MONTHS from './MaterialReportPage.config';
import MaterialReportPageComponent from './MaterialReportPage.component';

function MaterialReportPageContainer() {
  const [productsTableError, setProductsTableError] = useState<string>('');
  const [reportName, setReportName] = useState<string | null>(null);
  const [file, setFile] = useState<string>('');
  const [period, setPeriod] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<ReportErrors>(
    { reportNameError: false, periodError: false },
  );

  const {
    isMaterialReportDialogOpen,
    isCarAttachmentModalOpen,
    isAddMaterialsWriteOffModalOpen,
    isDetailedInformationModalOpen,
    isAddUsedMaterialModalOpen,
    isEditAttachedMaterialModalOpen,
  } = useSelector<RootState,
  IModal>((state) => state.modals);

  const {
    materialsTableType,
    pageType,
    actOfWriteoffOfSpareParts,
    actOfWritingOffMaterials,
    currentGroupAccount,
  } = useSelector<RootState, IMaterialsResponse>((state) => state.materials);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getMaterials(): Promise<void> {
      try {
        if (pageType === 'История ремонтов') {
          await dispatch(getAllDecommissionedMaterials(''));
        }
        if (pageType === 'Материалы' && materialsTableType === 'Прикрепленные') {
          await dispatch(getAllAttachedMaterials(''));
        }
        if (pageType === 'Материалы' && materialsTableType === 'Свободные' && currentGroupAccount.length !== 0) {
          await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setProductsTableError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMaterials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType]);

  useEffect(() => {
    if (period) {
      setFile(`${MONTHS[dayjs(period).get('month')]}_${dayjs(period).get('year')}.xls`);
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, periodError: false }));
    }
  }, [period]);

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i += 1) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  const downloadFile = (fileBase64String: string) => {
    const blob = new Blob([base64ToArrayBuffer(fileBase64String)]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = file;
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    if (actOfWriteoffOfSpareParts !== '') {
      downloadFile(actOfWriteoffOfSpareParts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actOfWriteoffOfSpareParts]);

  useEffect(() => {
    if (actOfWritingOffMaterials !== '') {
      downloadFile(actOfWritingOffMaterials);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actOfWritingOffMaterials]);

  const handleClick = () => {
    if (isMaterialReportDialogOpen) {
      dispatch(toggleMaterialReportDialog(false));
      dispatch(changeRowActiveId(0));
    }
  };

  const handleChangePageType = (value: string) => {
    dispatch(changePageType(value));
  };

  const handleReportNameChange = (name: string | null) => {
    if (name !== '') {
      setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, reportNameError: false }));
    }
    setReportName(name);
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
        const reportPeriod: IPeriod = {
          month: dayjs(period).month() + 1,
          year: dayjs(period).year(),
        };
        await dispatch(downloadActOfWriteoffOfSpareParts(reportPeriod));
      }
      if (reportName === 'Акт списания материалов') {
        const reportPeriod: IPeriod = {
          month: dayjs(period).month() + 1,
          year: dayjs(period).year(),
        };
        await dispatch(downloadActOfWritingOffMaterials(reportPeriod));
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setProductsTableError(error.message);
      }
    }
  };

  const handleReportCalendarChange = (value: Date | null) => {
    setPeriod(value);
  };

  return (
    <MaterialReportPageComponent
      productsTableError={productsTableError}
      isCarAttachmentModalOpen={isCarAttachmentModalOpen}
      isAddMaterialsWriteOffModalOpen={isAddMaterialsWriteOffModalOpen}
      isDetailedInformationModalOpen={isDetailedInformationModalOpen}
      isAddUsedMaterialModalOpen={isAddUsedMaterialModalOpen}
      isEditAttachedMaterialModalOpen={isEditAttachedMaterialModalOpen}
      materialsTableType={materialsTableType}
      pageType={pageType}
      reportName={reportName}
      period={period}
      errorMessage={errorMessage}
      setProductsTableError={setProductsTableError}
      handleClick={handleClick}
      handleChangePageType={handleChangePageType}
      handleReportNameChange={handleReportNameChange}
      handleReportCalendarChange={handleReportCalendarChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleDownload={handleDownload}
    />
  );
}

export default MaterialReportPageContainer;
