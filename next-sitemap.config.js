/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://offstone.fr",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/slice-simulator"],
  additionalPaths: async () => {
    try {
      const { createClient } = require("./src/lib/prismicio");
      const client = createClient();

      // Articles
      const newArticles = await client.getAllByType("resource_article").catch(() => []);
      // Other types
      const caseStudies = await client.getAllByType("case_study").catch(() => []);
      const glossary = await client.getAllByType("glossary_term").catch(() => []);
      const webinars = await client.getAllByType("webinar").catch(() => []);
      const pressItems = await client.getAllByType("press_item").catch(() => []);
      const interviews = await client.getAllByType("interview_item").catch(() => []);
      // TEMPORAIREMENT MASQUÉ - QVEMA
      // const qvema = await client.getAllByType("qvema_episode").catch(() => []);

      const mapArticle = (article) => {
        const catUid = article?.data?.category;
        const loc = catUid ? `/ressources/${catUid}/${article.uid}` : `/ressources/${article.uid}`;
        return {
          loc,
          changefreq: "monthly",
          priority: 0.7,
          lastmod: article.last_publication_date,
        };
      };
      const articleEntries = [...newArticles.map(mapArticle)];

      const caseEntries = caseStudies.map((doc) => ({ loc: `/ressources/etudes-de-cas/${doc.uid}`, changefreq: "monthly", priority: 0.6, lastmod: doc.last_publication_date }));
      const glossaryEntries = glossary.map((doc) => ({ loc: `/ressources/glossaire/${doc.uid}`, changefreq: "monthly", priority: 0.5, lastmod: doc.last_publication_date }));
      const webinarEntries = webinars.map((doc) => ({ loc: `/ressources/webinars-videos/${doc.uid}`, changefreq: "monthly", priority: 0.5, lastmod: doc.last_publication_date }));
      const pressEntries = pressItems.map((doc) => ({ loc: `/ressources/jonathan-anguelov/presse/${doc.uid}`, changefreq: "monthly", priority: 0.4, lastmod: doc.last_publication_date }));
      const interviewEntries = interviews.map((doc) => ({ loc: `/ressources/jonathan-anguelov/interviews-podcasts/${doc.uid}`, changefreq: "monthly", priority: 0.4, lastmod: doc.last_publication_date }));
      const staticEntries = [
        { loc: "/ressources/guides", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/strategie-theses", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/fiscalite-immobiliere", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/structuration-reglementation", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/asset-management-marche", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/jonathan-anguelov", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/strategie-theses", changefreq: "weekly", priority: 0.7 },
        { loc: "/ressources/strategie-theses/residentiel", changefreq: "weekly", priority: 0.6 },
        { loc: "/ressources/strategie-theses/bureaux", changefreq: "weekly", priority: 0.6 },
        { loc: "/ressources/strategie-theses/hotellerie", changefreq: "weekly", priority: 0.6 },
        { loc: "/ressources/strategie-theses/logistique", changefreq: "weekly", priority: 0.6 },
      ];

      return [
        ...staticEntries,
        ...articleEntries,
        ...caseEntries,
        ...glossaryEntries,
        ...webinarEntries,
        ...pressEntries,
        ...interviewEntries,
        // TEMPORAIREMENT MASQUÉ - QVEMA
        // ...qvema.map((doc) => ({ loc: `/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/${doc.uid}`, changefreq: "weekly", priority: 0.6, lastmod: doc.last_publication_date })),
      ];
    } catch (error) {
      console.warn("Could not fetch resources for sitemap:", error);
      return [];
    }
  },
};
