import { Box,  Text, } from '@chakra-ui/react';

export default function Information() {
    return (
        <Box w="575px" p={5} ml={4} mr={4} mb={3} borderWidth="1px" rounded="lg" >
            <Text fontSize='xl'>Instructions</Text>
            <Text fontSize={'md'}>This app uses the GitHub API to search for issues within certain organisations and repositories.</Text>
            <br/>
            <Text fontSize={'md'}>Please enter the organisation and repository you are searching for.</Text>
            <Text fontSize={'md'}>Click on each row to expand the issue.</Text>
            <br/>
            <Text fontSize={'sm'}>Default Values<br/></Text>
            <Text fontSize={'sm'} as='samp'>Organisation: vercel<br/></Text>
            <Text fontSize={'sm'} as='samp'>Repository: next.js<br/></Text>
            <Text fontSize={'sm'} as='samp'>Sorting: creation date descending</Text>
        </Box>
    )
}