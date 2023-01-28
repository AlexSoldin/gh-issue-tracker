import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, 
Text, Button, Progress, } from '@chakra-ui/react';
import InfiniteScroll from "react-infinite-scroll-component";

function reduceText(value: string) {
  if (value.length > 40){
    return value.substring(0, 40) + '...';
  } else {
    return value;
  }
}

export default function DataDisplay({data, fetchNextPage, hasNextPage}: {data:any, fetchNextPage:any, hasNextPage:any}) {
	return (
    <InfiniteScroll
			dataLength={data?.pages.length * 20}
			next={fetchNextPage}
			hasMore={!!hasNextPage}
			loader={<Progress mt={2} mb={2} size='md' isIndeterminate />}
		>
			<Accordion allowToggle w="1000px" borderWidth="1px" rounded="lg">
			{
				data.pages.map((page: any) => (
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
	)
}