import * as React from "react";
import { Link } from "gatsby";
import { HeadFC, PageProps } from "gatsby";

import Header from "../components/Header";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
            404 - Page not found
          </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            Sidan du söker finns tyvärr inte.
          </p>

          <Link
            to="/"
            style={{
              fontSize: "1.2rem",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              color: "#fff",
              background: "#333",
              textDecoration: "none",
            }}
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Page Not Found</title>;
