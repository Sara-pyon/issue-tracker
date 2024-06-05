"use client"

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

interface ErrorsForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div className='max-w-xl'>
      {error && 
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(async(data) => {
          try{
            await axios.post('/api/issues', data);
            router.push('/issues');
          }catch(error){
            setError('An unexpected error occurred');
            console.log(error);
          }
        })}>
          <TextField.Root placeholder='title' {...register('title')} />
          <Controller 
            name='description' 
            control={control}
            render={({ field }) =>  <SimpleMDE placeholder="Description" {...field} />}
          />
          <Button variant='classic'>
              Submit New Issue
          </Button>
      </form>
    </div>
  )
}

export default NewIssuePage