import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Header from "../components/Header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

// Gränssnitt för portfolioposter
interface Portfolio {
  title: string;
  subtitle: string;
  description: {
    raw: string;
  };
  image: {
    file: {
      url: string;
    };
  };
}

// Gränssnitt för egenskaper för startsidan
interface IndexPageProps extends PageProps {
  data: {
    allContentfulPortfolio: {
      nodes: Portfolio[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <div>
      {/* Kartläggning av varje portfoliopost i datan */}
      {data.allContentfulPortfolio.nodes.map((portfolio: Portfolio) => (
        <div key={portfolio.title}>
          {/* Helmet för att hantera seo */}
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${portfolio.title} - Mina skolprojekt`}</title>
            <meta
              name="description"
              content="Detta är min Startsida som inkluderar slug, title, subtitle, description, bild"
            />
            <meta
              name="keywords"
              content="Startsida, Slug, Title, Subtitle, Description, Bild"
            />
            <meta name="author" content="Andrea Hogberg" />
            <link rel="canonical" href="https://andreahogberg.se/" />
          </Helmet>
          {/* Anropa Header-komponenten */}
          <Header>
            {/* Huvudsektion med bakgrundsbild */}
            <div
              className="bg-image flex justify-center items-center relative"
              style={{
                backgroundImage: `url(${portfolio.image.file.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>

              <div className="text-center text-white relative z-10">
                <h1 className="text-9xl font-bold mb-7">
                  {/* Använt Link från Gatsby för intern navigering */}
                  <Link
                    to="/projekt"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    {portfolio.title}
                  </Link>
                </h1>
                {/* Flexcontainer för underrubrik och beskrivningstext */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-4">
                    <div className="bg-white bg-opacity-75 p-6 rounded-full mb-3">
                      <h3 className="text-xl font-bold">
                        {portfolio.subtitle}
                      </h3>
                    </div>
                  </div>

                  <div className="md:w-1/2 md:pl-4">
                    <div className="bg-white bg-opacity-75 p-6 rounded-full mb-3">
                      <p className="text-lg">
                        {documentToReactComponents(
                          JSON.parse(portfolio.description.raw)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Header>
        </div>
      ))}
    </div>
  );
};

export const pageQuery = graphql`
  query IndexPageQuery {
    allContentfulPortfolio {
      nodes {
        slug
        title
        subtitle
        description {
          raw
        }
        image {
          file {
            url
          }
        }
      }
    }
  }
`;

export default IndexPage;
