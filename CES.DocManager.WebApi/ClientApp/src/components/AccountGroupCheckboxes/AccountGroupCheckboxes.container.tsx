import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllGroupAccounts from '../../redux/actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  addToCurrentGroupAccount,
  changeAccordionHeight,
  changeStatus,
  deleteFromCurrentGroupAccount,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  AccountsGroupState,
  AllGroupAccountsResponse,
  GroupAccount,
  IMaterialsResponse,
} from '../../types/ReportTypes';
import AccountGroupCheckboxesComponent from './AccountGroupCheckboxes.component';

interface Props {
  setProductsTableError: React.Dispatch<React.SetStateAction<string>>;
}

function AccountCheckboxesContainer({ setProductsTableError }: Props) {
  const groupAccounts = useSelector<RootState,
  AllGroupAccountsResponse | undefined>((state) => state.materials.getAllGroupAccounts);

  const { currentGroupAccount } = useSelector<RootState,
  IMaterialsResponse>((state) => state.materials);

  const [accountsGroup, setAccountGroup] = useState<AccountsGroupState[]>([]);

  const [accountsGroupError, setAccountsGroupError] = useState<string>('');

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [expanded, setExpanded] = React.useState<boolean>(true);

  const dispatch: IAuthResponseType = useDispatch();

  const divElRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (divElRef.current) {
      dispatch(changeAccordionHeight(divElRef.current.clientHeight));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  useEffect(() => {
    if (divElRef.current) {
      dispatch(changeAccordionHeight(divElRef.current.clientHeight));
    }
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
        setExpanded(false);
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setProductsTableError(error.message);
        }
      }
    }
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <AccountGroupCheckboxesComponent
      groupAccounts={groupAccounts}
      accountsGroup={accountsGroup}
      accountsGroupError={accountsGroupError}
      isDisabled={isDisabled}
      expanded={expanded}
      divElRef={divElRef}
      handleChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleClick={handleClick}
      handleAccordionChange={handleAccordionChange}
    />
  );
}

export default AccountCheckboxesContainer;
