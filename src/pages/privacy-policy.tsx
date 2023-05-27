import htmlString from '@/public/assets/html/new_privacy_policy';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';

function PrivacyPolicy() {
	return (
		<>
			<Head>
				<title>{metaTags.PRIVACY.title}</title>
				<meta name="description" content={metaTags.PRIVACY.description} />
				<meta property="og:title" content={metaTags.PRIVACY.title} />
				<meta
					property="og:description"
					content={metaTags.PRIVACY.description}
				/>
			</Head>
			<main className="container my-8 text-center">
				<section className="p-6 mt-12 mb-6 text-black-20 text-center">
					<h1 className="font-bold text-2xl uppercase">
						Mobilicis India Private Limited
					</h1>
					<p>Privacy Policy of www.oruphones.com</p>
				</section>
				<div dangerouslySetInnerHTML={{ __html: htmlString }} />
			</main>
		</>
	);
}

export default PrivacyPolicy;
