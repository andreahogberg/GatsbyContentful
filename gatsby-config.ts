import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Andrea Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
    author: "Andrea Hogberg",
    menuLinks: [
      {
        name: "Hem",
        link: "/",
      },
      {
        name: "Mina projekt",
        link: "/projekt",
      },
      {
        name: "Om Mig",
        link: "/om-mig",
      },
      {
        name: "Kontakt",
        link: "/kontakt",
      },
    ],
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "qtNQ5NW3cl1_5CNWaImTFLdw7QbE7fSY4clHd0zDy7w",
        spaceId: "dca0phehwnnr",
        forceFullSync: true,
      },
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
  ],
};

export default config;
