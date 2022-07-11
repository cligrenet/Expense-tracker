/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
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
					borderRadius: '0.25rem',
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
