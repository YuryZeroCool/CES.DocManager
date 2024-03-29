import * as React from 'react';
import ExpiringDocumentsTable from '../../components/home/ExpiringDocumentsTable';
import { IExpiringDocumentsResponse } from '../../types/DocumentType';
import './HomePage.style.scss';

interface Props {
  driverLicense: IExpiringDocumentsResponse[];
  medicalCertificates: IExpiringDocumentsResponse[];
}

export default function HomePageComponent(props: Props) {
  const { driverLicense, medicalCertificates } = props;

  return (
    <section>
      <p>Expiring documents</p>
      <div className="tables-container">
        {driverLicense.length > 0 && <ExpiringDocumentsTable data={driverLicense} name="Истекающие водительские удостоверения" />}
        {medicalCertificates.length > 0
          && <ExpiringDocumentsTable data={medicalCertificates} name="Истекающие водительские медсправки" />}
      </div>
    </section>
  );
}
