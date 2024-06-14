"use client"

import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ChangeIssueStatus = ({issue}: {issue: Issue}) => {
    const statuses:{label: string, value: Status}[] = [
        {label: 'Open', value: 'OPEN'},
        {label: 'In Progress', value: 'IN_PROGRESS'},
        {label: 'Closed', value: 'CLOSED'},
    ];
    const router = useRouter();
    
    return (
        <Select.Root 
          defaultValue={issue.status}
          onValueChange={(status:string) => {
            axios.patch(`/api/issues/${issue.id}`, {status: status})
                .catch(() => toast.error("Changes could not be saved."));
            router.refresh();
          }}
        >
          <Select.Trigger placeholder="Change status ..." />
          <Select.Content>
            <Select.Group>
              {statuses?.map((status) => (
                <Select.Item key={status.label} value={status.value}>
                  {status.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
          <Toaster />
        </Select.Root>
      );
}

export default ChangeIssueStatus