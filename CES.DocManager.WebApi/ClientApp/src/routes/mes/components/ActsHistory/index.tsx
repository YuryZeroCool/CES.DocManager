import React, { memo, useEffect, useState } from 'react';
import { rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { format, getDaysInMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizationState } from 'types/mes/OrganizationTypes';
import { GetActsListReq, INotesState, ActsHistoryParams } from 'types/MesTypes';
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
  });

  const dispatch: IAuthResponseType = useDispatch();

  const {
    requestStatus,
    mesError,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

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
    };

    dispatch(getActsList(params)).catch(() => {});
  };

  useEffect(() => {
    dispatch(getOrganizationType())
      .catch(() => {
        showNotification({
          title: 'Список типов организаций не был получен',
          message: 'Произошла ошибка во время получения списка типов организаций.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getActsListReq();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (requestStatus === 'rejected' && mesError) {
      showNotification({
        title: 'Ошибка загрузки актов',
        message: mesError,
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        styles: { icon: { background: 'red' } },
      });
    }
  }, [requestStatus, mesError]);

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
        filter={actsHistoryParams.filter}
      />
    </>
  );
}

export default memo(ActsHistory);
