import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const {open, inProgress, closed} = await fetchData();
  
  return(
    <Grid columns={{initial: '1', sm: '2' }} gapX="5" gap={{initial: "5", sm: "5"}}>
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

const fetchData = async() => {
  const open = await prisma.issue.count({ where: { status: "OPEN"}});
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS"}});
  const closed = await prisma.issue.count({ where: { status: "CLOSED"}});

  return {open, inProgress, closed }
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues"
}