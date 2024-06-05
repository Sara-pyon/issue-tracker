import React from 'react'
import dynamic from 'next/dynamic'
import IssueFormSkelton from '../_components/IssueFormSkelton';
const IssueForm = dynamic(
    () => import('../_components/IssueForm'), 
    {ssr: false, loading:() =>  <IssueFormSkelton />
  });

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage