import { Flex, Pagination } from '@mantine/core';
import React from 'react';
import classes from './Pagination.module.scss';

interface Props {
  page: number;
  totalPage: number;
  width: string;
  justify: string;
  handleCurrentPageChange: (value: number) => void;
}

export default function PaginationComponent(props: Props) {
  const {
    page,
    totalPage,
    width,
    justify,
    handleCurrentPageChange,
  } = props;

  return (
    <Flex justify={justify} w={width}>
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
