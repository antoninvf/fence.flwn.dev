import { Navigation } from '~components';
import {
	Autocomplete,
	Button,
	Center,
	Container,
	Flex,
	PasswordInput,
	Select,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { IconCat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';
import moment from 'moment';

export default function Add() {
	const { invalidateQueries } = useQueryClient();

	const form = useForm({
		initialValues: {
			collection: '',
			name: '',
			description: '',
			secretKey: '',
		},
		validate: (values) => ({
			collection: !values.collection ? 'Collection is required' : null,
			name: !values.name ? 'Name is required' : null,
			secretKey: !values.secretKey ? 'Secret key is required' : null,
		}),
	});

	const mutation = useMutation({
		onSuccess: () => {
			showNotification({
				title: 'Success',
				message: 'Fence item added',
				color: 'teal',
			});
			form.setFieldValue('collection', '');
			form.setFieldValue('name', '');
			form.setFieldValue('description', '');
		},
		mutationFn: async (values: any) => {
			const res = await fetch(
				`/api/postCollection?collection=${values.collection}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: values.secretKey,
					},
					body: JSON.stringify({
						name: values.name,
						description: values.description,
						timestamp: moment().format('x'),
					}),
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

	return (
		<>
			<Navigation />
			<Container p={'xl'}>
				<Center>
					<Title>add to the fence</Title>
				</Center>
				<Flex gap={'sm'}>
					<Link href="/add">add</Link>
					<Link href="/delete">delete</Link>
				</Flex>
				<form
					onSubmit={form.onSubmit(() => mutation.mutate({ ...form.values }))}
				>
					<Flex align={'center'} direction={'column'}>
						<Autocomplete
							w={'50%'}
							label="Collection"
							placeholder="Select collection or create a new one"
							data={collections?.map((post: any) => {
								return { value: post.name, label: post.name };
							})}
							{...form.getInputProps('collection')}
						/>
						<TextInput w={'50%'} label="Name" {...form.getInputProps('name')} />
						<TextInput
							w={'50%'}
							label="Description"
							{...form.getInputProps('description')}
						/>
						<PasswordInput
							w={'50%'}
							label="SECRET KEY"
							{...form.getInputProps('secretKey')}
						/>
					</Flex>
					<Center mt={'lg'}>
						<Button type="submit" leftSection={<IconCat />} size="xl">
							ADD TO THE FENCE
						</Button>
					</Center>
				</form>
				<Text>current fences:</Text>
				<Flex direction={'column'}>
					<ul>
						{collections?.map((post: any) => (
							<li key={post._id}>
								<Text>{post.name}</Text>
							</li>
						))}
					</ul>
				</Flex>
			</Container>
		</>
	);
}
