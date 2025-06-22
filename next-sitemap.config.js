/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");

const SITE_URL = process.env.SITE_URL || "https://www.sparepartsbharat.com";

// Fetch all categories (flat list)
async function getCategories() {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}categories`;
    const response = await axios.get(endpoint);
    return response.data.categories || [];
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error.message);
    return [];
  }
}

// Fetch subcategories by parent slug
async function getSubcategories(parentSlug) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}categories/parent/${parentSlug}`
    );
    return response.data.categories || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // No subcategories found — skip logging
      return [];
    }
    console.error(
      `❌ Failed to fetch subcategories for ${parentSlug}:`,
      error.message
    );
    return [];
  }
}

// Fetch products under a category
async function getProductsBySlug(categorySlug) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/filter`,
      { categorySlugs: [categorySlug] }
    );
    return res.data.products || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // No products found — valid case, no log needed
      return [];
    }
    console.error(
      `❌ Failed to fetch products for category ${categorySlug}:`,
      error.message
    );
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

  additionalPaths: async (config) => {
    const paths = [];
    const allCategories = await getCategories();

    async function traverse(catSlug, basePath = "/category") {
      const categoryPath = `${basePath}/${catSlug}`;
      const categoryUrl = `${SITE_URL}${categoryPath}`;

      paths.push({
        loc: categoryUrl,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: new Date().toISOString(),
      });

      const products = await getProductsBySlug(catSlug);
      for (const product of products) {
        paths.push({
          loc: `${categoryUrl}/${product.slug}`,
          lastmod: product.updatedAt,
          changefreq: "weekly",
          priority: 0.8,
        });
      }

      const subcategories = await getSubcategories(catSlug);
      for (const sub of subcategories) {
        await traverse(sub.slug, categoryPath);
      }
    }

    for (const cat of allCategories) {
      if (!cat.parent) {
        await traverse(cat.slug);
      }
    }

    return paths;
  },
};
