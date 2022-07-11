/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				'darkblue-1': '#010a42',
				'darkblue-2': '#1c255b',
				'darkblue-3': '#262e69',
				'muted-darkblue': '#252f6e',
				yellow: '#ffb12a',
				red: '#ff2e62',
				green: '#01cb87',
				beige: '#ffeac6',
				pink: '#ffc1c2',
				purple: '#6259ff',
				lightgrey: '#f7f7f7',
				grey: '#bbb',
				darkgrey: '#333',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		plugin(function ({ addComponents }) {
			addComponents({
				'.btn-delete': {
					cursor: 'pointer',
					backgroundColor: '#6259ff',
					boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
					color: '#f7f7f7',
					border: '0',
					borderRadius: '0.5rem',
					display: 'block',
					fontSize: '16px',
					margin: '10px 0 30px',
					padding: '10px',
					width: '100%',
				},
			});
		}),
	],
};
