import {
	Text,
	Container,
	Image,
	Flex,
	Button,
	Center,
	Tooltip,
	Kbd,
} from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '~components';

export default function About() {
	const [hidden, setHidden] = useState(true);

	return (
		<>
			<Navigation />
			<Container p={'xl'}>
				<Text>
					HI, this is my website for putting things on the fence. It&apos;s a
					funny little joke between me and my friends, where I&apos;m on the
					fence about doing something, like playing a game, watching a movie
					etc.
				</Text>

				<Text mt={'sm'}>
					This whole website is made using{' '}
					<a href="https://mantine.dev" target="_blank">
						Mantine
					</a>
					,{' '}
					<a href="https://nextjs.org" target="_blank">
						Next.js
					</a>{' '}
					and{' '}
					<a href="https://mongodb.com" target="_blank">
						MongoDB
					</a>{' '}
					and is hosted on my homeserver called ZEPHYR.
					<br />
					It&apos;s the first time I used MongoDB and I gotta say it&apos;s nice
					to just throw shit in a bucket and have it just work.
				</Text>

				<Text mt={'sm'}>
					I also wanted to challenge myself by not going the usual route with
					having an ASP.NET backend, because this is such a simple application
					it doesn&apos;t need an ASP.NET backend. And I&apos;m glad I did,
					because it&apos;s nice having everything in Next.js
				</Text>

				<Text mt={'sm'}>
					You can find the source code for this website on my{' '}
					<a href="https://github.com/antoninvf/fence.flwn.dev" target="_blank">
						GitHub
					</a>{' '}
					(i did kind of rush this, so there&apos;s a lot of bad code)
				</Text>

				<Text mt={'sm'}>
					Btw{' '}
					<a href="/images/onthefence.png" target="_blank">
						here
					</a>{' '}
					is the actual original image that this website is based on 😭
				</Text>

				<Text mt={'sm'}>
					If you think this website is stupid, you can press{' '}
					<Tooltip
						label="yes chat i wrote that only for the cool keyboard thingies"
						withArrow
					>
						<span>
							<Kbd>Alt</Kbd> + <Kbd>F4</Kbd>
						</span>
					</Tooltip>
				</Text>

				<Center mt={'xl'} mb={'xl'}>
					<Button
						leftSection={<IconStar />}
						size="xl"
						onClick={() => setHidden(!hidden)}
					>
						press for secret
					</Button>
				</Center>

				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: hidden ? 0 : 1 }}
					transition={{ duration: 1, type: 'spring', stiffness: 260 }}
				>
					<Flex justify={'center'} gap={'sm'} h={'20rem'}>
						<Tooltip label="look at this silly mf" position="top" withArrow>
							<Image
								w={'auto'}
								radius={'sm'}
								src="/images/ajay.png"
								alt="ajay"
							/>
						</Tooltip>
						<Tooltip label="silly ass" position="top" withArrow>
							<Image
								w={'auto'}
								radius={'sm'}
								src="/images/adam.png"
								alt="adam"
							/>
						</Tooltip>
					</Flex>
				</motion.div>
			</Container>
		</>
	);
}
