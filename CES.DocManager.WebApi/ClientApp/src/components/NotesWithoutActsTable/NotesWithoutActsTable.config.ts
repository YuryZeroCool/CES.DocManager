import { HeadSearchCell, SearchValueType } from '../../types/MesTypes';

interface HeadCell {
  id: number;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 1,
    label: '',
  },
  {
    id: 2,
    label: 'Адрес',
  },
  {
    id: 3,
    label: 'Дата поступления',
  },
  {
    id: 4,
    label: 'Телефон',
  },
  {
    id: 5,
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
