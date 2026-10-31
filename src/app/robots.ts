import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/profile-details",
        "/favorites",
        "/shop/checkout",
        "/login",
        "/verify",
        "/reset-password",
      ],
    },
    sitemap: "https://www.3dpartshop.com/sitemap.xml",
  };
}
