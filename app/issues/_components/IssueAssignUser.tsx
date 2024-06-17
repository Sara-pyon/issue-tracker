"use client";

import useUser from '@/hooks/useUser';
import { Select } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const assignedUserDefault: { label: string, value: string }[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Unassigned', value: 'UNASSIGNED' },
        { label: 'Assigned', value: 'ASSIGNED' }
];

const IssueAssignUser = () => {
    const { data:users } = useUser(); 
    const assignedUser = [...assignedUserDefault];
    
    users?.forEach(user => assignedUser.push({label: user.name!, value: user.id!}));
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const assigningUser = (user:string) => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if(searchParams.get('assigned')) params.delete('assigned');
        if(user && user !== 'ALL') params.set('assigned', user);
        router.push('?' + params.toString());
        router.refresh();
    }

  return (
    <Select.Root 
      defaultValue={searchParams.get('assigned') || 'ALL'}
      onValueChange={assigningUser} >
      <Select.Trigger placeholder="Assign ..." />
      <Select.Content>
        <Select.Group>
         {assignedUser.map(user => (
            <Select.Item key={user.value} value={user.value}> 
                {user.label}
            </Select.Item>
         ))}
        </Select.Group>
      </Select.Content>
      <Toaster />
    </Select.Root>
  )
}

export default IssueAssignUser