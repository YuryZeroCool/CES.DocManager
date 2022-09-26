import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllGroupAccounts from '../../redux/actions/report/materialReport/getAllGroupAccounts';
import { RootState } from '../../redux/reducers/combineReducers';
import { changeCurrentGroupAccount, resetAllMaterials } from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { AccountsGroupState, AllGroupAccountsResponse, GroupAccount } from '../../types/ReportTypes';
import AccountGroupCheckboxesComponent from './AccountGroupCheckboxes.component';

function AccountCheckboxesContainer() {
  const groupAccounts = useSelector<RootState,
  AllGroupAccountsResponse | undefined>((state) => state.materials.getAllGroupAccounts);

  const [accountsGroup, setAccountGroup] = useState<AccountsGroupState[]>([]);

  const [accountsGroupError, setAccountsGroupError] = useState<string>('');

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    groupAccounts?.forEach((el: GroupAccount) => {
      const elem: AccountsGroupState = {
        name: el.name,
        checked: false,
      };
      setAccountGroup((prevState) => [...prevState, { ...elem }]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupAccounts]);

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
  };

  const handleClick = () => {
    const checkedAccountGroup = accountsGroup.filter((el) => el.checked);
    if (checkedAccountGroup.length !== 0) {
      const str = checkedAccountGroup.map((el) => el.name).join(', ');
      dispatch(changeCurrentGroupAccount(str));
    } else {
      dispatch(changeCurrentGroupAccount(''));
      dispatch(resetAllMaterials());
    }
  };

  return (
    <AccountGroupCheckboxesComponent
      groupAccounts={groupAccounts}
      accountsGroup={accountsGroup}
      handleChange={handleChange}
      handleClick={handleClick}
      accountsGroupError={accountsGroupError}
    />
  );
}

export default AccountCheckboxesContainer;
