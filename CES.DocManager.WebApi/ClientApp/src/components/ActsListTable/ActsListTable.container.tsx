import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { ActsList } from '../../types/MesTypes';
import ActsListTableComponent from './ActsListTable.component';
import deleteAct from '../../redux/actions/mes/deleteAct';
import handleError from '../../utils';
import { changeSelectedActId, editActsListAfterDelete } from '../../redux/reducers/mes/mesReducer';

interface ActsListTableContainerProps {
  mesError: string;
  actsList: ActsList[];
  requestStatus: string;
  setMesError: React.Dispatch<React.SetStateAction<string>>;
  editActModalOpen: () => void;
}

function ActsListTableContainer(props: ActsListTableContainerProps) {
  const {
    mesError,
    actsList,
    requestStatus,
    setMesError,
    editActModalOpen,
  } = props;

  const [currentAct, setCurrentAct] = useState<ActsList | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [totalActSumm, setTotalActSumm] = useState(0);
  const [totalActVat, setTotalActVat] = useState(0);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    let summ = 0;
    let vat = 0;
    if (actsList.length > 0) {
      actsList.forEach((el) => {
        summ += parseFloat(el.total.toString()) * 100;
        vat += parseFloat(el.vat.toString()) * 100;
      });

      setTotalActSumm(+(summ / 100).toFixed(2));
      setTotalActVat(+(vat / 100).toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actsList]);

  const handleDrawerOpen = (actId: number) => {
    const act = actsList.filter((el) => el.id === actId)[0];
    setCurrentAct(act);
    open();
  };

  const handleDrawerClose = () => {
    setCurrentAct(null);
    close();
  };

  const handleEditIconClick = (id: number) => {
    dispatch(changeSelectedActId(id));
    editActModalOpen();
  };

  const handleDeleteIconClick = (id: number) => {
    dispatch(deleteAct(id))
      .then(() => dispatch(editActsListAfterDelete(id)))
      .catch((error) => handleError(error, setMesError));
  };

  return (
    <ActsListTableComponent
      mesError={mesError}
      actsList={actsList}
      requestStatus={requestStatus}
      detailsInfoPanelOpen={opened}
      currentAct={currentAct}
      totalActSumm={totalActSumm}
      totalActVat={totalActVat}
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      handleEditIconClick={handleEditIconClick}
      handleDeleteIconClick={handleDeleteIconClick}
    />
  );
}

export default ActsListTableContainer;
