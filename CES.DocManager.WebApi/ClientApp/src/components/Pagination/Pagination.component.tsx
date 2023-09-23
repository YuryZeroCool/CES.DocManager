import { Container, Pagination } from '@mui/material';
import React from 'react';

interface Props {
  page: number;
  totalPage: number;
  handleCurrentPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationComponent(props: Props) {
  const {
    page,
    totalPage,
    handleCurrentPageChange,
  } = props;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination count={totalPage} page={page} onChange={handleCurrentPageChange} shape="rounded" />
    </Container>
  );
}
