import { Select } from '@radix-ui/themes'

const AssingneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign ...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value='1'>Sara Komatsu</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssingneeSelect