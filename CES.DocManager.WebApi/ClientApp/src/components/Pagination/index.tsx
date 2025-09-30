import { Flex, Pagination as MantinePagination } from '@mantine/core';
import React, { memo } from 'react';
import classes from './styles.module.scss';

interface PaginationProps {
  page: number;
  totalPage: number;
  width: string;
  justify: string;
  handleCurrentPageChange: (value: number) => void;
}

function Pagination(props: PaginationProps) {
  const {
    page,
    totalPage,
    width,
    justify,
    handleCurrentPageChange,
  } = props;

  return (
    <Flex justify={justify} w={width}>
      <MantinePagination
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

export default memo(Pagination);
