import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueAssignUser from "../_components/IssueAssignUser";
import IssuePageSize from "../_components/IssuePageSize";
import IssueStatusFilter from "../_components/IssueStatusFilter";
import IssueAction from "../new/IssueAction";
import IssueTable, { columName, issueQuery } from "./IssueTable";

interface Props{
  searchParams: issueQuery
}

const pageSize = ["10", "20", "30"];

const IssuePage = async({ searchParams }: Props ) => {

  const { status, page, order, orderBy, size, assigned } = await validateParams(searchParams);
 
  const issues = await prisma.issue.findMany({
    where: { status,
            assignedToUserId: assigned === "UNASSIGNED" ? null : 
                              assigned === "ASSIGNED" ? { not: null }:
                              assigned
     },
    orderBy: orderBy ? { [orderBy] : order} : undefined,
    skip: page ? (page - 1) * parseInt(size) : undefined,
    take: parseInt(size)
  });

  const countIssue = await prisma.issue.count({ 
    where: { status,
          assignedToUserId: assigned === "UNASSIGNED" ? null : 
                            assigned === "ASSIGNED" ? { not: null }:
                            assigned
     }
  });

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" px="5px" height="fit">
        <Flex gap="2">
          <IssueStatusFilter />
          <IssuePageSize pageSize={pageSize}/>
          <IssueAssignUser />
        </Flex>
        <IssueAction />
      </Flex>
      <IssueTable issues={issues} searchParams={searchParams}/>
      <Pagination currentPage={page} itemCount={countIssue} pageSize={parseInt(size) || 10}/>
    </Flex>
  );
};

const validateParams = async(searchParams: issueQuery) => {
  const { status, order, orderBy, page, size, assigned } = searchParams;
  const assignedUser = assigned ? await prisma.user.findUnique({ where: {id: assigned}}) : undefined;

  const currentPage = parseInt(page) || 1;
  const statuses = Object.values(Status);
  const validateStatus = statuses.includes(status) ? status : undefined;
  const validateOrder = (order === "desc" || order === 'asc') ? order : undefined;
  const validateOrderBy = columName.includes(orderBy) ? orderBy : undefined;
  const validatePageSize = pageSize.includes(size) ? size : "10";

  const validateAssignedUserId = ["UNASSIGNED", "ASSIGNED"].includes(assigned) ?
                                  assigned : assignedUser ? assigned : undefined;
  
  return {
    page: currentPage,
    status: validateStatus,
    order: validateOrder,
    orderBy: validateOrderBy,
    size: validatePageSize,
    assigned: validateAssignedUserId
   }

}

export const dynamic = "force-dynamic";

export default IssuePage;

export const metadata:Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues"
}
