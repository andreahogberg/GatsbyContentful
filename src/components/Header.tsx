import React from "react";
import { Link, navigate, useStaticQuery, graphql } from "gatsby";
import Footer from "./Footer";
import Search from "./Search";
import { Helmet } from "react-helmet";

// Header-komponenten med logik för sökning och navigering
const Header: React.FC<{ pageTitle: string; children: React.ReactNode }> = ({
  pageTitle,
  children,
}) => {
  // Hämtar data med Gatsby's useStaticQuery-hook
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
          title
        }
      }
      allContentfulProjekt(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          title
          slug
        }
      }
      allContentfulContentType {
        nodes {
          name
          description
        }
      }
      contentfulKontakt(node_locale: { eq: "en-US" }) {
        id
      }
    }
  `);

  // Tillstånd för söktermen
  const [searchTerm, setSearchTerm] = React.useState("");

  // Lista över exkluderade innehållstyper från sökresultaten
  const excludedContentTypes = ["Header", "Category", "Hem"];

  // Hanterar sökning
  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    // Hämtar alla projekt, innehållstyper och kontaktinformation
    const allProjects = data.allContentfulProjekt.nodes;
    const allContentTypes = data.allContentfulContentType.nodes;
    const kontaktPage = data.contentfulKontakt;

    // Samlar alla sökbara objekt
    const allSearchableItems = [
      ...allProjects.map((project: { title: any; slug: any }) => ({
        title: project.title,
        slug: project.slug,
      })),
      ...allContentTypes.map(
        (contentType: { name: any; description: string }) => ({
          title: contentType.name,
          slug: contentType.description.toLowerCase(),
        })
      ),
      { title: kontaktPage.title, slug: kontaktPage.slug },
    ];

    const searchTermLower = term.toLowerCase();

    // Filtrerar sökresultaten baserat på söktermen
    const searchResults = allSearchableItems.filter((item) => {
      const lowerCaseTitle = item.title?.toLowerCase();
      const slugIncludesTerm = item.slug?.includes(searchTermLower);

      return (
        (lowerCaseTitle && lowerCaseTitle.includes(searchTermLower)) ||
        (slugIncludesTerm && slugIncludesTerm)
      );
    });

    console.log("Search Results:", searchResults);

    const allowedPages = ["projekt", "om-mig", "kontakt"];

    const allowedPagesLower = allowedPages.map((page) => page.toLowerCase());

    // Konverterar söktermen genom att ta bort "project-post/"
    const searchTermWithoutProjectPage = term
      .toLowerCase()
      .replace("project-post/", "");

    // Kontrollerar om söktermen representerar en tillåten sida
    const isPageAllowed = allowedPagesLower.some((page) =>
      searchTermWithoutProjectPage.includes(page)
    );

    let searchPath;

    if (isPageAllowed) {
      searchPath = `/${allowedPages.find((page) =>
        searchTermWithoutProjectPage.includes(page)
      )}/`;
    } else if (searchTermLower.startsWith("project-post/")) {
      const formattedTerm = searchTermWithoutProjectPage
        .split(" ")
        .map((word) => word.toLowerCase())
        .join("-");

      const encodedTerm = encodeURIComponent(
        formattedTerm.replace(/\s+/g, "-")
      );

      navigate(`/project-post/${encodedTerm}/`);
      return;
    } else if (searchTermWithoutProjectPage === "vue") {
      searchPath = "/project-post/Vue%20/%20Agil%20Utveckling/";
    } else if (searchTermWithoutProjectPage.includes("Vue")) {
      searchPath = "/project-post/Vue%20/%20Agil%20Utveckling/";
    } else if (searchTermWithoutProjectPage === "agil") {
      searchPath = "/project-post/Vue%20/%20Agil%20Utveckling/";
    } else if (searchTermWithoutProjectPage.includes("Agil")) {
      searchPath = "/project-post/Vue%20/%20Agil%20Utveckling/";
    } else if (searchTermWithoutProjectPage === "native") {
      searchPath = "/project-post/Native%20JavaScript/";
    } else if (searchTermWithoutProjectPage.includes("Native")) {
    } else if (searchTermWithoutProjectPage === "cv") {
      searchPath = "/om-mig";
    } else if (searchTermWithoutProjectPage.includes("Cv")) {
      searchPath = "/om-mig";
      searchPath = "/om-mig";
    } else if (searchTermWithoutProjectPage === "om") {
      searchPath = "/om-mig";
    } else if (searchTermWithoutProjectPage.includes("Om")) {
      searchPath = "/project-post/WordPress/PHP/";
    } else if (searchTermWithoutProjectPage === "wordpress") {
      searchPath = "/project-post/WordPress/PHP/";
    } else if (searchTermWithoutProjectPage.includes("Wordpress")) {
      searchPath = "/project-post/WordPress/PHP/";
    } else if (searchTermWithoutProjectPage === "php") {
      searchPath = "/project-post/WordPress/PHP/";
    } else if (searchTermWithoutProjectPage.includes("Php")) {
      searchPath = "/project-post/WordPress/PHP/";
      searchPath = "/project-post/LIA/";
    } else if (searchTermWithoutProjectPage === "lia") {
      searchPath = "/project-post/LIA/";
    } else if (searchTermWithoutProjectPage.includes("Lia")) {
      searchPath = "/project-post/LIA/";
    } else {
      const formattedTerm = searchTermWithoutProjectPage
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("%20");

      const encodedTerm = encodeURIComponent(
        formattedTerm.replace(/\s+/g, "%20")
      );
      searchPath = `/project-post/${encodedTerm}/`;
    }

    console.log("Search Term:", term);

    console.log("Search Path:", searchPath);

    const isPageExists = await checkIfPageExists(searchPath);

    if (isPageExists) {
      navigate(searchPath);
    } else {
      // Navigerar till 404 när sidan inte existerar
      navigate("/404/");
    }
  };

  // Funktion för att kontrollera om en sida existerar
  const checkIfPageExists = async (path: string) => {
    const result = await fetch(path);
    return result.ok;
  };

  // Visar eller döljer menyn på små skärmar
  const [showMenu, setShowMenu] = React.useState(false);

  // Funktion för att växla mellan att visa och dölja menyn
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-zink-900 text-white">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${pageTitle} - ${data.site.siteMetadata.title}`}</title>
        <meta
          name="description"
          content="Detta är min Header som inkluderar webbplatsens namn, navigation, meny, listmeny, sökruta och sökknapp"
        />
        <meta
          name="keywords"
          content="Name, Header, Menu, Meny, Navigation, Sökruta, Sök"
        />
        <meta name="author" content="Andrea Hogberg" />
        <link rel="canonical" href="https://andreahogberg.se/" />
      </Helmet>
      <div className="bg-zink-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="text-white hover:text-gray-300">
              {data.site.siteMetadata.title}
            </Link>
          </h1>
          <div className="md:hidden">
            {/* Knapp för att visa/dölja menyn på små skärmar */}
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-white hover:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  className={`${showMenu ? "hidden" : "block"}`}
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${showMenu ? "block" : "hidden"}`}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Search onSearch={handleSearch} />

          <nav className={`md:flex ${showMenu ? "block" : "hidden"}`}>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              {data.site.siteMetadata.menuLinks.map(
                (link: {
                  name:
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.Key
                    | null
                    | undefined;
                  link: string;
                }) => (
                  // Skapar menylänkar baserat på webbplatsens metadata
                  <li key={link.name}>
                    <Link
                      to={link.link}
                      className="text-white hover:text-gray-300"
                      activeClassName="underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
      <main className="container mx-auto mt-8">
        {/* Rubrik för den aktuella sidan */}
        <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
        {/* Renderar sidans innehåll */}
        {children}
      </main>
      {/* Renderar footern */}
      <Footer />
    </div>
  );
};

export default Header;
