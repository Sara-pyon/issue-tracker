import { Issue } from '@prisma/client'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const DeleteIssueButton = ({issueId}: {issueId:number}) => {
  return (
    <Button variant='classic' color='red' >
        Delete Issue
    </Button>

  )
}

export default DeleteIssueButton