import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AccountsGroupState, AllGroupAccountsResponse, GroupAccount } from '../../types/ReportTypes';
import './AccountGroupCheckboxes.style.scss';

interface Props {
  groupAccounts: AllGroupAccountsResponse | undefined;
  accountsGroup: AccountsGroupState[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  accountsGroupError: string;
  isDisabled: boolean;
  expanded: boolean;
  handleAccordionChange: () => void;
  divElRef: React.RefObject<HTMLDivElement>;
}

type AccordionWrapperProps = {
  children: React.ReactNode;
};

const AccordionWrapper = React.forwardRef<HTMLDivElement, AccordionWrapperProps>(
  (props, ref) => (
    <div className="account-checkboxes-container" ref={ref}>
      {props.children}
    </div>
  ),
);

export default function AccountGroupCheckboxesComponent(props: Props) {
  const {
    accountsGroup,
    groupAccounts,
    handleChange,
    handleClick,
    accountsGroupError,
    isDisabled,
    expanded,
    handleAccordionChange,
    divElRef,
  } = props;

  const Accordion = styled((elProps: AccordionProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiAccordion disableGutters elevation={0} square {...elProps} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&.MuiTypography-root': {
      color: '#000',
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((elProps: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...elProps}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const renderError = () => (
    accountsGroupError !== '' && (
      <p className="error-message">{accountsGroupError}</p>
    )
  );

  const renderCheckboxesContainer = () => (
    accountsGroupError === '' && (
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Выберите счет</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
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
              disabled={isDisabled}
              onClick={handleClick}
            >
              Выбрать
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    )
  );

  return (
    <AccordionWrapper ref={divElRef}>
      {renderError()}
      {renderCheckboxesContainer()}
    </AccordionWrapper>
  );
}
