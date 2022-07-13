import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthResponseType } from './redux/store/configureStore';
import ExpiringDriverLicenseTable from './components/home/ExpiringDocumentsTable';
import { RootState } from './redux/store/reducers/combineReducers';
import { clearDriverLicenseState } from './redux/store/reducers/home/driverLicenseReducer';
import './styles/app.scss';
import { IExpiringDocuments } from './types/HomeTypes';
import getExpiringDriverLicense from './redux/actions/home/driverLicenseRedux';
import getExpiringMedicalCertificate from './redux/actions/home/medicalCertificatesRedux';
import { clearMedicalCertificatesState } from './redux/store/reducers/home/medicalCertificatesReducer';
import { clearUserState } from './redux/store/reducers/loginReducer';

export default function App() {
  const dispatch: IAuthResponseType = useDispatch();
  const driverLicenseState = useSelector<RootState, IExpiringDocuments[]>(
    (state) => state.exringDriverLicense,
  );
  const medicalCertificatesState = useSelector<RootState, IExpiringDocuments[]>(
    (state) => state.exringMedicalCertificates,
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
    <section>
      <p>expiring documents</p>
      <div className="tables-container">
        {driverLicenseState.length > 0 && <ExpiringDriverLicenseTable data={driverLicenseState} name="Истекающие водительские удостоверения" />}
        {medicalCertificatesState.length > 0
          && <ExpiringDriverLicenseTable data={medicalCertificatesState} name="Истекающие водительские медсправки" />}
      </div>
    </section>
  );
}
