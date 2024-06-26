import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Head from 'next/head';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '~api';

export default function App({ Component, pageProps }: any) {
	return (
		<>
			<QueryClientProvider>
				<ColorSchemeScript defaultColorScheme="dark" />
				<MantineProvider theme={theme} defaultColorScheme="dark">
					<Notifications autoClose={4000} />
					<Head>
						<title>flwn.dev | It&apos;s on the fence</title>
						<meta
							name="viewport"
							content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
						/>
						<link rel="shortcut icon" href="/favicon.svg" />
					</Head>
					<Component {...pageProps} />
				</MantineProvider>
			</QueryClientProvider>
		</>
	);
}
