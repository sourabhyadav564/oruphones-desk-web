import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';
import '../styles/react-slick/react-slick.css';
import { AuthProvider } from '@/context/AuthContext';
import { ApplicationContext } from '../context/ApplicationContext';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import SEO from '@/data/seoOptions';
import { DefaultSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	if (router.pathname != '/i/[someId]') {
		return (
			<>
				<AuthProvider>
					<ApplicationContext>
						<RecoilRoot>
							<Header />
							<DefaultSeo {...SEO} />
							<Component {...pageProps} />
							<Footer />
						</RecoilRoot>
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
	} else {
		return (
			<>
				<AuthProvider>
					<ApplicationContext>
						<Component {...pageProps} />
					</ApplicationContext>
				</AuthProvider>
			</>
		);
	}
}
