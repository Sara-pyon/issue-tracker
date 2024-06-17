"use client"

import { Select } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

const IssuePageSize = ({pageSize}: {pageSize: string[]}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

  return (
    <Select.Root
        defaultValue={searchParams.get('size') || "10"}
        onValueChange={(size) => {
            const params = new URLSearchParams(searchParams);
            params.delete('page');
            params.set('size', size);
            router.push('?' + params.toString())
        }}
        >
        <Select.Trigger 
            placeholder='Page size' />
        <Select.Content>
            <Select.Group>
                {pageSize.map(size => (
                    <Select.Item key={size} value={size.toString()}>
                        {size}
                    </Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default IssuePageSize