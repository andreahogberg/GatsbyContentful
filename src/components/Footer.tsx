import React from "react";
import { Helmet } from "react-helmet";

const Footer = () => (
  <footer className="bg-zink-800 text-white p-4 mt-4 text-center">
    {/* Helmet används för att lägga till metadata till dokumentets head */}
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Detta är min Footer som inkluderar länkar till Contentful och Gatsby"
      />
      <meta name="keywords" content="Footer, länkar till Contentful, Gatsby" />
      <meta name="author" content="Andrea Hogberg" />
      <link rel="canonical" href="https://andreahogberg.se/" />
    </Helmet>

    {/* Container för att centrera innehållet inuti footern */}
    <div className="container mx-auto">
      <p>
        Byggd med{" "}
        <a
          href="https://www.contentful.com/"
          className="text-red-200 font-bold hover:text-red-400 transition duration-300"
        >
          Contentful
        </a>{" "}
        och{" "}
        <a
          href="https://www.gatsbyjs.com"
          className="text-red-200 font-bold hover:text-red-400 transition duration-300"
        >
          Gatsby
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
