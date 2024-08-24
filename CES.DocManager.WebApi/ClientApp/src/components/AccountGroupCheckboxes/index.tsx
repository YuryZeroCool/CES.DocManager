import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {
  Accordion,
  Button,
  Checkbox,
  Group,
  Stack,
  rem,
} from '@mantine/core';
import getAllGroupAccounts from '../../redux/actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../redux/actions/report/materialReport/getAllMaterials';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  addToCurrentGroupAccount,
  changeStatus,
  resetAllMaterials,
} from '../../redux/reducers/report/materialsReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import {
  IMaterialsResponse,
} from '../../types/ReportTypes';
import classes from './accountGroupCheckboxes.module.scss';

function AccountCheckboxes() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  const dispatch: IAuthResponseType = useDispatch();

  const { currentGroupAccount, accountsList } = useSelector<RootState,
  IMaterialsResponse>((state) => state.materials);

  useEffect(() => {
    async function getGroupAccounts(): Promise<void> {
      try {
        await dispatch(getAllGroupAccounts(''));
      } catch (error) {
        showNotification({
          title: 'Список счетов не был получен',
          message: 'Произошла ошибка во время получения списка счетов.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getGroupAccounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentGroupAccount.length === 0) {
      setIsDisabled(true);
      dispatch(resetAllMaterials());
      dispatch(changeStatus());
    } else {
      setIsDisabled(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupAccount]);

  const handleSelectedAccountsChange = (values: string[]) => {
    dispatch(addToCurrentGroupAccount(values));
  };

  const handleClick = async () => {
    if (currentGroupAccount.length > 0) {
      try {
        dispatch(resetAllMaterials());
        await dispatch(getAllMaterials(currentGroupAccount.join(', ')));
        setAccordionValue(null);
      } catch (error) {
        showNotification({
          title: 'Материалы не были получены',
          message: 'Произошла ошибка во время получения материалов.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  const handleAccordionChange = (value: string | null) => {
    setAccordionValue(value);
  };

  return (
    <Accordion variant="contained" value={accordionValue} onChange={handleAccordionChange} className={classes.accordion}>
      <Accordion.Item value="Выберите счет" className={classes.accordionItem}>
        <Accordion.Control className={classes.accordionControl}>
          Выберите счет
        </Accordion.Control>

        <Accordion.Panel pt={20}>
          <Stack gap={30} align="flex-start">
            {accountsList.length > 0 && (
              <Checkbox.Group value={currentGroupAccount} onChange={handleSelectedAccountsChange}>
                <Group align="flex-start" gap={20}>
                  {accountsList.map((item) => (
                    <Checkbox
                      key={item.id}
                      value={item.name}
                      label={item.name}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  ))}
                </Group>
              </Checkbox.Group>
            )}

            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              disabled={isDisabled}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleClick}
              w={120}
            >
              Выбрать
            </Button>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default memo(AccountCheckboxes);
