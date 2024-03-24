import { Navigation } from '~components';
import {
	Card,
	Center,
	Container,
	Flex,
	Tabs,
	Title,
	Text,
	Button,
	PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';

export default function Delete() {
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const { invalidateQueries } = useQueryClient();

	const form = useForm({
		initialValues: {
			secretKey: '',
		},
	});

	const mutation = useMutation({
		onSuccess: () => {
			showNotification({
				title: 'Success',
				message: 'Document deleted',
				color: 'teal',
			});
		},
		mutationFn: async (values: any) => {
			const res = await fetch(
				`/api/deleteCollectionDocument?collection=${values.collection}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: values.secretKey,
						id: values.id,
					},
				},
			);
			return res.json();
		},
	});

	const mutationDelCollection = useMutation({
		onSuccess: () => {
			showNotification({
				title: 'Success',
				message: 'Collection deleted',
				color: 'teal',
			});
		},
		mutationFn: async (values: any) => {
			const res = await fetch(
				`/api/deleteCollection?collection=${values.name}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: values.secretKey,
					},
				},
			);
			return res.json();
		},
	});

	const { data: collections } = useQuery({
		queryKey: ['getCollections'],
		queryFn: async () => {
			const res = await fetch(`/api/getCollections`);
			return res.json();
		},
	});

	const { data: posts } = useQuery({
		queryKey: ['getCollection', activeTab],
		queryFn: async () => {
			const res = await fetch(`/api/getCollection?collection=${activeTab}`);
			return res.json();
		},
	});

	return (
		<>
			<Navigation />
			<Container p={'xl'} fluid>
				<Center>
					<Title>delete items from fence</Title>
				</Center>
				<Flex gap={'sm'}>
					<Link href="/add">add</Link>
					<Link href="/delete">delete</Link>
				</Flex>
				<PasswordInput
					w={'25%'}
					label="SECRET KEY"
					{...form.getInputProps('secretKey')}
				/>
				<Tabs value={activeTab} onChange={setActiveTab}>
					<Tabs.List>
						{collections?.map((collection: any) => {
							return (
								<Tabs.Tab key={collection._id} value={collection.name}>
									{collection.name}
								</Tabs.Tab>
							);
						})}
					</Tabs.List>

					{collections?.map((collection: any) => {
						return (
							<Tabs.Panel key={collection._id} value={collection.name}>
								<Button
									mt={'sm'}
									onClick={() =>
										mutationDelCollection.mutate({
											name: collection.name,
											secretKey: form.values.secretKey,
										})
									}
								>
									drop fence
								</Button>
								<Flex wrap={'wrap'} gap={'sm'} mt={'sm'}>
									{posts?.map((post: any) => {
										return (
											<Card key={post._id}>
												<Flex justify={'space-between'} gap={'sm'}>
													<Title order={3}>{post.name}</Title>
													<Flex gap={'sm'}>
														<Button
															onClick={() => {
																mutation.mutate({
																	collection: activeTab,
																	id: post._id,
																	secretKey: form.values.secretKey,
																});
															}}
														>
															delete
														</Button>
													</Flex>
												</Flex>
												<Text>{post.description}</Text>
											</Card>
										);
									})}
								</Flex>
							</Tabs.Panel>
						);
					})}
				</Tabs>
			</Container>
		</>
	);
}
