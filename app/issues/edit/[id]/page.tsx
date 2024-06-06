import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkelton from './loading';


const IssueForm = dynamic(
    () => import('../../_components/IssueForm'),
    {ssr: false,
     loading: () => <IssueFormSkelton />
    });

const EditIssuePage = async({params}: {params: {id: string}}) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    });

    if(!issue) return notFound();

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage