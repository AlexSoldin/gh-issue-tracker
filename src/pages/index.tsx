import Head from 'next/head'
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Box, 
  FormControl, FormLabel, Heading, StatLabel, Flex, Input, Stat, Text, Button, Progress, 
  Container, keyframes, Spacer, } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

// import useSWR from 'swr';
// import useSWRInfinite from 'swr/infinite'

function reduceText(value: string) {
  if (value.length > 40){
    return value.substring(0, 40) + '...';
  } else {
    return value;
  }
}

export default function Home() {
  const [organisation, setOrganisation] = useState('vercel');
  const [repo, setRepo] = useState('next.js');
  const [queryParams, setQueryParams] = useState('vercel/next.js');

  // const fetcher = (url: string, queryParams: string = '') => fetch(`${url}${queryParams}`).then((r) => r.json());
  // const { data, error } = useSWRInfinite<Data, Error>((index: number) => [`api/github${queryParams}&index=${index + 1
  // }`], fetcher);

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

  const animationKeyframes = keyframes`
    0% { transform: scale(1) rotate(0); border-radius: 20%; }
    25% { transform: scale(2) rotate(0); border-radius: 20%; }
    50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
    75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
    100% { transform: scale(1) rotate(0); border-radius: 20%; }
  `;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

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
            <Box w="575px" p={5} ml={4} mr={4} mb={3} borderWidth="1px" rounded="lg" >
                <Stat>
                  <StatLabel>
                    <Text fontSize='xl'>Instructions</Text>
                  </StatLabel>
                  <Text fontSize={'md'}>This app uses the GitHub API to search for issues within certain organisations and repositories.</Text>
                  <br/>
                  <Text fontSize={'md'}>Please enter the organisation and repository you are searching for.</Text>
                  <Text fontSize={'md'}>Click on each row to expand the issue.</Text>
                  <br/>
                  <Text fontSize={'sm'}>Default Values<br/></Text>
                  <Text fontSize={'sm'} as='samp'>Organisation: vercel<br/></Text>
                  <Text fontSize={'sm'} as='samp'>Repository: next.js<br/></Text>
                  <Text fontSize={'sm'} as='samp'>Sorting: creation date descending</Text>
                </Stat>
            </Box>
            <Box w="400px" p={5} ml={2} mr={4} mb={3} borderWidth="1px" rounded="lg" >
              <form>
                <FormControl>
                  <FormLabel>Organisation</FormLabel>
                  <Input type="text" placeholder="vercel" onBlur={event => setOrganisation(event.currentTarget.value)}/>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Repository</FormLabel>
                  <Input type="text" placeholder="next.js" onBlur={event => setRepo(event.currentTarget.value)}/>
                </FormControl>
                <Button width="full" mt={4} onClick={() => {setQueryParams(`${organisation}/${repo}`);}}>
                  Submit
                </Button>
                {data?.pages[0].message == 'Not Found' ? <Text mt={4} color='tomato'>Please enter a valid organisation and repository</Text> : <Text mt={4}></Text>}
                
              </form>
            </Box>
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
            <Box w="575px" p={5} ml={4} mr={4} mb={3} borderWidth="1px" rounded="lg" >
                <Stat>
                  <StatLabel>
                    <Text fontSize='xl'>Oops!</Text>
                  </StatLabel>
                  <Text>It seems that you have exceeded the maximum number of API calls. Please try again later.</Text>
                </Stat>
            </Box>
          </Flex>
          <Container h="20vh" display="flex" alignItems="center" justifyContent="center">
            <Box
              as={motion.div}
              animation={animation}
              padding="2"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width="12"
              height="12"
              display="flex"
            />
          </Container>
        </Box>
      </>
    );
  }
}