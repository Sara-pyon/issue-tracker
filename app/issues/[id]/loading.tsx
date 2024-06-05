import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailLoadingPage = () => {
  return (
    <div className='max-w-lg'>
        <Skeleton count={4} />
    </div>
  )
}

export default IssueDetailLoadingPage