import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { IFullNoteData, INotesState, SearchValueType } from '../../types/MesTypes';
import NotesWithoutActsTableComponent from './NotesWithoutActsTable.component';
import { defaultSearchValues } from './NotesWithoutActsTable.config';

interface Props {
  mesError: string;
  selectedNotesId: number[];
  handleChangeErrorMessage: (value: string) => void;
  handleSelectNote: (newValue: number[]) => void;
}

function NotesWithoutActsTableContainer(props: Props) {
  const {
    mesError,
    selectedNotesId,
    handleChangeErrorMessage,
    handleSelectNote,
  } = props;

  const [filteredNotesWithoutAct, setFilteredNotesWithoutAct] = useState<IFullNoteData[]>([]);
  const [searchValues, setSearchValues] = useState<SearchValueType[]>(defaultSearchValues);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const {
    notesWithoutAct,
    requestStatus,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const filterNotes = (): IFullNoteData[] => {
    const currentSearchIndex = searchValues.findIndex((el) => el.value !== '');
    let arr: IFullNoteData[] = [];

    if (currentSearchIndex !== -1) {
      if (searchValues[currentSearchIndex].id === 'address') {
        arr = notesWithoutAct.filter(
          (el) => el.address
            && el.address.toLowerCase().includes(searchValues[currentSearchIndex].value),
        );
      }

      if (searchValues[currentSearchIndex].id === 'receiptDate') {
        arr = notesWithoutAct.filter(
          (el) => el.date && el.date.includes(searchValues[currentSearchIndex].value),
        );
      }

      if (searchValues[currentSearchIndex].id === 'phone') {
        arr = notesWithoutAct.filter(
          (el) => el.tel && el.tel.replaceAll(' ', '').includes(searchValues[currentSearchIndex].value),
        );
      }

      if (searchValues[currentSearchIndex].id === 'comment') {
        arr = notesWithoutAct.filter(
          (el) => el.comment
            && el.comment.toLowerCase().includes(searchValues[currentSearchIndex].value),
        );
      }
    }

    return arr;
  };

  useEffect(() => {
    if (notesWithoutAct.length !== 0) {
      setFilteredNotesWithoutAct(filterNotes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesWithoutAct]);

  useEffect(() => {
    const currentSearchIndex = searchValues.findIndex((el) => el.value !== '');
    setIsSearch(currentSearchIndex !== -1);
    setFilteredNotesWithoutAct(filterNotes());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValues]);

  const handleClick = (id: number) => {
    const selectedIndex = selectedNotesId.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedNotesId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedNotesId.slice(1));
    } else if (selectedIndex === selectedNotesId.length - 1) {
      newSelected = newSelected.concat(selectedNotesId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedNotesId.slice(0, selectedIndex),
        selectedNotesId.slice(selectedIndex + 1),
      );
    }

    handleSelectNote(newSelected);
  };

  const isSelected = (id: number) => selectedNotesId.indexOf(id) !== -1;

  const handleChangeSearch = (id: string, value: string) => {
    const newSearchValues = searchValues.map((el: SearchValueType) => {
      const newSearchValue: SearchValueType = { ...el };
      if (el.id === id) {
        newSearchValue.value = value.toLowerCase();
        return newSearchValue;
      }
      if (newSearchValue.value !== '') {
        newSearchValue.value = '';
      }

      return newSearchValue;
    });
    setSearchValues(newSearchValues);
  };

  return (
    <NotesWithoutActsTableComponent
      mesError={mesError}
      requestStatus={requestStatus}
      notesWithoutAct={isSearch ? filteredNotesWithoutAct : notesWithoutAct}
      baseNotesWithoutAct={notesWithoutAct}
      searchValues={searchValues}
      isSearch={isSearch}
      isSelected={isSelected}
      handleClick={handleClick}
      handleChangeSearch={handleChangeSearch}
    />
  );
}

export default NotesWithoutActsTableContainer;
