"use client";

import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({issueId}: {issueId:number}) => {
    const [isDeleting, setDeleting] = useState(false);
    const router = useRouter();

    const deleteIssue = async() => {
        try{
            setDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
        }catch(error){
            setDeleting(false);
            console.log(error);
        }
    }

  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button variant='classic' color='red' disabled={isDeleting}>
                {isDeleting && <Spinner />}
                Delete Issue
            </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete this issue? This acction cannot be undone.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={deleteIssue}>
                    Delete Issue
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    

  )
}

export default DeleteIssueButton