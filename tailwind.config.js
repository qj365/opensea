/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [require('daisyui')],
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
