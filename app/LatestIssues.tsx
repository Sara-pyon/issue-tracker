import prisma from "@/prisma/client";
import { Flex, Table, Text, Box, Avatar, Card, Heading } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
        assignedToUser: true
    }
  });

  return (
    <Card>
      <Heading ml="1" mb="3" size="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(async (issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                      <Flex direction="column" gap="2">
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                        <Box>
                          <IssueStatusBadge status={issue.status} />
                        </Box>
                      </Flex>
                      {issue.assignedToUser && (
                        <Avatar
                          src={issue.assignedToUser.image!}
                          fallback="?" radius="full"
                          className="cursor-pointer"
                        /> )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
