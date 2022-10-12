import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddDriverLicenseModal, toggleAddMedicalCertificateModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import DocumentsPageComponent from './DocumentsPage.component';

function DocumentsPageContainer() {
  const {
    isAddMedicalCertificateModalOpen,
    isAddDriverLicenseModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleClick = () => {
    dispatch(toggleAddMedicalCertificateModal(true));
  };

  const onClick = () => {
    dispatch(toggleAddDriverLicenseModal(true));
  };

  return (
    <DocumentsPageComponent
      handleClick={handleClick}
      onClick={onClick}
      isAddDriverLicenseModalOpen={isAddDriverLicenseModalOpen}
      isAddMedicalCertificateModalOpen={isAddMedicalCertificateModalOpen}
    />
  );
}

export default DocumentsPageContainer;
