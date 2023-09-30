import { INote } from '../../types/MesTypes';

interface HeadCell {
  id: number;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 1,
    numeric: false,
    label: 'Комментарий',
  },
  {
    id: 2,
    numeric: true,
    label: 'Дата создания',
  },
];

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  bgcolor: 'transparent',
  border: 'none',
  outline: 'none',
};
