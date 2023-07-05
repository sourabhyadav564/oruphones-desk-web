import htmlString from '@/public/assets/html/new_privacy_policy';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';

function PrivacyPolicy() {
	return (
		<>
			<Head>
				<title>
					{
						'Safeguarding Your Information: Privacy Policy for Affordable Used Mobiles l Oruphones'
					}
				</title>
				<meta
					name="description"
					content={
						'Our privacy policy ensures the protection of your data when purchasing affordable used mobiles. Learn how we prioritize your privacy at Oruphones'
					}
				/>
				<meta property="og:title" content={'Privacy Policy | ORUphones'} />
				<meta
					property="og:description"
					content={
						'ORUphones observes strict privacy policies across all its pages. When you enter your personal details on ORUphones, you acknowledge the privacy policies. We offer 100% privacy.'
					}
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
