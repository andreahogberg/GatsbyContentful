const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Kör GraphQL-fråga för att hämta data från Contentful
  const result = await graphql(`
    query {
      allContentfulProjekt {
        nodes {
          slug
        }
      }
    }
  `);

  // Skapar sidor baserat på hämtad data
  result.data.allContentfulProjekt.nodes.forEach((node) => {
    createPage({
      path: `/project-post/${node.slug}`,
      component: path.resolve(`./src/templates/project-post.tsx`),
      context: {
        slug: node.slug,
      },
    });
  });
};
