import {
	Flex,
	Grid,
	Title,
	Text,
	ScrollArea,
	Container,
	Card,
	Badge,
} from '@mantine/core';
import { IconSkull } from '@tabler/icons-react';
import moment from 'moment';

export function FenceDisplay({ posts }: any) {
	if (posts === undefined || posts.length === 0) {
		return (
			<Flex
				w={'100%'}
				h={'100%'}
				align={'center'}
				justify={'center'}
				gap={'lg'}
			>
				<Flex align={'center'} direction={'column'}>
					<Flex align={'center'}>
						<IconSkull size={'8rem'} />

						<Title>Looks like there isn&apos;t anything on this fence.</Title>
					</Flex>
					<Text>Or you manually entered something after /fence...</Text>
				</Flex>
			</Flex>
		);
	}

	return (
		<Container fluid p={'xl'}>
			<ScrollArea h={'70vh'} scrollbars="y">
				<Grid justify="flex-start">
					{posts.map((post: any) => (
						<Grid.Col span={3} key={post._id} miw={'25rem'}>
							<Card shadow="sm" padding="lg" radius="sm" withBorder>
								<Flex
									direction={'column'}
									pos={'absolute'}
									top={'0.75rem'}
									right={'0.75rem'}
								>
									<Badge color="pink">
										{moment(parseInt(post.timestamp)).fromNow()}
									</Badge>
								</Flex>
								<Flex justify="space-between" align={'start'} gap={'6rem'}>
									<Text fw={600} size="xl">
										{post.name}
									</Text>
								</Flex>
								<Text>{post.description}</Text>
							</Card>
						</Grid.Col>
					))}
				</Grid>
			</ScrollArea>
		</Container>
	);
}
