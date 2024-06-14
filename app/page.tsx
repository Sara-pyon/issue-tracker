import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Grid, Box, Flex } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN"}});
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS"}});
  const closed = await prisma.issue.count({ where: { status: "CLOSED"}});
 
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
