import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleEditNoteModal } from '../../redux/reducers/modals/modalsReducer';
import OrganizationsTableComponent from './OrganizationsTable.component';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeSelectedNoteId, editAllOrganizations } from '../../redux/reducers/mes/mesReducer';
import { INotesState } from '../../types/MesTypes';
import deleteOrganization from '../../redux/actions/mes/deleteOrganization';

interface Props {
  mesError: string;
  handleChangeErrorMessage: (value: string) => void;
}

function OrganizationsTableContainer(props: Props) {
  const { mesError, handleChangeErrorMessage } = props;

  const {
    allOrganizations,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedNoteId(id));
    dispatch(toggleEditNoteModal(true));
  };

  const handleDeleteIconClick = (id: number) => {
    dispatch(deleteOrganization(id))
      .then(() => dispatch(editAllOrganizations(id)))
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          handleChangeErrorMessage(error.message);
        }
      });
  };

  return (
    <OrganizationsTableComponent
      allOrganizations={allOrganizations}
      mesError={mesError}
      requestStatus={requestStatus}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
    />
  );
}

export default OrganizationsTableContainer;
