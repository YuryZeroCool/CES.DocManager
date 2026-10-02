import React, { memo, useEffect, useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizationState } from 'types/mes/OrganizationTypes';
import { GetActsListReq, ActsHistoryParams } from 'types/MesTypes';
import { RootState } from 'redux/reducers/combineReducers';
import { getActsList, getOrganizationType } from 'redux/actions/mes';
import { IAuthResponseType } from 'redux/store/configureStore';
import ActsListTable from './components/ActsListTable';
import ActsListHeader from './components/ActsListHeader';

interface ActsHistoryProps {
  editActModalOpen: () => void;
}

function ActsHistory(props: ActsHistoryProps) {
  const {
    editActModalOpen,
  } = props;

  const minDate = new Date();
  minDate.setDate(1);

  const maxDate = new Date();
  maxDate.setDate(getDaysInMonth(maxDate));

  const [actsHistoryParams, setActsHistoryParams] = useState<ActsHistoryParams>({
    minDate,
    maxDate,
    filter: '',
    searchValue: '',
    organizationType: '',
    onlyUnsigned: false,
  });

  const dispatch: IAuthResponseType = useDispatch();

  const {
    organizationTypes,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const getActsListReq = () => {
    const params: GetActsListReq = {
      organizationType: actsHistoryParams.organizationType,
      min: format(actsHistoryParams.minDate, 'dd-MM-yyyy HH:mm:ss'),
      max: format(actsHistoryParams.maxDate, 'dd-MM-yyyy HH:mm:ss'),
      filter: actsHistoryParams.filter,
      searchValue: actsHistoryParams.searchValue,
      onlyUnsigned: actsHistoryParams.onlyUnsigned,
    };

    dispatch(getActsList(params)).catch(() => {});
  };

  useEffect(() => {
    dispatch(getOrganizationType()).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getActsListReq();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActsHistoryParams = <K extends keyof ActsHistoryParams>(
    key: K,
    value: ActsHistoryParams[K],
  ) => {
    setActsHistoryParams((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleGetActsListBtnClick = () => {
    getActsListReq();
  };

  return (
    <>
      <ActsListHeader
        actsHistoryParams={actsHistoryParams}
        organizationTypes={organizationTypes}
        updateActsHistoryParams={updateActsHistoryParams}
        handleGetActsListBtnClick={handleGetActsListBtnClick}
      />

      <ActsListTable
        editActModalOpen={editActModalOpen}
      />
    </>
  );
}

export default memo(ActsHistory);
