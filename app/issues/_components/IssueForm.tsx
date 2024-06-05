"use client"

import dynamic from 'next/dynamic';
import ErrorMessage from '@/app/components/ErrorMessage';
import { issueSchema } from '@/app/validateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {ssr: false});

type IssueFormData = z.infer<typeof issueSchema>;



const IssueForm = ({issue}: {issue?: Issue}) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors, isValid }} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async(data) => {
    try{
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    }catch(error){
      setSubmitting(false);
      console.log(error);
    }
  });

  return (
    <div className='max-w-xl'>
      <form 
        className='space-y-3'
        onSubmit={onSubmit}>
          <TextField.Root placeholder='title' defaultValue={issue?.title} {...register('title')} />
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          <Controller 
            name='description' 
            defaultValue={issue?.description}
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

export default IssueForm