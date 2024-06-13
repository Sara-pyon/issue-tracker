"use client"

import React from 'react';
import { Button, Text, Flex } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Props{
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter(); 

    const pageCount = Math.ceil( itemCount/pageSize );
    if(pageCount <= 1) return null;

    const changePage = (page:number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

  return (
        <Flex gap="2" align="center">
            <Button color='gray' variant='soft' 
                disabled={currentPage === 1}
                onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>
            <Text>
                Page { currentPage } of { pageCount }
            </Text>
            <Button color='gray' variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}>
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
  )
}

export default Pagination