import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueAction = () => {
  return (
    <div>
        <Button variant="classic">
            <Link href='/issues/new'>New issue</Link>
        </Button>
   </div>
  )
}

export default IssueAction