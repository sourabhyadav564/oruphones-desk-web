import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { ApplicationContext } from '@/context/ApplicationContext';
import 'react-toastify/dist/ReactToastify.css';
import {
	DehydratedState,
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // is not part of the build bundle, purely for Dev purposes
import { useEffect, useState } from 'react';
import SEO from '@/data/seoOptions';
import userAtom from '@/store/user';
import isLoggedIn from '@/utils/fetchers/user/isLoggedIn';
import { Provider, useSetAtom } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { RESET } from 'jotai/utils';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

const queryClientOptions = {
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		},
	},
};

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(() => new QueryClient(queryClientOptions));
	const userSetter = useSetAtom(userAtom);
	useEffect(() => {
		// Check if local user is valid
		const loggedInCheck = async () => {
			const result = await isLoggedIn();
			if (!result.isLoggedIn) {
				userSetter(RESET); // resets to null, as null is initial value
			}
		};
		loggedInCheck();
	}, [userSetter]);
	return (
		<>
			<ApplicationContext>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<ReactQueryDevtools position="bottom-right" />
						<Provider>
							<DevTools theme="dark" />
							<Header />
							<DefaultSeo {...SEO} />
							<Component {...pageProps} />
							<Footer />
						</Provider>
					</Hydrate>
				</QueryClientProvider>
			</ApplicationContext>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}
