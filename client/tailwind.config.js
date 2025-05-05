/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2E7D32',
                    light: '#4CAF50',
                    dark: '#1B5E20'
                },
                secondary: {
                    DEFAULT: '#26A69A',
                    light: '#4DB6AC',
                    dark: '#00796B'
                },
                background: {
                    light: '#FFFFFF',
                    dark: '#121212'
                }
            }
        },
    },
    plugins: [],
}