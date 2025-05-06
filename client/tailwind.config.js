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
                    DEFAULT: '#1E3A8A', // Azul oscuro
                    light: '#3B82F6',  // Azul claro
                    dark: '#1E40AF'   // Azul más oscuro
                },
                secondary: {
                    DEFAULT: '#2563EB', // Azul intermedio
                    light: '#60A5FA',   // Azul más claro
                    dark: '#1D4ED8'     // Azul intenso
                },
                background: {
                    light: '#F3F4F6',   // Gris claro
                    dark: '#1E293B'     // Gris oscuro
                }
            }
        },
    },
    plugins: [],
}