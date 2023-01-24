import Head from 'next/head'
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Heading, StatLabel, StatNumber, Flex, Input, Stat, Text, Button, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from '@chakra-ui/react';
import useSwr from 'swr';

type Issue = {
  id: number;
  url: string;
  title: string;
  description: string;
  created_at: string;
}

type Data = {
  Issues: Array<Issue>;
}

async function fetcher(...arg: any) {
  const res = await fetch(...arg);
  return res.json();
}

export default function Home() {
  const [organisation, setOrganisation] = useState('vercel');
  const [repo, setRepo] = useState('next.js');
  // const [data, setData] = useState<Array<Issue>>([{
  //   id: 0,
  //   url: '',
  //   title: '',
  //   description: '',
  //   created_at: '',
  // }]);

  const handleSubmit = async () => {
    console.log(organisation);
    console.log(repo);
    const response = await fetch(`api/github/${organisation}/${repo}`);
    const responseData = await response.json();
    console.log(responseData);
    // setData(responseData);
  };

  // const fetcher = (...args: any) => fetch(...args).then(res => res.json())
  const { data, error } = useSwr(`api/github`, fetcher);
  console.log(data);

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
            <form onSubmit={handleSubmit}>
            {/* <form> */}
              <FormControl >
                <FormLabel>Organisation</FormLabel>
                <Input type="text" placeholder="vercel" onBlur={event => setOrganisation(event.currentTarget.value)}/>
              </FormControl>
              <FormControl mt={2} >
                <FormLabel>Repository</FormLabel>
                <Input type="text" placeholder="next.js" onBlur={event => setRepo(event.currentTarget.value)}/>
              </FormControl>
              <Button width="full" mt={4} type="submit">
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
                { data ? data.length : "Loading"}
              </StatNumber>
            </Stat>
          </Box>
        </Flex>
        <Flex justify="center">
          <TableContainer borderWidth="1px" rounded="lg">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Created at</Th>
                  <Th>URL</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  {/* {data.forEach((item: Issue) => {
                    return (
                      <Td key={item.url}>{ item.title }</Td>
                      
                    );
                  })} */}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  )
}