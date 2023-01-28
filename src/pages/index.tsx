import Head from 'next/head'
import React, { useState } from 'react';
import { Box, Heading, Flex,} from '@chakra-ui/react';
import { useInfiniteQuery } from "@tanstack/react-query";
import Information from './components/Information';
import GitHubInput from './components/GitHubInput';
import ErrorScreen from './components/ErrorScreen';
import DataDisplay from './components/DataDisplay';

export default function Home() {
  const [queryParams, setQueryParams] = useState('vercel/next.js');

  const dataToParent = (childData: string) => {
    setQueryParams(childData);
  }

  const { data, status, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [queryParams],
    async ({ pageParam = 1 }) =>
      await fetch(
        `https://api.github.com/repos/${queryParams}/issues?page=${pageParam}`
      ).then((result) => result.json()),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return nextPage 
        }
      }
  );

  return (
    <>
      <Head>
        <title>GitHub Issue Seeker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box mt={5}>
        <Heading as="h1" textAlign="center" size="2xl" mb={5}>
          Github Issue Seeker
        </Heading>
      </Box>
      
      {
        (data || isLoading==true) ?
        <Box mt={5}>
          <br/>
          <Flex justify="center">
            <Information/>
            <GitHubInput dataToChild={data} dataToParent={dataToParent}/>
          </Flex>
          <Flex justify="center">
            { (status === "success" && data.pages[0].length > 10) && (
              <DataDisplay data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}/>
            )}
          </Flex>
        </Box> :
        <ErrorScreen text={'It seems that you have exceeded the maximum number of API calls. Please try again later.'}/>
      }
    </>
  )
}