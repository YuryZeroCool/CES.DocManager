import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { IFullNoteData, INotesState, SearchValueType } from '../../types/MesTypes';
import NotesWithoutActsTableComponent from './NotesWithoutActsTable.component';
import { defaultSearchValues } from './NotesWithoutActsTable.config';

interface Props {
  mesError: string;
  selectedNotesId: number[];
  handleSelectNote: (newValue: number[]) => void;
}

function NotesWithoutActsTableContainer(props: Props) {
  const {
    mesError,
    selectedNotesId,
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
          (el) => el.street
            && el.street.toLowerCase().includes(searchValues[currentSearchIndex].value),
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

  const handleClick = (id: number, isChecked: boolean) => {
    const newSelected = isChecked
      ? [...selectedNotesId, id]
      : selectedNotesId.filter((el) => el !== id);

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
