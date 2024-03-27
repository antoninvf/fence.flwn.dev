import { Navigation } from '~components';
import { Center, Container, Text, Title, Image, Flex } from '@mantine/core';

export default function HomePage() {
	return (
		<>
			<Navigation />
			<Container p={'xl'} w={'30%'} mt={'xl'}>
				<Flex direction={'column'} align={'center'}>
					<Title>Welcome.</Title>
					<Text ta={'center'}>
						This is my silly little website, where I put things that I want to
						do but I currently don&apos;t have time for them, or want to do them
						later.
						<br />
						<br />
						It is also a place where I put my ideas etc.
					</Text>
					<Image mt={'xl'} w={'50%'} src="images/flwn.png" alt="flwn" />
				</Flex>
			</Container>
		</>
	);
}
