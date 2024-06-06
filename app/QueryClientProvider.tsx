"use client";

import {
    QueryClient,
    QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const client = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <ReactQueryProvider client={client}>
        {children}
    </ReactQueryProvider>
  )
}

export default QueryClientProvider