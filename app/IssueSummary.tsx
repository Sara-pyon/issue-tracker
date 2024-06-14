import { Status } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: { label: string, value: number, status: Status}[] = [
        {label: "Open Issues", value: open, status: "OPEN"},
        {label: "In-Progress Issues ", value: inProgress, status: "IN_PROGRESS"},
        {label: "Closed Issues ", value: closed, status: "CLOSED"}
    ];

  return (
    <Flex gap={{initial: "2", xs: "5"}} direction={{initial: "column", xs: "row"}}>
        {containers.map(container => (
            <Link key={container.label} href={`/issues/list?status=${container.status}`}>
                <Card>
                    <Flex direction="column" gap="1">
                        <Text weight="medium">{container.label}</Text>
                        <Text size="5" weight="bold" className='pl-1'>
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            </Link>
        ))}
    </Flex>
  )
}

export default IssueSummary