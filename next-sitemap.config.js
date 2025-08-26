/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://offstone.fr",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/slice-simulator"],
  additionalPaths: async (config) => {
    try {
      const { createClient } = require("./src/lib/prismicio");
      const client = createClient();
      const articles = await client.getAllByType("article");
      
      return articles.map((article) => ({
        loc: `/ressources/${article.uid}`,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: article.last_publication_date,
      }));
    } catch (error) {
      console.warn("Could not fetch articles for sitemap:", error);
      return [];
    }
  },
};
