import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import {
  ActionIcon, Button, Flex, Stack, TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { IAuthResponseType } from 'redux/store/configureStore';
import { searchOrganizations } from 'redux/actions/mes';
import { RootState } from 'redux/reducers/combineReducers';

import { OrganizationState, SearchOrganizationParams } from 'types/mes/OrganizationTypes';
import Pagination from 'components/Pagination';

import OrganizationsTable from './components/OrganizationsTable';
import OrganizationModal from './components/OrganizationModal';

const LIMIT = 10;

function Organizations() {
  const [search, setSearchValue] = useState<string>('');
  const [activePage, setPage] = useState(1);

  const [
    addOrganizationModalOpened,
    { open: addOrganizationModalOpen, close: addOrganizationModalClose },
  ] = useDisclosure(false);

  const [
    editOrganizationModalOpened,
    { open: editOrganizationModalOpen, close: editOrganizationModalClose },
  ] = useDisclosure(false);

  const dispatch: IAuthResponseType = useDispatch();

  const {
    allOrganizations,
  } = useSelector<RootState, OrganizationState>(
    (state) => state.organization,
  );

  const getOrganizations = useCallback((currentPage: number) => {
    const seachOrganization: SearchOrganizationParams = {
      limit: LIMIT,
      page: currentPage,
      title: search,
    };
    dispatch(searchOrganizations(seachOrganization)).unwrap()
      .catch(() => {});
  }, [dispatch, search]);

  useEffect(() => {
    getOrganizations(activePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value.trimStart());
  }, []);

  const handleAddOrganizationBtnClick = useCallback(() => {
    addOrganizationModalOpen();
  }, [addOrganizationModalOpen]);

  const handleCurrentPageChange = useCallback((value: number) => {
    setPage(value);
    getOrganizations(value);
  }, [getOrganizations]);

  const handleSearchButtonClick = useCallback(() => {
    const firstPage = 1;
    setPage(firstPage);
    getOrganizations(firstPage);
  }, [getOrganizations]);

  return (
    <>
      <Stack>
        <Flex
          pt={20}
          gap={15}
          mih="7vh"
        >
          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            onClick={handleAddOrganizationBtnClick}
          >
            Добавить организацию
          </Button>
          <TextInput
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearchButtonClick(); } }}
            placeholder="Поиск организации"
            w={500}
          />
          <ActionIcon variant="transparent" onClick={handleSearchButtonClick}>
            <IconSearch />
          </ActionIcon>
        </Flex>

        <OrganizationsTable
          editOrganizationModalOpen={editOrganizationModalOpen}
        />

        <Pagination
          page={activePage}
          width="100%"
          justify="center"
          totalPage={allOrganizations.totalPage}
          handleCurrentPageChange={handleCurrentPageChange}
        />
      </Stack>

      {(addOrganizationModalOpened || editOrganizationModalOpened) && (
        <OrganizationModal
          addOrganizationModalOpened={addOrganizationModalOpened}
          editOrganizationModalOpened={editOrganizationModalOpened}
          editOrganizationModalClose={editOrganizationModalClose}
          addOrganizationModalClose={addOrganizationModalClose}
        />
      )}
    </>
  );
}

export default memo(Organizations);
