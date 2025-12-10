import React, { memo, useEffect, useState } from 'react';
import {
  Button, Group, rem, Text,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { format, getDaysInMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizationState } from 'types/mes/OrganizationTypes';
import { GetActsListReq, INotesState, ActsHistoryParams } from 'types/MesTypes';
import { RootState } from 'redux/reducers/combineReducers';
import Pagination from 'components/Pagination';
import { getOrganizationType } from 'redux/actions/mes';
import getActsList from 'redux/actions/mes/getActsList';
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
    page: 1,
    limit: 25,
  });

  const dispatch: IAuthResponseType = useDispatch();

  const {
    totalActsListCount,
    requestStatus,
    mesError,
    actsList,
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
      limit: actsHistoryParams.limit,
      page: actsHistoryParams.page,
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
  }, [actsHistoryParams.page]);

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

  const renderCounPerPageButtons = () => (
    <Group my={20}>
      <Group w="45%">
        <Text size="lg">
          Количество отображаемых актов:
        </Text>
        <Button
          onChange={() => updateActsHistoryParams('limit', 25)}
          variant={actsHistoryParams.limit === 25 ? 'gradient' : 'outline'}
          gradient={actsHistoryParams.limit === 25 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          25
        </Button>
        <Button
          onChange={() => updateActsHistoryParams('limit', 50)}
          variant={actsHistoryParams.limit === 50 ? 'gradient' : 'outline'}
          gradient={actsHistoryParams.limit === 50 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          50
        </Button>
        <Button
          onChange={() => updateActsHistoryParams('limit', 100)}
          variant={actsHistoryParams.limit === 100 ? 'gradient' : 'outline'}
          gradient={actsHistoryParams.limit === 100 ? { from: 'violet', to: 'cyan', deg: 90 } : undefined}
        >
          100
        </Button>
      </Group>
      <Pagination
        width="45%"
        justify="end"
        page={actsHistoryParams.page}
        totalPage={totalActsListCount}
        handleCurrentPageChange={(value) => updateActsHistoryParams('page', value)}
      />
    </Group>
  );

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

      {mesError === '' && actsList.length > 0 && renderCounPerPageButtons()}
    </>
  );
}

export default memo(ActsHistory);
