import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal, toggleAddOrganizationModal } from '../../redux/reducers/modals/modalsReducer';
import getAllNotes from '../../redux/actions/mes/getAllNotes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { changeMesPageType } from '../../redux/reducers/mes/mesReducer';
import searchOrganizations from '../../redux/actions/mes/searchOrganizations';
import getNotesWithoutActs from '../../redux/actions/mes/getNotesWithoutActs';
import { Act, INotesState, SearchOrganization } from '../../types/MesTypes';
import { IModal } from '../../types/type';
import MesPageComponent from './MesPage.component';
import LIMIT from './MesPage.config';
import getActTypesFromFile from '../../redux/actions/mes/getActTypesFromFile';
import getActDataFromFile from '../../redux/actions/mes/getActDataFromFile';

function MesPageContainer() {
  const [mesError, setMesError] = useState<string>('');
  const [search, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [type, setType] = useState<string>('');
  const [actTypeSelectValue, setActTypeSelectValue] = useState<string>('');
  const [currentActData, setCurrentActData] = useState<Act>({ type: '', works: [] });

  const {
    isAddActModalOpen,
    isEditNoteModalOpen,
    isAddOrganizationModalOpen,
    isEditOrganizationModalOpen,
  } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

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
        if (error instanceof Error || error instanceof AxiosError) {
          setMesError(error.message);
        }
      });
  };

  useEffect(() => {
    if (mesPageType === 'Заявки') {
      setMesError('');
      dispatch(getAllNotes())
        .catch((error) => {
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
        });
    }
    if (mesPageType === 'Организации') {
      getOgranizations(page);
    }
    if (mesPageType === 'Заявки без актов') {
      dispatch(getActTypesFromFile())
        .catch((error) => {
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
        });
      dispatch(getNotesWithoutActs())
        .catch((error) => {
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
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
          if (error instanceof Error || error instanceof AxiosError) {
            setMesError(error.message);
          }
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

  const handleCurrentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getOgranizations(value);
  };

  const handleAddActBtnClick = (value: string) => {
    setType(value);
    dispatch(toggleAddActModal(true));
  };

  const handleAddOrganizationBtnClick = () => {
    dispatch(toggleAddOrganizationModal(true));
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
    getOgranizations(page);
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
      isAddActModalOpen={isAddActModalOpen}
      isEditNoteModalOpen={isEditNoteModalOpen}
      isAddOrganizationModalOpen={isAddOrganizationModalOpen}
      isEditOrganizationModalOpen={isEditOrganizationModalOpen}
      mesError={mesError}
      mesPageType={mesPageType}
      search={search}
      page={page}
      totalPage={allOrganizations.totalPage}
      selectedNotesId={selected}
      actTypesFromFile={actTypesFromFile}
      actTypeSelectValue={actTypeSelectValue}
      actDataFromFile={actDataFromFile}
      currentActData={currentActData}
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
    />
  );
}

export default MesPageContainer;
