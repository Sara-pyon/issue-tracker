import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueStatusFilter from "../_components/IssueStatusFilter";
import IssueAction from "../new/IssueAction";
import Link from "next/link";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

const IssuePage = async ({ searchParams }: { searchParams: { status: Status, order?: "desc" | "asc", orderBy: keyof Issue } }) => {
  const colums: {label: string, value: keyof Issue, className?: string}[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "createdAt", className: "hidden md:table-cell"},
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status : undefined ;

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <Flex justify="between" px="5px">
        <IssueStatusFilter />
        <IssueAction />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {colums.map(col => (
              <Table.ColumnHeaderCell key={col.label} className={col.className}>
                <Flex align="center" gap="2">
                  <Link href={{
                    query: {
                      ...searchParams, 
                      order: searchParams.order === "asc" ? "desc" : "asc",
                      orderBy: col.value
                    }
                  }}>{col.label}</Link>
                  {(col.value === searchParams.orderBy) ? (searchParams.order === "asc") ? 
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
