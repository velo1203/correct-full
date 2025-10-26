import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "CORRECT - 최고의 자세를 반듯다",
    description: "자세 교정 스마트 의자",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
                />
            </head>
            <body className="antialiased font-sans">
                <div className="flex justify-center items-center min-h-screen bg-gray-200">
                    <div className="w-full max-w-[393px] h-screen bg-white relative overflow-hidden">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
