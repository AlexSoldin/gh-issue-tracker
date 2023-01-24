import Head from 'next/head'
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Heading, StatLabel, StatNumber, Flex, Input, Stat, Text, Button, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, } from '@chakra-ui/react';
import useSWR from 'swr';

type Issue = {
  id: number;
  url: string;
  title: string;
  description: string;
  created_at: string;
}

type Data = {
  issues: Array<Issue>;
}

function cleanText(value: string) {
  if (value.length > 30){
    return value.substring(0, 30) + '...';
  } else {
    return value;
  }
}

export default function Home() {
  const [organisation, setOrganisation] = useState('vercel');
  const [repo, setRepo] = useState('next.js');
  const [queryParams, setQueryParams] = useState('?org=vercel&repo=next.js');

  const fetcher = (url: string, queryParams: string = '') => fetch(`${url}${queryParams}`).then((r) => r.json());
  const { data, error } = useSWR<Data, Error>([`api/github${queryParams}`], fetcher);
  // const { data, error } = useSWRInfinite<Data, Error>((index: number) => `https://api.github.com/repos/${organisation}/${repo}/issues?per_page=${6}&page=${
  //   index + 1
  // }`, fetcher);

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
          <Box w="400px" p={5} ml={2} mr={4} mb={3} borderWidth="1px" rounded="lg" >
            <form>
            {/* <form> */}
              <FormControl >
                <FormLabel>Organisation</FormLabel>
                <Input type="text" placeholder="vercel" onBlur={event => setOrganisation(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={2} >
                <FormLabel>Repository</FormLabel>
                <Input type="text" placeholder="next.js" onBlur={event => setRepo(event.currentTarget.value)}/>
              </FormControl>
              <Button width="full" mt={4} onClick={() => {setQueryParams(`?org=${organisation}&repo=${repo}`);}}>
                Submit
              </Button>
            </form>
          </Box>
          <Box w="400px" p={5} ml={4} mr={4} mb={3} borderWidth="1px" rounded="lg" >
            <Stat>
              <StatLabel>
                <Text fontSize='xl'>Repository Issues</Text>
              </StatLabel>
              <StatNumber>
                { data ? data['issues'].length : "Loading"}
              </StatNumber>
            </Stat>
          </Box>
        </Flex>
        <Flex justify="center">
          { data ? 
          <TableContainer w="1000px" borderWidth="1px" rounded="lg">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Title</Th>
                  <Th>Created at</Th>
                  <Th>URL</Th>
                </Tr>
              </Thead>
              <Tbody>
                  {data['issues'].map((item: Issue) => (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>{cleanText(item.title)}</Td>
                      <Td>{item.created_at}</Td>
                      <Td><a href={item.url}>View</a></Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer> : <h1>Loading...</h1> }
        </Flex>
      </Box>
    </>
  )
}