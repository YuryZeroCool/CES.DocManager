import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getExpiringDriverLicense from '../../redux/actions/home/getExpiringDriverLicense';
import getExpiringMedicalCertificate from '../../redux/actions/home/getExpiringMedicalCertificate';
import { RootState } from '../../redux/reducers/combineReducers';
import { clearDriverLicenseState } from '../../redux/reducers/driverLicense/driverLicenseReducer';
import { clearMedicalCertificatesState } from '../../redux/reducers/medicalCertificates/medicalCertificatesReducer';
import { clearUserState } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IExpiringDocuments } from '../../types/HomeTypes';
import HomePageComponent from './HomePage.component';

function HomePageContainer() {
  const dispatch: IAuthResponseType = useDispatch();
  const driverLicenseState = useSelector<RootState, IExpiringDocuments[]>(
    (state) => state.driverLicense,
  );
  const medicalCertificatesState = useSelector<RootState, IExpiringDocuments[]>(
    (state) => state.medicalCertificates,
  );

  React.useEffect(() => {
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
      dispatch(clearDriverLicenseState());
      dispatch(clearMedicalCertificatesState());
    };
  }, [dispatch]);

  return (
    <HomePageComponent
      driverLicense={driverLicenseState}
      medicalCertificates={medicalCertificatesState}
    />
  );
}

export default HomePageContainer;
