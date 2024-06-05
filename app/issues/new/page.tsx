"use client"

import { Button, Callout, TextField, Text, Spinner } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validateSchema';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors, isValid }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className='max-w-xl'>
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(async(data) => {
          try{
            setSubmitting(true);
            await axios.post('/api/issues', data)
                      .then(() => setSubmitting(false));
            router.push('/issues');
          }catch(error){
            setSubmitting(false);
            console.log(error);
          }
        })}>
          <TextField.Root placeholder='title' {...register('title')} />
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          <Controller 
            name='description' 
            control={control}
            render={({ field }) =>  <SimpleMDE placeholder="Description" {...field} />}
          />
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
          <Button variant='classic' disabled={isSubmitting} >
              Submit New Issue
              {isSubmitting && <Spinner />}
          </Button>
      </form>
    </div>
  )
}

export default NewIssuePage