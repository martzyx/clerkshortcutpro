/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Plain", "Arial", "Helvetica", "sans-serif"],
            },
            colors: {
                darkMode: "#242424",
            },
        },
    },
    plugins: [],
};
