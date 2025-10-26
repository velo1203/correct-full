import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/api-docs/"],
        },
        sitemap: "https://correct.app/sitemap.xml",
    };
}

