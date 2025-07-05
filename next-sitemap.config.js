/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");

const SITE_URL = process.env.SITE_URL || "https://www.sparepartsbharat.com";

// Fetch all products
async function getAllProducts() {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
    const res = await axios.get(endpoint);
    return res.data.products || [];
  } catch (error) {
    console.error("❌ Failed to fetch all products:", error.message);
    return [];
  }
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin/**"],

  transform: async (config, path) => ({
    loc: `${SITE_URL}${path}`,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),

  additionalPaths: async () => {
    const paths = [];

    const allProducts = await getAllProducts();

    for (const product of allProducts) {
      paths.push({
        loc: `${SITE_URL}/${product.slug}`,
        lastmod: product.updatedAt || new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    return paths;
  },
};
