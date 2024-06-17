import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Flex, Table } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

export interface issueQuery{
    status: Status;
    order?: "desc" | "asc";
    orderBy: keyof Issue;
    page: string;
    size: "10"|"20"|"30";
    assigned: string;
}

interface Props{
    searchParams: issueQuery,
    issues: Issue[]
}

const IssueTable = ({searchParams, issues}:Props) => {
    const { order, orderBy } = searchParams;

    const validateOrder = (order === "desc" || order === 'asc') ? order : undefined;
    const validateOrderBy = colums.map(col => col.value).includes(orderBy) ? orderBy : undefined;

  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {colums.map(col => (
              <Table.ColumnHeaderCell key={col.label} className={col.className}>
                <Flex align="center" gap="2">
                  <Link href={{
                    query: {
                      ...searchParams, 
                      order: validateOrder === "asc" ? "desc" : "asc",
                      orderBy: col.value
                    }
                  }}>{col.label}</Link>
                  {(col.value === validateOrderBy) ? (validateOrder === "asc") ? 
                        <FaArrowUpLong /> : <FaArrowDownLong /> : undefined}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.updatedAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const colums: {label: string, value: keyof Issue, className?: string}[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "createdAt", className: "hidden md:table-cell"},
    ];

export const columName: string[] = colums.map(col => col.value);


export default IssueTable