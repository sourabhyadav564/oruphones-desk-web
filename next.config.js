/** @type {import('next').NextConfig} */
const backendURL = process.env.BACKEND_URL || 'http://localhost:5000';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict Transport Security',
		value: 'max-age=31536000; includeSubDomains; preload',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'Referrer-Policy',
		value: 'same-origin',
	},
];
module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'header',
						key: 'User-Agent',
						value:
							'/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/',
					},
				],
				destination: 'https://mobile.oruphones.com/:path*',
				permanent: false,
			},
		];
	},
	images: {
		domains: [
			'zenrodevimages.s3-us-west-2.amazonaws.com',
			'zenrodeviceimages.s3.us-west-2.amazonaws.com',
			'www.mobiruindia.com',
			'www.oruphones.com',
			'mobiruecom.s3.us-west-2.amazonaws.com',
			'zenroecom.s3.us-west-2.amazonaws.com',
			'zenrodeviceimages.s3-us-west-2.amazonaws.com',
			'demo-bucket-c2c-001.s3.amazonaws.com',
			'd1tl44nezj10jx.cloudfront.net',
			'images.unsplash.com',
			'media.licdn.com',
		],
		minimumCacheTTL: 60,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: '/backend/:path*',
				destination: `${backendURL}/:path*`,
			},
		];
	},
	async headers() {
		return process.env.production
			? [
					{
						source: '/:path*',
						headers: securityHeaders,
					},
			  ]
			: [];
	},
	...(process.env.production
		? {
				compiler: {
					removeConsole: true,
				},
		  }
		: {}),
	swcMinify: true,
});
