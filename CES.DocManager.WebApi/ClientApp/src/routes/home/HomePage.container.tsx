import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getExpiringDriverLicense from '../../redux/actions/home/getExpiringDriverLicense';
import getExpiringMedicalCertificate from '../../redux/actions/home/getExpiringMedicalCertificate';
import { RootState } from '../../redux/reducers/combineReducers';
import { clearUserState } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import HomePageComponent from './HomePage.component';
import { clearExpiringMedicalCertificate } from '../../redux/reducers/documents/medicalCertificates/medicalCertificatesReducer';
import { clearExpiringDriverLicensesState } from '../../redux/reducers/documents/driverLicense/driverLicenseReducer';
import { IDriverLicenses, IMedicalCertificates } from '../../types/DocumentType';

function HomePageContainer() {
  const dispatch: IAuthResponseType = useDispatch();
  const { expiringDriverLicenses } = useSelector<RootState, IDriverLicenses>(
    (state) => state.driverLicense,
  );
  const { expiringMedicalCertificate } = useSelector<RootState, IMedicalCertificates>(
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
      dispatch(clearExpiringDriverLicensesState());
      dispatch(clearExpiringMedicalCertificate());
    };
  }, [dispatch]);

  return (
    <HomePageComponent
      driverLicense={expiringDriverLicenses}
      medicalCertificates={expiringMedicalCertificate}
    />
  );
}

export default HomePageContainer;
