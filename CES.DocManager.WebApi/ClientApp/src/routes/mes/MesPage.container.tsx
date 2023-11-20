import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { RootState } from '../../redux/reducers/combineReducers';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeMesPageType, resetTotalActSummVat } from '../../redux/reducers/mes/mesReducer';
import searchOrganizations from '../../redux/actions/mes/searchOrganizations';
import getNotesWithoutActs from '../../redux/actions/mes/getNotesWithoutActs';
import { Act, INotesState, SearchOrganization } from '../../types/MesTypes';
import MesPageComponent from './MesPage.component';
import LIMIT from './MesPage.config';
import getActTypesFromFile from '../../redux/actions/mes/getActTypesFromFile';
import getActDataFromFile from '../../redux/actions/mes/getActDataFromFile';
import handleError from '../../utils';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');
  const [search, setSearchValue] = useState<string>('');
  const [activePage, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [type, setType] = useState<string>('');
  const [actTypeSelectValue, setActTypeSelectValue] = useState<string>('');
  const [currentActData, setCurrentActData] = useState<Act>({ type: '', works: [] });

  const [
    addActModalOpened,
    { open: addActModalOpen, close: addActModalClose },
  ] = useDisclosure(false);

  const [
    addOrganizationModalOpened,
    { open: addOrganizationModalOpen, close: addOrganizationModalClose },
  ] = useDisclosure(false);

  const [
    editOrganizationModalOpened,
    { open: editOrganizationModalOpen, close: editOrganizationModalClose },
  ] = useDisclosure(false);

  const {
    mesPageType,
    allOrganizations,
    actTypesFromFile,
    actDataFromFile,
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

  const handleCurrentPageChange = (value: number) => {
    setPage(value);
    getOgranizations(value);
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

  return (
    <MesPageComponent
      mesError={mesError}
      mesPageType={mesPageType}
      search={search}
      page={activePage}
      totalPage={allOrganizations.totalPage}
      selectedNotesId={selected}
      actTypesFromFile={actTypesFromFile}
      actTypeSelectValue={actTypeSelectValue}
      actDataFromFile={actDataFromFile}
      currentActData={currentActData}
      type={type}
      addActModalOpened={addActModalOpened}
      addOrganizationModalOpened={addOrganizationModalOpened}
      editOrganizationModalOpened={editOrganizationModalOpened}
      editOrganizationModalOpen={editOrganizationModalOpen}
      editOrganizationModalClose={editOrganizationModalClose}
      addActModalClose={addActModalClose}
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
    />
  );
}

export default MesPageContainer;
