import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading mb="2">{issue.title}</Heading>
      <Flex gapX="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full" mt="4" >
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetail;
