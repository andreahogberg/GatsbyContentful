import React, { useState } from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Helmet } from "react-helmet";

const KontaktPage = ({ data }) => {
  const kontaktData = data.contentfulKontakt;

  // Variabler för formulärhantering
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Variabel för att indikera att formuläret skickats
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Funktion för att hantera ändringar i formulärfälten
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Funktion för att hantera formulärinskickning
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kontrollera om alla fält är ifyllda
    if (formData.name && formData.email && formData.message) {
      // Utför åtgärder för att skicka formuläret (Netlify-formulärslogik)
      setFormSubmitted(true);
    }
  };

  return (
    <Header pageTitle="Kontakt">
      {/* Huvudsektion med formulär och kontaktinformation */}
      <div className="max-w-4xl mx-auto p-8 shadow-md rounded-lg flex flex-col md:flex-row">
        {/* Helmet för att hantera metadatan */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${kontaktData} - ${
            data?.site?.siteMetadata?.title || "Kontakt"
          }`}</title>
          <meta
            name="description"
            content="Detta är min Kontaktsida som inkluderar kontaktuppgifter, länkar till mina kanaler, kontaktformulär, dynamisk bild, knapp för att skicka formuläret, tackmeddelande vid skickat formulär"
          />
          <meta
            name="keywords"
            content="Kontakt, Kontaktformulär, Kontaktuppgifter, Namn, Utbildningar, Stad, Land,Mail, Mobilnummer, Länkar till mina kanaler, GitHub, LinkedIn, Bild"
          />
          <meta name="author" content="Andrea Hogberg" />
          <link rel="canonical" href="https://andreahogberg.se/" />
        </Helmet>

        <div className="md:w-1/2 pr-8">
          {/* Visar tackmeddelande om formuläret har skickats */}
          {formSubmitted ? (
            <div className="text-white">
              <p className="text-3xl font-bold mb-4">
                Tack för ditt meddelande.
              </p>
              <p className="text-white mb-4">Jag återkommer så fort jag kan.</p>
            </div>
          ) : (
            <>
              {/* Visar kontaktinformation om formuläret inte har skickats */}
              <h4 className="text-3xl font-bold text-white mb-4">
                {kontaktData.title}
              </h4>
              <p className="text-white mb-4">
                {documentToReactComponents(
                  JSON.parse(kontaktData.kontaktuppgifter.raw)
                )}
              </p>
            </>
          )}
        </div>
        {/* Högersektion med formulär om formuläret inte har skickats */}
        {!formSubmitted && (
          <div className="md:w-1/2">
            {/* Formulär för att skicka meddelanden */}
            <form
              className="max-w-lg mx-auto"
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              {/* Namnfält */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-bold">
                  Namn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-stone-400 w-full border rounded-md p-2"
                  required
                />
              </div>
              {/* E-postfält */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-bold">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-stone-400 w-full border rounded-md p-2"
                  required
                />
              </div>
              {/* Meddelandefält */}
              <div className="mb-4">
                <label htmlFor="message" className="block text-white font-bold">
                  Meddelande
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-stone-400 w-full border rounded-md p-2"
                  required
                ></textarea>
              </div>
              {/* Skicka-knapp */}
              <button
                type="submit"
                className="bg-stone-800 text-white rounded-md py-2 px-4 hover:bg-stone-400"
              >
                Skicka
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-7">
        <img
          src={kontaktData.image.file.url}
          alt="Bild"
          className="rounded-md h-60 md:h-auto"
        />
      </div>
    </Header>
  );
};

export const pageQuery = graphql`
  query KontaktPageQuery {
    contentfulKontakt {
      slug
      title
      kontaktuppgifter {
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

export const Head = () => <title>Kontakt</title>;

export default KontaktPage;
