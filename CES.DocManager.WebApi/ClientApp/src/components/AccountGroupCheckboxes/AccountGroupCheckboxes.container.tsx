import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllGroupAccounts from '../../redux/actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  addToCurrentGroupAccount,
  changeStatus,
  deleteFromCurrentGroupAccount,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  AccountsGroupState,
  AllGroupAccountsResponse,
  CurrentGroupAccountResponse,
  GroupAccount,
} from '../../types/ReportTypes';
import AccountGroupCheckboxesComponent from './AccountGroupCheckboxes.component';

interface Props {
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

function AccountCheckboxesContainer({ setProductsTableError }: Props) {
  const groupAccounts = useSelector<RootState,
  AllGroupAccountsResponse | undefined>((state) => state.materials.getAllGroupAccounts);

  const currentGroupAccount = useSelector<RootState,
  CurrentGroupAccountResponse | undefined>((state) => state.materials.currentGroupAccount);

  const [accountsGroup, setAccountGroup] = useState<AccountsGroupState[]>([]);

  const [accountsGroupError, setAccountsGroupError] = useState<string>('');

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    groupAccounts?.forEach((el: GroupAccount) => {
      if (currentGroupAccount) {
        const elem: AccountsGroupState = {
          name: el.name,
          checked: currentGroupAccount.includes(el.name),
        };
        setAccountGroup((prevState) => [...prevState, { ...elem }]);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupAccounts]);

  useEffect(() => {
    if (currentGroupAccount?.length === 0) {
      setIsDisabled(true);
      dispatch(resetAllMaterials());
      dispatch(changeStatus());
    } else {
      setIsDisabled(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupAccount]);

  useEffect(() => {
    async function getGroupAccounts(): Promise<void> {
      try {
        await dispatch(getAllGroupAccounts(''));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setAccountsGroupError(error.message);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getGroupAccounts();
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountGroup((prevState) => (prevState.map((el) => {
      if (el.name === event.target.name) {
        return { name: event.target.name, checked: event.target.checked };
      }
      return el;
    })
    ));
    if (event.target.checked) {
      dispatch(addToCurrentGroupAccount(event.target.name));
    } else {
      dispatch(deleteFromCurrentGroupAccount(event.target.name));
    }
  };

  const handleClick = async () => {
    if (currentGroupAccount) {
      try {
        dispatch(resetAllMaterials());
        await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setProductsTableError(error.message);
        }
      }
    }
  };

  return (
    <AccountGroupCheckboxesComponent
      groupAccounts={groupAccounts}
      accountsGroup={accountsGroup}
      handleChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClick={handleClick}
      accountsGroupError={accountsGroupError}
      isDisabled={isDisabled}
    />
  );
}

export default AccountCheckboxesContainer;
