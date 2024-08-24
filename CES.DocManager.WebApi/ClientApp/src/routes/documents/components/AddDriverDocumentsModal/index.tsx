import { AxiosError } from 'axios';
import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {
  Button,
  Flex,
  Modal,
  Stack,
  rem,
} from '@mantine/core';

import createDriverLicense from '../../../../redux/actions/documents/createDriverLicense';
import createMedicalCertificate from '../../../../redux/actions/documents/createMedicalCertificate';
import getDriversWithoutDriverLicense from '../../../../redux/actions/documents/getDriversWithoutDriverLicense';
import getDriversWithoutMedicalCertificate from '../../../../redux/actions/documents/getDriversWithoutMedicalCertificate';
import { RootState } from '../../../../redux/reducers/combineReducers';
import { clearDriversWithoutDriverLicense } from '../../../../redux/reducers/documents/driverLicense/driverLicenseReducer';
import { clearDriversWithoutMedicalCertificates } from '../../../../redux/reducers/documents/medicalCertificates/medicalCertificatesReducer';
import { IAuthResponseType } from '../../../../redux/store/configureStore';
import {
  IDriverDocumentsForm,
  IDriverDocumentsRequest,
  IDriverLicenses,
  IMedicalCertificates,
} from '../../../../types/DocumentType';
import DriversSelect from './components/DriversSelect';
import SerialNumberInput from './components/SerialNumberInput';
import IssueDateCalendar from './components/IssueDateCalendar';
import ExpiryDateCalendar from './components/ExpiryDateCalendar';
import CategoryInput from './components/CategoryInput';

interface AddDriverDocumentsModalProps {
  addMedicalCertificateModalOpened: boolean;
  addDriverLicenseModalOpened: boolean;
  addMedicalCertificateModalClose: () => void;
  addDriverLicenseModalClose: () => void;
}

function AddDriverDocumentsModal(props: AddDriverDocumentsModalProps) {
  const {
    addMedicalCertificateModalOpened,
    addDriverLicenseModalOpened,
    addMedicalCertificateModalClose,
    addDriverLicenseModalClose,
  } = props;

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

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getDriverDocuments(): Promise<void> {
      try {
        if (addMedicalCertificateModalOpened) await dispatch(getDriversWithoutMedicalCertificate(''));
        if (addDriverLicenseModalOpened) await dispatch(getDriversWithoutDriverLicense(''));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          showNotification({
            title: 'Водители не были получены',
            message: 'Произошла ошибка во время получения водителей.',
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            styles: { icon: { background: 'red' } },
          });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDriverDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (addMedicalCertificateModalOpened) {
      dispatch(clearDriversWithoutMedicalCertificates());
      addMedicalCertificateModalClose();
    }

    if (addDriverLicenseModalOpened) {
      dispatch(clearDriversWithoutDriverLicense());
      addDriverLicenseModalClose();
    }
  };

  const onSubmit = async (data: IDriverDocumentsForm) => {
    const index: number = data.fullName.indexOf(' ');
    if (index !== undefined) {
      try {
        if (addMedicalCertificateModalOpened) {
          const medical: IDriverDocumentsRequest = {
            lastName: data.fullName.slice(0, index),
            firstName: data.fullName.slice(index + 1),
            issueDate: data.issueDate,
            serialNumber: data.serialNumber,
            expiryDate: data.expiryDate,
          };
          await dispatch(createMedicalCertificate(medical));
          reset();
          addMedicalCertificateModalClose();
          dispatch(clearDriversWithoutMedicalCertificates());
        }
        if (addDriverLicenseModalOpened) {
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
          addDriverLicenseModalClose();
          dispatch(clearDriversWithoutDriverLicense());
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          showNotification({
            title: 'Документы не были сохранены',
            message: 'Произошла ошибка во время сохранения документа.',
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            styles: { icon: { background: 'red' } },
          });
        }
      }
    }
  };

  return (
    <Modal
      opened={addMedicalCertificateModalOpened || addDriverLicenseModalOpened}
      onClose={handleClose}
      title={addMedicalCertificateModalOpened ? 'Добавить медицинскую справку' : 'Добавить водительское удостоверение'}
      centered
      closeOnClickOutside={false}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={20}>
          <Stack gap={15}>
            <DriversSelect
              control={control}
              driversWithoutDriverLicense={driversWithoutDriverLicense}
              driversWithoutMedicalCertificates={driversWithoutMedicalCertificates}
            />
            <SerialNumberInput control={control} />
            <IssueDateCalendar control={control} />
            <ExpiryDateCalendar control={control} />
            {addDriverLicenseModalOpened && (
              <CategoryInput control={control} />
            )}
          </Stack>

          <Flex justify="flex-end" gap={10}>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Отменить
            </Button>

            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              type="submit"
              // eslint-disable-next-line react-hook-form/destructuring-formstate
              disabled={!formState.isValid}
            >
              Сохранить
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
}

export default memo(AddDriverDocumentsModal);
