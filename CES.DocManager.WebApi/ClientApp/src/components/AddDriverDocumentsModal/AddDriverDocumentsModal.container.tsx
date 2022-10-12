import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import createDriverLicense from '../../redux/actions/documents/createDriverLicense';
import createMedicalCertificate from '../../redux/actions/documents/createMedicalCertificate';
import getDriversWithoutDriverLicense from '../../redux/actions/documents/getDriversWithoutDriverLicense';
import getDriversWithoutMedicalCertificate from '../../redux/actions/documents/getDriversWithoutMedicalCertificate';
import { RootState } from '../../redux/reducers/combineReducers';
import { clearDriversWithoutDriverLicense } from '../../redux/reducers/documents/driverLicense/driverLicenseReducer';
import { clearDriversWithoutMedicalCertificates } from '../../redux/reducers/documents/medicalCertificates/medicalCertificatesReducer';
import { toggleAddDriverLicenseModal, toggleAddMedicalCertificateModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IDriverDocumentsForm,
  IDriverDocumentsRequest,
  IDriverLicenses,
  IMedicalCertificates,
} from '../../types/DocumentType';
import { IModal } from '../../types/type';
import AddMedicalCertificateModalComponent from './AddDriverDocumentsModal.component';

function AddDriverDocumentsModalContainer() {
  const [driverDocumentsError, setDriverDocumentsError] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm<IDriverDocumentsForm, IDriverDocumentsForm>({ mode: 'onChange' });

  const { driversWithoutMedicalCertificates } = useSelector<RootState, IMedicalCertificates>(
    (state) => state.medicalCertificates,
  );

  const { driversWithoutDriverLicense } = useSelector<RootState, IDriverLicenses>(
    (state) => state.driverLicense,
  );

  const {
    isAddMedicalCertificateModalOpen,
    isAddDriverLicenseModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getDriverDocuments(): Promise<void> {
      try {
        if (isAddMedicalCertificateModalOpen) await dispatch(getDriversWithoutMedicalCertificate(''));
        if (isAddDriverLicenseModalOpen) await dispatch(getDriversWithoutDriverLicense(''));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setDriverDocumentsError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDriverDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (isAddMedicalCertificateModalOpen) {
      dispatch(toggleAddMedicalCertificateModal(false));
      dispatch(clearDriversWithoutMedicalCertificates());
    }

    if (isAddDriverLicenseModalOpen) {
      dispatch(toggleAddDriverLicenseModal(false));
      dispatch(clearDriversWithoutDriverLicense());
    }
  };

  const onSubmit = async (data: IDriverDocumentsForm) => {
    const index: number = data.fullName.indexOf(' ');
    if (index !== undefined) {
      try {
        if (isAddMedicalCertificateModalOpen) {
          const medical: IDriverDocumentsRequest = {
            lastName: data.fullName.slice(0, index),
            firstName: data.fullName.slice(index + 1),
            issueDate: data.issueDate,
            serialNumber: data.serialNumber,
            expiryDate: data.expiryDate,
          };
          await dispatch(createMedicalCertificate(medical));
          reset();
          dispatch(toggleAddMedicalCertificateModal(false));
          dispatch(clearDriversWithoutMedicalCertificates());
        }
        if (isAddDriverLicenseModalOpen) {
          const driver: IDriverDocumentsRequest = {
            lastName: data.fullName.slice(0, index),
            firstName: data.fullName.slice(index + 1),
            issueDate: data.issueDate,
            serialNumber: data.serialNumber,
            expiryDate: data.expiryDate,
            category: data.category,
          };
          await dispatch(createDriverLicense(driver));
          reset();
          dispatch(toggleAddDriverLicenseModal(false));
          dispatch(clearDriversWithoutDriverLicense());
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setDriverDocumentsError(error.message);
        }
      }
    }
  };

  return (
    <AddMedicalCertificateModalComponent
      isAddMedicalCertificateModalOpen={isAddMedicalCertificateModalOpen}
      isAddDriverLicenseModalOpen={isAddDriverLicenseModalOpen}
      control={control}
      handleSubmit={handleSubmit}
      reset={reset}
      formState={formState}
      driversWithoutMedicalCertificates={driversWithoutMedicalCertificates}
      driversWithoutDriverLicense={driversWithoutDriverLicense}
      handleClose={handleClose}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    />
  );
}

export default AddDriverDocumentsModalContainer;
