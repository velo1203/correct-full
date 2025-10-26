import type { Metadata, Viewport } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "CORRECT - 최고의 자세를 반듯다",
    description: "자세 교정 스마트 의자",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
                {/* 데스크톱: 중앙 정렬 + 최대 너비, 모바일: 전체 화면 */}
                <div className="min-h-screen bg-gray-200 md:flex md:justify-center md:items-center">
                    <div className="w-full md:max-w-[393px] min-h-screen bg-white relative overflow-hidden md:h-screen md:shadow-2xl">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
