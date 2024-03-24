import { Flex } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FenceDisplay, Navigation } from '~components';

export default function FenceCollection() {
	const router = useRouter();
	const { collection } = router.query;

	// query the collection
	const { data: posts } = useQuery({
		queryKey: ['getCollection', collection],
		queryFn: async () => {
			const res = await fetch(`/api/getCollection?collection=${collection}`);
			return res.json();
		},
	});

	return (
		<>
			<Flex direction={'column'} h={'100vh'}>
				<Navigation />
				<FenceDisplay posts={posts} />
			</Flex>
		</>
	);
}
