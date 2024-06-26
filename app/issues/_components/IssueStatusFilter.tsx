"use client";

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: {label: string, values?: Status}[] = [
  {label: "All"},
  {label: "Open", values: "OPEN"},
  {label: "In Progress", values: "IN_PROGRESS"},
  {label: "Closed", values: "CLOSED"}
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  return (
    <Select.Root 
      defaultValue = {searchParams.get('status') || "ALL"}
      onValueChange={(status) => {
      const params = new URLSearchParams(searchParams);
      params.delete('page');

      if(searchParams.get('status')) params.delete('status');
      if(status && status !== "ALL") params.set('status', status);

      const query = params.size ? '?' + params.toString() : '';
      router.push('/issues/list' + query );
    }}>
        <Select.Trigger placeholder='Filter by status...'/>
        <Select.Content>
          <Select.Group>
            {statuses.map(status => (
            <Select.Item key={status.label} value={status.values || "ALL"}>
              {status.label}
            </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter