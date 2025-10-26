import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "CORRECT - 자세 교정 스마트 의자",
        short_name: "CORRECT",
        description: "최고의 자세를 반듯다",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#156BFF",
        icons: [
            {
                src: "/icon-192.svg",
                sizes: "192x192",
                type: "image/svg+xml",
            },
            {
                src: "/icon-512.svg",
                sizes: "512x512",
                type: "image/svg+xml",
            },
        ],
        orientation: "portrait",
        categories: ["health", "lifestyle"],
        lang: "ko-KR",
    };
}
