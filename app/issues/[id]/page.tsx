import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown'
import React from 'react'
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons'

interface Props{
    params: { id: string }
}

const IssueDetailPage = async({params}: Props) => {
  
  if(typeof parseInt(params.id) !== 'number') return notFound();

  const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id) }});
  if(!issue) return notFound();

  return (
    <Grid columns={{initial: "1", sm: "2"}} gap="5">
      <Box>
        <Heading mb="2">{issue.title}</Heading>
        <Flex gapX="2" align="center">
          <IssueStatusBadge status={issue.status}/>
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose' mt="4" >
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button variant='classic'>
            <Pencil2Icon />
              Edit
          </Button>
        </Link>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage