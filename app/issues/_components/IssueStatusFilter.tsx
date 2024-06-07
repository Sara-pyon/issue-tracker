"use client";

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: {label: string, values?: Status}[] = [
  {label: "All"},
  {label: "Open", values: "OPEN"},
  {label: "In Progress", values: "IN_PROGRESS"},
  {label: "Closed", values: "CLOSED"}
]

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root onValueChange={(status) => {
      const query = (status === "ALL") ? "" : `?status=${status}`;
      router.push('/issues/list' + query);
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