import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Pretendard",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "system-ui",
                    "sans-serif",
                ],
            },
            colors: {
                primary: "#156BFF",
                secondary: "#4C3C3F",
                dark: "#1F1F1F",
                gray: {
                    DEFAULT: "#6A6A83",
                    light: "#A8BFC2",
                    lighter: "#F2F2F2",
                },
                blue: {
                    light: "#E8F0FE",
                    lighter: "#F0F5FF",
                },
                background: "#F2F3F7",
                border: {
                    DEFAULT: "#E5E7EB",
                    light: "#F3F4F6",
                },
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.4s ease-out",
                "slide-down": "slideDown 0.4s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
