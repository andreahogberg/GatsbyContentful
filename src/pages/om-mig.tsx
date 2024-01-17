import * as React from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";

const OmMigPage = ({ data }) => {
  const cvData = data.contentfulCv;
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Helmet för att seo */}
      <Helmet>
        {/* LD+JSON-skript för att lägga till strukturerad metadata */}
        <script type="application/ld+json">
          {`
            {
              "name": "${cvData.title}",
              "jobTitle": "Online Merchandiser, Frontend-Developer",
              "url": "https://andreahogberg.se/",
              "image": "${cvData.image.file.url}",
              "description": "${cvData.title}'s mitt cv och personliga brev med arbetslivserfarenheter och utbildningar."
            }
          `}
        </script>
      </Helmet>
      {/* Huvudsektion med sidtitel och CV-innehåll */}
      <Header pageTitle="Om Mig">
        <div className="max-w-5xl mx-auto p-4 bg-stone-300 shadow-md rounded-lg">
          <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
            {/* Övre delen med rubrik och namn */}
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-700">
                  {cvData.slug}
                </h1>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {cvData.title}
                </h4>
              </div>
            </div>
            {/* CV-information */}
            <p className="mt-4 text-gray-800">
              {documentToReactComponents(JSON.parse(cvData.cvinfo.raw))}
            </p>
            {/* Bild */}
            <img
              src={cvData.image.file.url}
              alt="bild"
              className="mt-4 mx-auto rounded-md"
              width="400"
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            Bästa hälsningar, Andrea Högberg
          </p>
        </div>
      </Header>
    </div>
  );
};

export const pageQuery = graphql`
  query OmMigPageQuery {
    contentfulCv {
      slug
      title
      cvinfo {
        raw
      }
      image {
        file {
          url
        }
      }
    }
  }
`;

export const Head = () => <title>CV</title>;

export default OmMigPage;
