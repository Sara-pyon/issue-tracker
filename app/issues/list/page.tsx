import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "../_components/IssueStatusFilter";
import IssueAction from "../new/IssueAction";
import IssueTable, { columName, issueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props{
  searchParams: issueQuery
}

const IssuePage = async ({ searchParams }: Props ) => {
  const { status, order, orderBy, page } = searchParams;

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const validateStatus = statuses.includes(status) ? status : undefined ;
  const validateOrder = (order === "desc" || order === 'asc') ? order : undefined;
  const validateOrderBy = columName.includes(orderBy) ? orderBy : undefined;

  const issues = await prisma.issue.findMany({
    where: { status : validateStatus },
    orderBy: validateOrderBy ? { [validateOrderBy] : validateOrder} : undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  });

  const countIssue = await prisma.issue.count({ where: { status: validateStatus }});

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" px="5px" height="fit">
        <IssueStatusFilter />
        <IssueAction />
      </Flex>
      <IssueTable issues={issues} searchParams={searchParams}/>
      <Pagination currentPage={currentPage} itemCount={countIssue} pageSize={pageSize}/>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;

export const metadata:Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues"
}
