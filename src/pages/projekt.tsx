import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/Header";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";

// Filterknappkomponenten
const FilterButton = ({ category, isActive, onClick }) => {
  // Tilldelar klasser dynamiskt, baserat på aktivt tillstånd
  const buttonClasses = `filter-button ${
    isActive
      ? "bg-stone-400 text-zink-900 border border-stone-400"
      : "bg-stone-100 text-zink-800 border border-stone-100"
  } px-4 py-3 rounded-md mr-2 mb-3 text-lg transition-colors ease-in hover:bg-stone-200`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {category}
    </button>
  );
};

interface Project {
  slug: string;
  title: string;
  description: {
    raw: string;
  };
  category: string;
  image: {
    gatsbyImageData: any;
  };
  image2: {
    gatsbyImageData: any;
  }[];
  images: {
    gatsbyImageData: any;
  }[];
}

interface ProjectListProps {
  data: {
    allContentfulProjekt: {
      nodes: Project[];
    };
  };
}

// Funktionell komponent för Projektlistan
const ProjectList: React.FC<ProjectListProps> = ({ data }) => {
  // Hämta projektdata från GraphQL-query
  const projects = data.allContentfulProjekt.nodes || [];
  // Tillståndsvariabel för den valda kategorin
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Skapar en array med unika kategorier baserat på projektdata
  const categories = Array.isArray(projects)
    ? Array.from(new Set(projects.map((project) => project.category)))
    : [];

  // Filtrerar projekt baserat på den valda kategorin
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  return (
    <Header pageTitle="Projekt">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Mina projekt - Projekt`}</title>
        <meta
          name="description"
          content="Detta är min Projektsida som inkluderar olika kategorier med filtrering och alla de projekt jag gjort under min utbildning som Frontend-Developer med en rubrik, en stor bild, tre mindre bilder, en mindre beskrivning av projektet, länk till mitt projekt, en läs mer knapp där man kan läsa mer om varje enskilt projekt och till vilken kategori projektet tillhör."
        />
        <meta
          name="keywords"
          content="Kategorier, Filtrering,  Kontaktuppgifter, Projekt, Länkar, Läs mer, Bild, Bilder, Alla, PHP/WordPress, Vue/Agil Utveckling, LIA, Fullstack, React, Native JavaScript"
        />
        <meta name="author" content="Andrea Hogberg" />
        <link rel="canonical" href="https://andreahogberg.se/" />
      </Helmet>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-auto mb-4">
          <div className="flex justify-center gap-7 flex-wrap">
            {/* Filterknapp för att visa alla projekt */}
            <FilterButton
              category="Alla"
              isActive={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
            />
            {/* Loopar igenom och renderar filterknappar för varje kategori */}
            {categories.map((category) => (
              <FilterButton
                key={category}
                category={category}
                isActive={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Loopar igenom och renderar projekt baserat på filtrering */}
        {Array.isArray(filteredProjects) && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="rounded-md shadow-md p-4 bg-stone-100 mb-8 mt-4 w-96"
              style={{ width: "435px", height: "800px" }}
            >
              <h3 className="text-lg font-bold mt-4 text-gray-800">
                {project.title}
              </h3>

              {/* Renderar huvudbild för projektet */}
              {project.image && (
                <GatsbyImage
                  image={getImage(project.image.gatsbyImageData)}
                  alt={`Bild för ${project.title}`}
                  className="mt-4"
                  style={{ width: "400px", height: "auto" }}
                />
              )}

              {/* Renderar mindre projektbilder */}
              {project.images && project.images.length > 0 && (
                <div className="flex justify-center gap-10 flex-wrap">
                  {project.images.map((image, index) => (
                    <GatsbyImage
                      key={index}
                      image={getImage(image)}
                      alt={`Bild för ${project.title}} - Image ${index + 1}`}
                      className="mt-4"
                      style={{ width: "100px", height: "80px" }}
                    />
                  ))}
                </div>
              )}
              <br></br>

              {/* Renderar projektbeskrivningen */}
              {project.description && (
                <div>
                  {documentToReactComponents(
                    JSON.parse(project.description.raw),
                    {
                      renderNode: {
                        p: (node, children) => (
                          <p className="text-lg text-gray-800">{children}</p>
                        ),
                        paragraph: (node, children) => (
                          <p className="text mt-2 mb-4 text-gray-800">
                            {children}
                          </p>
                        ),
                        "unordered-list": (node, children) => (
                          <ul>{children}</ul>
                        ),
                        "list-item": (node, children) => <li>{children}</li>,
                      },
                    }
                  )}
                </div>
              )}

              {/* Läs mer länk */}
              <Link
                to={`/project-post/${project.slug}`}
                className="mt-2 bg-stone-500 text-white py-2 px-4 rounded hover:bg-stone-400  focus:outline-none"
              >
                Läs mer
              </Link>

              {/* Kategori */}
              <p className="text-lg mt-4 mb-4 text-gray-800">
                Kategori: {project.category}
              </p>
            </div>
          ))
        ) : (
          <p>Inga projekt hittades</p>
        )}
      </div>
    </Header>
  );
};

export default ProjectList;

export const query = graphql`
  query ProjektPageQuery {
    allContentfulProjekt {
      nodes {
        slug
        title
        description {
          raw
        }
        category
        images {
          gatsbyImageData(layout: CONSTRAINED, width: 400)
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 400)
        }
        image2 {
          gatsbyImageData(layout: CONSTRAINED, width: 400)
        }
      }
    }
  }
`;
