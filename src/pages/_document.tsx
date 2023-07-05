import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-HQ02Q1Z1MK"
				></script>

				<script
					dangerouslySetInnerHTML={{
						__html: `

              window.dataLayer = window.dataLayer || [];

              function gtag(){dataLayer.push(arguments);}

              gtag('js', new Date());




              gtag('config', 'G-HQ02Q1Z1MK');

            `,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
