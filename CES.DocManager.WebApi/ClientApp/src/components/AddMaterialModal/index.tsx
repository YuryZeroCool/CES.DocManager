import { AxiosError } from 'axios';
import React, {
  memo,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Modal,
  Stack,
  rem,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import getUnits from '../../redux/actions/report/materialReport/getUnits';
import createNewMaterial from '../../redux/actions/report/materialReport/createNewMaterial';
import { IMaterialsResponse, MaterialRequest, NewMaterialForm } from '../../types/ReportTypes';
import UnitsSelect from './components/UnitsSelect';
import GroupAccountSelect from './components/GroupAccountSelect';
import FormInput from './components/FormInput';

interface AddMaterialModalProps {
  addMaterialModalOpened: boolean;
  addMaterialModalClose: () => void;
}

function AddMaterialModal(props: AddMaterialModalProps) {
  const { addMaterialModalOpened, addMaterialModalClose } = props;

  const { accountsList, units } = useSelector<RootState, IMaterialsResponse>(
    (state) => state.materials,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm<NewMaterialForm, NewMaterialForm>({ mode: 'onChange' });

  const dispatch: IAuthResponseType = useDispatch();

  useEffect(() => {
    async function getUnitsList(): Promise<void> {
      try {
        await dispatch(getUnits());
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          showNotification({
            title: 'Единицы измерения не были получены',
            message: 'Произошла ошибка во время получения единиц измерения.',
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            styles: { icon: { background: 'red' } },
          });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUnitsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    addMaterialModalClose();
  };

  const createMaterialData = (data: NewMaterialForm) => {
    const createdMaterial: MaterialRequest = {
      name: data.name,
      unitId: units.filter((el) => el.name === data.unit)[0].id,
      productGroupAccountId: accountsList.filter(
        (el) => el.name === data.productGroupAccount,
      )[0].id,
      partyName: data.partyName,
      partyDate: data.partyDate,
      count: +data.count.replace(',', '.'),
      price: +data.price.replace(',', '.'),
    };
    return createdMaterial;
  };

  const onSubmit = async (data: NewMaterialForm) => {
    try {
      await dispatch(createNewMaterial(createMaterialData(data)));
      reset();
      addMaterialModalClose();
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showNotification({
          title: 'Материал не был добавлен',
          message: 'Произошла ошибка во время добавления материала.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      }
    }
  };

  return (
    <Modal
      opened={addMaterialModalOpened}
      onClose={handleClose}
      title="Добавить материал"
      centered
      closeOnClickOutside={false}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={20}>
          <Stack gap={15}>
            <FormInput control={control} name="name" label="Наименование материала" />
            <GroupAccountSelect control={control} groupAccounts={accountsList} />
            <UnitsSelect control={control} units={units} />
            <FormInput control={control} name="partyName" label="Номер партии" />
            <FormInput control={control} name="partyDate" label="Дата поступления материала" />
            <FormInput control={control} name="count" label="Количество" />
            <FormInput control={control} name="price" label="Стоимость материала" />
          </Stack>
          <Flex justify="flex-end" gap={10}>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
              Отменить
            </Button>

            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              type="submit"
              // eslint-disable-next-line react-hook-form/destructuring-formstate
              disabled={!formState.isValid}
            >
              Сохранить
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
}

export default memo(AddMaterialModal);
