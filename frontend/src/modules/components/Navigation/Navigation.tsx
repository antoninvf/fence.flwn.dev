import { Flex, Tabs, Title } from '@mantine/core';

import classes from './Navigation.module.css';
import { useRouter } from 'next/router';

// map of available websites
const tabs = [
	{ name: 'Home', path: '/' },
	{ name: 'Games', path: '/fence/games' },
	{ name: 'Movies & Shows', path: '/fence/movies' },
	{ name: 'Coding', path: '/fence/coding' },
	{ name: 'Other', path: '/fence/other' },
	{ name: 'About', path: '/about' },
];

export function Navigation() {
	const router = useRouter();

	const items = tabs.map((tab) => (
		<Tabs.Tab
			value={tab.path}
			key={tab.path}
			onClick={() => router.push(tab.path)}
		>
			{tab.name}
		</Tabs.Tab>
	));

	return (
		<>
			<div className={classes.header}>
				<Flex justify={'center'} mb={'sm'}>
					<Title>it&apos;s on the fence</Title>
				</Flex>
				<Flex justify={'center'}>
					<Tabs
						value={
							router.pathname === '/fence/[collection]'
								? `/fence/${router.query.collection}`
								: router.pathname
						}
					>
						<Tabs.List>{items}</Tabs.List>
					</Tabs>
				</Flex>
			</div>
		</>
	);
}
