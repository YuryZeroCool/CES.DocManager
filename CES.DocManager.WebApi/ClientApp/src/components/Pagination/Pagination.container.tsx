import React from 'react';
import PaginationComponent from './Pagination.component';

interface PaginationProps {
  page: number;
  totalPage: number;
  handleCurrentPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function PaginationContainer(props: PaginationProps) {
  const {
    page,
    totalPage,
    handleCurrentPageChange,
  } = props;

  return (
    <PaginationComponent
      page={page}
      totalPage={totalPage}
      handleCurrentPageChange={handleCurrentPageChange}
    />
  );
}

export default PaginationContainer;
