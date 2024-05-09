import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeMesPageType, resetTotalActSummVat } from '../../redux/reducers/mes/mesReducer';
import { RootState } from '../../redux/reducers/combineReducers';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import searchOrganizations from '../../redux/actions/mes/searchOrganizations';
import getNotesWithoutActs from '../../redux/actions/mes/getNotesWithoutActs';
import getActTypesFromFile from '../../redux/actions/mes/getActTypesFromFile';
import getActDataFromFile from '../../redux/actions/mes/getActDataFromFile';
import getActsList from '../../redux/actions/mes/getActsList';
import handleError from '../../utils';
import {
  Act,
  GetActsListReq,
  INotesState,
  SearchOrganization,
} from '../../types/MesTypes';
import MesPageComponent from './MesPage.component';
import LIMIT from './MesPage.config';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');
  const [search, setSearchValue] = useState<string>('');
  const [activePage, setPage] = useState(1);
  const [activeActsListPage, setActiveActsListPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selected, setSelected] = useState<number[]>([]);
  const [type, setType] = useState<string>('');
  const [actTypeSelectValue, setActTypeSelectValue] = useState<string>('');
  const [currentActData, setCurrentActData] = useState<Act>({ type: '', works: [] });
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [filter, setFilter] = useState('');
  const [actSearchValue, setActSearchValue] = useState('');

  const minDate = new Date();
  minDate.setDate(1);
  const [minActDate, setMinActDate] = useState<Date>(minDate);

  const maxDate = new Date();
  maxDate.setDate(31);
  const [maxActDate, setMaxActDate] = useState<Date>(maxDate);

  const [
    addActModalOpened,
    { open: addActModalOpen, close: addActModalClose },
  ] = useDisclosure(false);

  const [
    editActModalOpened,
    { open: editActModalOpen, close: editActModalClose },
  ] = useDisclosure(false);

  const [
    addOrganizationModalOpened,
    { open: addOrganizationModalOpen, close: addOrganizationModalClose },
  ] = useDisclosure(false);

  const [
    editOrganizationModalOpened,
    { open: editOrganizationModalOpen, close: editOrganizationModalClose },
  ] = useDisclosure(false);

  const [
    noteModalOpened,
    { open: noteModalOpen, close: noteModalClose },
  ] = useDisclosure(false);

  const {
    mesPageType,
    allOrganizations,
    actTypesFromFile,
    actDataFromFile,
    actsList,
    totalActsListCount,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const getOgranizations = (currentPage: number) => {
    setMesError('');
    const seachOrganization: SearchOrganization = {
      limit: LIMIT,
      page: currentPage,
      title: search,
    };
    dispatch(searchOrganizations(seachOrganization))
      .catch((error) => {
        handleError(error, setMesError);
      });
  };

  const getActsListReq = () => {
    setMesError('');

    const params: GetActsListReq = {
      limit: itemsPerPage,
      page: activeActsListPage,
      min: minActDate.toISOString(),
      max: maxActDate.toISOString(),
      filter,
      searchValue: actSearchValue,
    };
    dispatch(getActsList(params))
      .catch((error) => {
        handleError(error, setMesError);
      });
  };

  useEffect(() => {
    if (mesPageType === 'Заявки') {
      setMesError('');
      dispatch(getAllNotes())
        .catch((error) => {
          handleError(error, setMesError);
        });
    }
    if (mesPageType === 'Организации') {
      getOgranizations(activePage);
    }
    if (mesPageType === 'Заявки без актов') {
      dispatch(getActTypesFromFile())
        .catch((error) => {
          handleError(error, setMesError);
        });
      dispatch(getNotesWithoutActs())
        .catch((error) => {
          handleError(error, setMesError);
        });
    }
    if (mesPageType === 'История актов') {
      getActsListReq();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesPageType]);

  useEffect(() => {
    if (actTypeSelectValue !== '') {
      const { fileName } = actTypesFromFile.filter((el) => (
        `${el.actType} (${el.season.toLocaleLowerCase()})` === actTypeSelectValue
      ))[0];

      dispatch(getActDataFromFile(fileName))
        .catch((error) => {
          handleError(error, setMesError);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actTypeSelectValue]);

  useEffect(() => {
    if (type) {
      const res = actDataFromFile.act.filter((el) => el.type === type)[0];
      setCurrentActData(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (type) {
      const res = actDataFromFile.act.filter((el) => el.type === type)[0];
      setCurrentActData(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actDataFromFile.act]);

  useEffect(() => {
    if (mesPageType === 'История актов') {
      getActsListReq();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeActsListPage]);

  const handleCurrentPageChange = (value: number) => {
    setPage(value);
    getOgranizations(value);
  };

  const handleCurrentActsListPageChange = (value: number) => {
    setActiveActsListPage(value);
  };

  const changeType = (value: string) => {
    setType(value);
  };

  const handleAddActBtnClick = (value: string) => {
    dispatch(resetTotalActSummVat());
    changeType(value);
    addActModalOpen();
  };

  const handleAddOrganizationBtnClick = () => {
    addOrganizationModalOpen();
  };

  const handleChangeMesPageType = (value: string) => {
    dispatch(changeMesPageType(value));
    localStorage.setItem('mesPageType', value);
  };

  const handleChangeErrorMessage = (value: string) => {
    setMesError(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchButtonClick = () => {
    setPage(1);
    getOgranizations(activePage);
  };

  const handleSelectNote = (newValue: number[]) => {
    setSelected(newValue);
  };

  const handleActTypeSelectChange = (value: string) => {
    setActTypeSelectValue(value);
  };

  const resetCurrentActData = () => {
    setCurrentActData({ type: '', works: [] });
  };

  const handleMinActDateChange = (value: Date | null) => {
    if (value) {
      setMinActDate(value);
    }
  };

  const handleMaxActDateChange = (value: Date | null) => {
    if (value) {
      setMaxActDate(value);
    }
  };

  const handleGetActsListBtnClick = () => {
    getActsListReq();
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setActiveActsListPage(1);
  };

  const changeItemsPerPage = (value: number) => {
    handleItemsPerPageChange(value);
  };

  const changeIsEditModal = (value: boolean) => {
    setIsEditModal(value);
  };

  const handleAddNoteBtnClick = () => {
    noteModalOpen();
    changeIsEditModal(false);
  };

  const handleFiltersChange = (value: string) => {
    setFilter(value);
    setActSearchValue('');
  };

  const handleActSearchValueChange = (value: string) => {
    setActSearchValue(value);
  };

  return (
    <MesPageComponent
      mesError={mesError}
      mesPageType={mesPageType}
      search={search}
      page={activePage}
      actsListPage={activeActsListPage}
      totalActsListPages={totalActsListCount}
      totalPage={allOrganizations.totalPage}
      selectedNotesId={selected}
      actTypesFromFile={actTypesFromFile}
      actTypeSelectValue={actTypeSelectValue}
      actDataFromFile={actDataFromFile}
      currentActData={currentActData}
      type={type}
      addActModalOpened={addActModalOpened}
      editActModalOpened={editActModalOpened}
      addOrganizationModalOpened={addOrganizationModalOpened}
      editOrganizationModalOpened={editOrganizationModalOpened}
      actsList={actsList}
      minActDate={minActDate}
      maxActDate={maxActDate}
      requestStatus={requestStatus}
      itemsPerPage={itemsPerPage}
      noteModalOpened={noteModalOpened}
      isEditModal={isEditModal}
      filter={filter}
      actSearchValue={actSearchValue}
      editOrganizationModalOpen={editOrganizationModalOpen}
      editOrganizationModalClose={editOrganizationModalClose}
      addActModalClose={addActModalClose}
      editActModalOpen={editActModalOpen}
      editActModalClose={editActModalClose}
      addOrganizationModalClose={addOrganizationModalClose}
      handleAddActBtnClick={handleAddActBtnClick}
      handleAddOrganizationBtnClick={handleAddOrganizationBtnClick}
      handleChangeMesPageType={handleChangeMesPageType}
      handleChangeErrorMessage={handleChangeErrorMessage}
      handleSearchChange={handleSearchChange}
      handleSearchButtonClick={handleSearchButtonClick}
      handleCurrentPageChange={handleCurrentPageChange}
      handleSelectNote={handleSelectNote}
      handleActTypeSelectChange={handleActTypeSelectChange}
      resetCurrentActData={resetCurrentActData}
      changeType={changeType}
      handleCurrentActsListPageChange={handleCurrentActsListPageChange}
      handleMinActDateChange={handleMinActDateChange}
      handleMaxActDateChange={handleMaxActDateChange}
      handleGetActsListBtnClick={handleGetActsListBtnClick}
      setMesError={setMesError}
      changeItemsPerPage={changeItemsPerPage}
      handleAddNoteBtnClick={handleAddNoteBtnClick}
      noteModalClose={noteModalClose}
      noteModalOpen={noteModalOpen}
      changeIsEditModal={changeIsEditModal}
      handleFiltersChange={handleFiltersChange}
      handleActSearchValueChange={handleActSearchValueChange}
    />
  );
}

export default MesPageContainer;
