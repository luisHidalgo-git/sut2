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
                    DEFAULT: '#1E3A8A',
                    light: '#3B82F6',
                    dark: '#1E40AF'
                },
                secondary: {
                    DEFAULT: '#2563EB',
                    light: '#60A5FA',
                    dark: '#1D4ED8'
                },
                background: {
                    light: '#F3F4F6',
                    dark: '#1E293B'
                }
            }
        },
    },
    plugins: [],
}