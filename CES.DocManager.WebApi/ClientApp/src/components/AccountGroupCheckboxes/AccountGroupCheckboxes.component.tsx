import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { AccountsGroupState, AllGroupAccountsResponse, GroupAccount } from '../../types/ReportTypes';
import './AccountGroupCheckboxes.style.scss';

interface Props {
  groupAccounts: AllGroupAccountsResponse | undefined;
  accountsGroup: AccountsGroupState[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  accountsGroupError: string;
}

export default function AccountGroupCheckboxesComponent(props: Props) {
  const {
    accountsGroup,
    groupAccounts,
    handleChange,
    handleClick,
    accountsGroupError,
  } = props;

  const renderError = () => (
    accountsGroupError !== '' && (
      <p className="error-message">{accountsGroupError}</p>
    )
  );

  const renderCheckboxesContainer = () => (
    accountsGroupError === '' && (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Выберите счет</FormLabel>
          {accountsGroup.length !== 0 && (
            <FormGroup sx={{ display: 'flex', width: 'inherit' }}>
              {groupAccounts?.map((el: GroupAccount) => (
                <FormControlLabel
                  key={el.id}
                  control={(
                    <Checkbox
                      checked={accountsGroup.filter((elem) => elem.name === el.name)[0].checked}
                      onChange={handleChange}
                      name={el.name}
                    />
                  )}
                  label={el.name}
                />
              ))}
            </FormGroup>
          )}
        </FormControl>
        <Button
          sx={{ m: 1, width: 120 }}
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          Выбрать
        </Button>
      </Box>
    )
  );

  return (
    <div className="account-checkboxes-container">
      {renderError()}
      {renderCheckboxesContainer()}
    </div>
  );
}
