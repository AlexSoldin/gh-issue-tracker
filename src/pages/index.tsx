import Head from 'next/head'
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Box, 
  Heading, Flex, Text, Button, Progress, } from '@chakra-ui/react';
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Information from './components/Information';
import GitHubInput from './components/GitHubInput';
import ErrorScreen from './components/ErrorScreen';

// reduce the length of text should it be too long for the accordian
function reduceText(value: string) {
  if (value.length > 40){
    return value.substring(0, 40) + '...';
  } else {
    return value;
  }
}

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

  if (data || isLoading==true){
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
          <br/>
          <Flex justify="center">
            <Information/>
            <GitHubInput dataToChild={data} dataToParent={dataToParent}/>
          </Flex>

          <Flex justify="center">
            { (status === "success" && data.pages[0].length > 10) && (
              <InfiniteScroll
                dataLength={data?.pages.length * 20}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Progress mt={2} mb={2} size='md' isIndeterminate />}
              >
                <Accordion allowToggle w="1000px" borderWidth="1px" rounded="lg">
                {
                          data.pages.map((page) => (
                            <>
                              {page.map((item: any) => (
                                <AccordionItem key={item.id}>
                                  <h2>
                                    <AccordionButton _expanded={{ bg: '#E2E8F0', color: 'black' }}>
                                      <Box as="span" flex='1' textAlign='left'>
                                        {item.id} - {reduceText(item.title)}
                                      </Box>
                                      <Box as="span" flex='1' textAlign='right'>
                                        {item.created_at.substring(0,10)} {item.created_at.substring(12,19)}
                                      </Box>
                                      <AccordionIcon />
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    <Text fontSize={'lg'} as='b'>{item.title}</Text>
                                    <Text>Created by: {item.user.login}</Text>
                                    <Text>Created at: {item.created_at.substring(0,10)} {item.created_at.substring(12,19)}</Text>
                                    <Text>Closed at: {item.closed_at == null ? 'N/A' : item.closed_at}</Text>
                                    <Text fontSize={'sm'} mt={4}>{item.body}</Text>
                                    <Button mt={4}><a href={item.html_url}>View on GitHub</a></Button>
                                  </AccordionPanel>
                                </AccordionItem>
                              ))}
                            </>
                          ))
                        }
                </Accordion>
              </InfiniteScroll>
            )}
          </Flex>
        </Box>
      </>
    )
  } else {
    <ErrorScreen />
  }
}