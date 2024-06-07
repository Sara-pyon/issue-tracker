import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';
import { auth } from '@/auth';
import AssingneeSelect from './AssingneeSelect';

interface Props{
    params: { id: string }
}

const IssueDetailPage = async({params}: Props) => {
  const session = await auth();
  
  if(typeof parseInt(params.id) !== 'number') return notFound();

  const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id) }});
  if(!issue) return notFound();

  return (
    <Grid columns={{initial: "1", sm: "5"}} gap="5">
      <Box className='sm:col-span-4'>
       <IssueDetail issue={issue} />
      </Box>
      {session && <Box >
        <Flex direction="column" gap="3" width="co">
          <AssingneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}

export default IssueDetailPage