import { Flex, Pagination } from '@mantine/core';
import React from 'react';
import classes from './Pagination.module.scss';

interface Props {
  page: number;
  totalPage: number;
  handleCurrentPageChange: (value: number) => void;
}

export default function PaginationComponent(props: Props) {
  const {
    page,
    totalPage,
    handleCurrentPageChange,
  } = props;

  return (
    <Flex justify="center">
      <Pagination
        value={page}
        total={totalPage}
        classNames={{
          control: classes.control,
        }}
        onChange={handleCurrentPageChange}
      />
    </Flex>
  );
}
