import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import { toggleAddActModal } from '../../redux/reducers/modals/modalsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IModal } from '../../types/type';
import AddActModalComponent from './AddActModal.component';
import { IFullNoteData, INotesState } from '../../types/MesTypes';

interface Props {
  selectedNotesId: number[];
}

function AddActModalContainer(props: Props) {
  const { selectedNotesId } = props;

  const [selectedNotes, setSelectedNotes] = useState<IFullNoteData[]>([]);

  const { isAddActModalOpen } = useSelector<RootState, IModal>(
    (state) => state.modals,
  );

  const {
    notesWithoutAct,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  useEffect(() => {
    const newSelectedNotes = notesWithoutAct.filter((note) => selectedNotesId.includes(note.id));

    setSelectedNotes(newSelectedNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch: IAuthResponseType = useDispatch();

  const handleClose = () => {
    dispatch(toggleAddActModal(false));
  };

  return (
    <AddActModalComponent
      isAddActModalOpen={isAddActModalOpen}
      handleClose={handleClose}
    />
  );
}

export default AddActModalContainer;
