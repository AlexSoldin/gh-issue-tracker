import { Box, Container, Text, Flex, keyframes, } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function ErrorScreen({text}: {text: string}) {
    const animationKeyframes = keyframes`
    0% { transform: scale(1) rotate(0); border-radius: 20%; }
    25% { transform: scale(2) rotate(0); border-radius: 20%; }
    50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
    75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
    100% { transform: scale(1) rotate(0); border-radius: 20%; }
  `;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

	return (
			<>
					<Box mt={5}>
					<br/>
					<Flex justify="center">
							<Box w="575px" p={5} ml={4} mr={4} mb={3} borderWidth="1px" rounded="lg" >  
							<Text fontSize='xl'>Oops!</Text>
							<Text>{text}</Text>
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