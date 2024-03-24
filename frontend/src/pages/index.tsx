import { Navigation } from '~components';
import { Center, Container, Text, Title } from '@mantine/core';

export default function HomePage() {
	return (
		<>
			<Navigation />
			<Container p={'xl'}>
				<Center>
					<Title>Welcome.</Title>
				</Center>
			</Container>
		</>
	);
}
