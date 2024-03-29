module.exports = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media',
	theme: {
		fontFamily: {
			'Roboto-Bold': ['Roboto-Bold', 'sans-serif'],
			'Roboto-Semibold': ['Roboto-Semibold', 'sans-serif'],
			'Roboto-Light': ['Roboto-Light', 'sans-serif'],
			'Roboto-Regular': ['Roboto-Regular', 'sans-serif'],
			'Roboto-Regularitalic': ['Roboto-Regularitalic', 'sans-serif'],
			'Roboto-Medium': ['Roboto-Medium', 'sans-serif'],
		},
		extend: {
			fontSize: {
				xl6FontSize: '40px',
				xl5FontSize: '30px',
				xl4FontSize: '25px',
				xl3FontSize: '24px',
				xl2FontSize: '20px',
				xlFontSize: '18px',
				regularFontSize: '16px',
				mediumFontSize: '14px',
				smallFontSize: '12px',
				xs2FontSize: '10px',
				xsFontSize: '8px',
			},
			colors: {
				red: {
					DEFAULT: '#FF0000',
				},
				'm-green': '#2c2f44',
				'm-green-1': '#2C2F45',
				'm-black': '#212121',
				'm-grey': '#F9F9F9',
				'm-white': '#FFFFFF',
				'm-white-1': '#F2F2F2',
				'm-yellow': '#F7941D',
				'm-yellow-1': '#F9C414',
				'm-grey-1': '#4E4E4E',
				'm-grey-2': '#707070',
				'm-grey-3': '#0000000A',
				'm-grey-4': '#00000008',
				'm-grey-5': '#EAEAEA',
				'm-grey-6': '#00000029',
				'm-grey-7': '#727272',
				'm-grey-8': '#F3F3F3',
				'm-green-dark': '#00634F',
				'gray-nurse': '#e7ece7',
				'gray-1': '#CCCCCC',
				'gray-2': '#7E7E7E',
				steps: '#e0e6e1',
				'black-1': '#000000',
				'black-20': '#202020',
				'black-60': '#606060',
				'green-1': '#007B63',
				'yellow-1': '#FBB215',
				'gray-1f': '#0000001F',
				'gray-ef': '#EFEFEF',
				'm-blue': '#0006A5',
				'm-blue-1': '#000944',
				yellow2: '#F9C414',
				green2: '#4CAF50',
				grey2: '#878787',
			},
			backgroundImage: {
				'sell-step':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/bg_buy_step.png')",
				'buy-step':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/bg_sell_step.png')",
				'arrow-left':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/arrow-left.svg')",
				banner:
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/bg_mask_1.svg')",
				'download-app':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/download_app.png')",
				'app-download':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/app_download.png')",
				'app-store':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/app_store.svg')",
				'play-store':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/play_store.png')",
				'bg-mask-1':
					"url('https://d1tl44nezj10jx.cloudfront.net/assets/bg_mask_1.svg')",
			},
			spacing: {
				'4rem': '4px, 4px, 4px,4px',
			},
			fontFamily: {
				'open-sans': '"Open Sans", Helvetica, Arial, sans-serif',
			},
			transformOrigin: {
				0: '0%',
			},
			zIndex: {
				'-1': '-1',
			},
			display: ['group-hover', 'group-focus'],
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				lg: '1024px',
				xl: '1200px',
				'2xl': '1200px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
