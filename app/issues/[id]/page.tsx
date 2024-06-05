import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props{
    params: { id: string }
}

const IssueDetailPage = async({params}: Props) => {
  if(typeof parseInt(params.id) !== 'number') return notFound();

  const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id) }});
  if(!issue) return notFound();

  return (
    <div className='space-y-2'>
        <Heading>{issue.title}</Heading>
        <Flex gapX="2" align="center">
          <IssueStatusBadge status={issue.status}/>
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card>{issue.description}</Card>
    </div>
  )
}

export default IssueDetailPage