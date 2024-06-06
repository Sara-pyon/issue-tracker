"use server";

import prisma from '@/prisma/client'
import { Select } from '@radix-ui/themes'

const AssingneeSelect = async() => {
    const users = await prisma.user.findMany({
        orderBy: { name: 'desc' }
    });

  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign ...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users.map(user => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssingneeSelect