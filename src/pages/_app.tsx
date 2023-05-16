import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ApplicationContext } from '../context/ApplicationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import SEO from '@/data/seoOptions';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { useHydrateAtoms } from 'jotai/react/utils'; // for SSR support
import { PropsWithChildren, useState } from 'react';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
	DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // is not part of the build bundle, purely for Dev purposes

const queryClientOptions = {
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
};

export default function MyApp({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(() => new QueryClient(queryClientOptions));
	const HydrateAtoms = ({ children }: PropsWithChildren<{}>) => {
		useHydrateAtoms([[queryClientAtom, queryClient]]);
		return <>{children}</>;
	};
	return (
		<>
			<AuthProvider>
				<ApplicationContext>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<ReactQueryDevtools />
							<Provider>
								<HydrateAtoms>
									<Header />
									<DefaultSeo {...SEO} />
									<Component {...pageProps} />
									<Footer />
								</HydrateAtoms>
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
			</AuthProvider>
		</>
	);
}
