import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Header from "../components/Header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Funktion för att rendera projektbeskrivningen baserat på JSON-format
const renderDescription = (rawDescription) => {
  const description = JSON.parse(rawDescription);

  return (
    <div className="prose max-w-full">
      {documentToReactComponents(description, {
        renderNode: {
          // Anpassar renderingen för specifika nodtyper
          "heading-3": (node, children) => (
            <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
          ),
          "unordered-list": (node, children) => (
            <ul className="list-disc ml-6">{children}</ul>
          ),
          "ordered-list": (node, children) => (
            <ol className="list-decimal ml-6">{children}</ol>
          ),
          "list-item": (node, children) => <li>{children}</li>,
          paragraph: (node, children) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
        },
      })}
    </div>
  );
};

// Funktionell komponent för projektinlägget
const ProjectPost = ({ data }) => {
  // Hämtar projektdata från GraphQL-query
  const project = data.contentfulProjekt;

  return (
    <Header>
      <div>
        {/* Projektets titel */}
        <h1 className="flex justify-center text-2xl font-bold mb-4">
          {project.title}
        </h1>

        {/* Huvudbild för projektet */}
        <div className="flex justify-center ">
          {project.image && project.image.gatsbyImageData && (
            <GatsbyImage
              image={getImage(project.image.gatsbyImageData)}
              alt={project.image.title}
            />
          )}
        </div>

        {/* Visar lång beskrivning av projektet */}
        <div className="flex justify-center ">
          <div className="mb-4 mt-4 prose">
            {renderDescription(project.longDescription.raw)}
          </div>
        </div>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="flex justify-center gap-10 flex-wrap">
          {project.images.map((image, index) => (
            <GatsbyImage
              key={index}
              image={getImage(image)}
              alt={`${project.title} - Image ${index + 1}`}
              className="mt-4"
              style={{ width: "300px", height: "auto" }}
            />
          ))}
        </div>
      )}
    </Header>
  );
};

// GraphQL-query för att hämta data för ett specifikt projektinlägg baserat på slug
export const query = graphql`
  query ProjectPostQuery($slug: String!) {
    contentfulProjekt(slug: { eq: $slug }) {
      title
      image {
        gatsbyImageData(layout: CONSTRAINED, width: 800)
        title
        description
      }
      images {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
        title
        description
      }
      longDescription {
        raw
      }
    }
  }
`;

export default ProjectPost;
