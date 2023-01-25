import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import {
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/react';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset/>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
