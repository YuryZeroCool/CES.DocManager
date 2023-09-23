import { HeadSearchCell, SearchValueType } from '../../types/MesTypes';

interface HeadCell {
  id: number;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 1,
    numeric: false,
    label: 'Адрес',
  },
  {
    id: 2,
    numeric: true,
    label: 'Дата поступления',
  },
  {
    id: 3,
    numeric: true,
    label: 'Телефон',
  },
  {
    id: 4,
    numeric: true,
    label: 'Комментарий',
  },
];

export const headSearchCells: readonly HeadSearchCell[] = [
  {
    id: 'address',
    name: 'address',
  },
  {
    id: 'receiptDate',
    name: 'receiptDate',
  },
  {
    id: 'phone',
    name: 'phone',
  },
  {
    id: 'comment',
    name: 'comment',
  },
];

export const defaultSearchValues: SearchValueType[] = [
  {
    id: 'address',
    value: '',
  },
  {
    id: 'receiptDate',
    value: '',
  },
  {
    id: 'phone',
    value: '',
  },
  {
    id: 'comment',
    value: '',
  },
];

export const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  bgcolor: 'transparent',
  border: 'none',
  outline: 'none',
};
