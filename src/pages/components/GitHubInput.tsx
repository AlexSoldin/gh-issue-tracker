import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Text, Button, } from '@chakra-ui/react';

export default function GitHubInput({dataToChild, dataToParent}) {
  const [organisation, setOrganisation] = useState('vercel');
  const [repo, setRepo] = useState('next.js');

  return (
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
        <Button width="full" mt={4} onClick={() => {dataToParent(`${organisation}/${repo}`);}}>
          Submit
        </Button>
        {
        dataToChild?.pages[0].message == 'Not Found' ? 
        <Text mt={4} color='tomato'>Please enter a valid organisation and repository</Text> : 
        <Text mt={4}></Text>
        }
      </form>
    </Box>
  )
}