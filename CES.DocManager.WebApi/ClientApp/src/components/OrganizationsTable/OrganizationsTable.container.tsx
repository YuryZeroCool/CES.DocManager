import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import OrganizationsTableComponent from './OrganizationsTable.component';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  changeSelectedOrganizationId,
  editOrganizationsAfterAdd,
  editOrganizationsAfterDelete,
  editOrganizationsAfterEdit,
} from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';
import deleteOrganization from '../../redux/actions/mes/deleteOrganization';

interface Props {
  mesError: string;
  editOrganizationModalOpen: () => void;
  handleChangeErrorMessage: (value: string) => void;
}

function OrganizationsTableContainer(props: Props) {
  const { mesError, handleChangeErrorMessage, editOrganizationModalOpen } = props;

  const {
    allOrganizations,
    requestStatus,
    createdOrganization,
    editedOrganization,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    if (createdOrganization.id !== 0) {
      dispatch(editOrganizationsAfterAdd(createdOrganization));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdOrganization]);

  useEffect(() => {
    if (editedOrganization.id !== 0) {
      dispatch(editOrganizationsAfterEdit(editedOrganization));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedOrganization]);

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedOrganizationId(id));
    editOrganizationModalOpen();
  };

  const handleDeleteIconClick = (id: number) => {
    dispatch(deleteOrganization(id))
      .then(() => dispatch(editOrganizationsAfterDelete(id)))
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          handleChangeErrorMessage(error.message);
        }
      });
  };

  return (
    <OrganizationsTableComponent
      allOrganizations={allOrganizations.organizations}
      mesError={mesError}
      requestStatus={requestStatus}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
    />
  );
}

export default OrganizationsTableContainer;
