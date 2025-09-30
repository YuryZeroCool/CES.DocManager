import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeMesPageType, resetTotalActSummVat } from '../../redux/reducers/mes/mesReducer';
import { RootState } from '../../redux/reducers/combineReducers';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import searchOrganizations from '../../redux/actions/mes/searchOrganizations';
import handleError from '../../utils';
import {
  Act,
  INotesState,
  SearchOrganization,
} from '../../types/MesTypes';
import MesPageComponent from './MesPage.component';
import LIMIT from './MesPage.config';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');
  const [search, setSearchValue] = useState<string>('');
  const [activePage, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [type, setType] = useState<string>('');
  const [currentActData, setCurrentActData] = useState<Act>({ type: '', works: [] });
  const [isEditModal, setIsEditModal] = useState<boolean>(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesPageType]);

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

  const resetCurrentActData = () => {
    setCurrentActData({ type: '', works: [] });
  };

  const changeIsEditModal = (value: boolean) => {
    setIsEditModal(value);
  };

  const handleAddNoteBtnClick = () => {
    noteModalOpen();
    changeIsEditModal(false);
  };

  return (
    <MesPageComponent
      mesError={mesError}
      mesPageType={mesPageType}
      search={search}
      page={activePage}
      totalPage={allOrganizations.totalPage}
      selectedNotesId={selected}
      currentActData={currentActData}
      type={type}
      addActModalOpened={addActModalOpened}
      editActModalOpened={editActModalOpened}
      addOrganizationModalOpened={addOrganizationModalOpened}
      editOrganizationModalOpened={editOrganizationModalOpened}
      noteModalOpened={noteModalOpened}
      isEditModal={isEditModal}
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
      resetCurrentActData={resetCurrentActData}
      changeType={changeType}
      handleAddNoteBtnClick={handleAddNoteBtnClick}
      noteModalClose={noteModalClose}
      noteModalOpen={noteModalOpen}
      changeIsEditModal={changeIsEditModal}
    />
  );
}

export default MesPageContainer;
