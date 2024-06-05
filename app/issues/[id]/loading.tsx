import { Card, Flex, Heading } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailLoadingPage = () => {
  return (
    <div className='max-w-lg'>
        <Heading mb="2"><Skeleton /></Heading>
        <Flex gapX="2" align="center">
          <Skeleton width="5rem" />
          <p><Skeleton width="8rem" /></p>
        </Flex>
        <Card className='prose' mt="4" >
          <Skeleton count={4} />
        </Card>
    </div>
  )
}

export default IssueDetailLoadingPage