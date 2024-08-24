import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Flex,
  Title,
} from '@mantine/core';

import getExpiringDriverLicense from '../../redux/actions/home/getExpiringDriverLicense';
import getExpiringMedicalCertificate from '../../redux/actions/home/getExpiringMedicalCertificate';
import { RootState } from '../../redux/reducers/combineReducers';
import { clearUserState } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { clearExpiringMedicalCertificate } from '../../redux/reducers/documents/medicalCertificates/medicalCertificatesReducer';
import { clearExpiringDriverLicensesState } from '../../redux/reducers/documents/driverLicense/driverLicenseReducer';
import { IDriverLicenses, IMedicalCertificates } from '../../types/DocumentType';
import ExpiringDocumentsTable from '../../components/home/ExpiringDocumentsTable';

function HomePage() {
  const dispatch: IAuthResponseType = useDispatch();
  const { expiringDriverLicenses } = useSelector<RootState, IDriverLicenses>(
    (state) => state.driverLicense,
  );
  const { expiringMedicalCertificate } = useSelector<RootState, IMedicalCertificates>(
    (state) => state.medicalCertificates,
  );

  useEffect(() => {
    async function getDocument(): Promise<void> {
      const driver = await dispatch(getExpiringDriverLicense(1));
      if (driver.meta.requestStatus === 'rejected') {
        dispatch(clearUserState());
      }
      const medicla = await dispatch(getExpiringMedicalCertificate(1));
      if (medicla.meta.requestStatus === 'rejected') {
        dispatch(clearUserState());
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDocument();
    return () => {
      dispatch(clearExpiringDriverLicensesState());
      dispatch(clearExpiringMedicalCertificate());
    };
  }, [dispatch]);

  return (
    <Container
      size={1440}
      display="flex"
      style={{ flexDirection: 'column', gap: 40 }}
      pt={30}
    >
      <Title c="#FFF" fz={28} style={{ textAlign: 'center' }}>Expiring documents</Title>

      <Flex justify="space-between" gap={40}>
        {expiringDriverLicenses.length > 0 && (
          <ExpiringDocumentsTable data={expiringDriverLicenses} name="Истекающие водительские удостоверения" />
        )}

        {expiringMedicalCertificate.length > 0 && (
          <ExpiringDocumentsTable data={expiringMedicalCertificate} name="Истекающие водительские медсправки" />
        )}
      </Flex>
    </Container>
  );
}

export default HomePage;
