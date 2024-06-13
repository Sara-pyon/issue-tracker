"use client"
import React, { useState } from 'react';
import { Button, Text, Flex } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface Props{
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const pageCount = Math.ceil( itemCount/pageSize );
    const [ page, setPage ] = useState(currentPage);

    if(pageCount <= 1) return null;
    if(page <= 0) return null

  return (
    <>
        <Text>
            Page { page } of { pageCount }
        </Text>
        <Flex gap="2">
            <Button color='gray' variant='soft' 
                disabled={page === 1}
                onClick={() => setPage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={page === 1}
                onClick={() => setPage(page-1)}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={page === pageCount}
                onClick={() => setPage(page+1)}
            >
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={page === pageCount}
                onClick={() => setPage(pageCount)}>
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    </>
  )
}

export default Pagination