import { Navigation } from '~components';
import { Center, Container, Text, Title, Image, Flex } from '@mantine/core';

export default function LoginPage() {
	return (
		<>
			<Container p={'xl'} w={'30%'} mt={'xl'}>
				<Flex direction={'column'} align={'center'}>
					<Title>Welcome.</Title>
					<Text ta={'center'}>Please log into Azimuth via Steam.</Text>
					<Image mt={'xl'} w={'50%'} src="images/flwn.png" alt="flwn" />
				</Flex>
			</Container>
		</>
	);
}
