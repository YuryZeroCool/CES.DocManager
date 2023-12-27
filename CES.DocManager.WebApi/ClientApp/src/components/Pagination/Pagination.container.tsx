import React from 'react';
import PaginationComponent from './Pagination.component';

interface PaginationProps {
  page: number;
  totalPage: number;
  width: string;
  justify: string;
  handleCurrentPageChange: (value: number) => void;
}

function PaginationContainer(props: PaginationProps) {
  const {
    page,
    totalPage,
    width,
    justify,
    handleCurrentPageChange,
  } = props;

  return (
    <PaginationComponent
      page={page}
      totalPage={totalPage}
      width={width}
      justify={justify}
      handleCurrentPageChange={handleCurrentPageChange}
    />
  );
}

export default PaginationContainer;
