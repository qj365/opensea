/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')],
    theme: {
        extend: {
            keyframes: {
                fadein: {
                    '0%': { opacity: 0, visibility: 'hidden' },
                    '100%': { opacity: 1, visibility: 'visible' },
                },
            },
            animation: {
                fadein: 'fadein 0.3s ease-in-out',
            },
        },
    },
};
