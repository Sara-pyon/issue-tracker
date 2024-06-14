import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssuePageSize from "../_components/IssuePageSize";
import IssueStatusFilter from "../_components/IssueStatusFilter";
import IssueAction from "../new/IssueAction";
import IssueTable, { columName, issueQuery } from "./IssueTable";

interface Props{
  searchParams: issueQuery
}

const pageSize = ["10", "20", "30"];

const IssuePage = async ({ searchParams }: Props ) => {
  const { status, order, orderBy, page, size } = searchParams;

  const currentPage = parseInt(page) || 1;

  const statuses = Object.values(Status);
  const validateStatus = statuses.includes(status) ? status : undefined ;
  const validateOrder = (order === "desc" || order === 'asc') ? order : undefined;
  const validateOrderBy = columName.includes(orderBy) ? orderBy : undefined;
  const validatePageSize = pageSize.includes(size) ? parseInt(size) : undefined;

  const issues = await prisma.issue.findMany({
    where: { status : validateStatus },
    orderBy: validateOrderBy ? { [validateOrderBy] : validateOrder} : undefined,
    skip: validatePageSize ? (currentPage - 1) * validatePageSize : undefined,
    take: validatePageSize
  });

  const countIssue = await prisma.issue.count({ where: { status: validateStatus }});

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" px="5px" height="fit">
        <Flex gap="2">
          <IssueStatusFilter />
          <IssuePageSize pageSize={pageSize}/>
        </Flex>
        <IssueAction />
      </Flex>
      <IssueTable issues={issues} searchParams={searchParams}/>
      <Pagination currentPage={currentPage} itemCount={countIssue} pageSize={validatePageSize || 10}/>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;

export const metadata:Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues"
}
