import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'
import React from 'react'


const IssueFormSkelton = () => {
  return (
    <Box className='max-w-lg'>
        <Skeleton height="2rem" />
        <Skeleton height="20rem" />
    </Box>

  )
}

export default IssueFormSkelton