import React, { useState } from "react";

// Gränssnitt för egenskaper som krävs av sökkomponenten
interface SearchProps {
  onSearch: (term: string) => void;
}

// Sökkomponenten som tar emot funktionen onSearch som en egenskap
const Search: React.FC<SearchProps> = ({ onSearch }) => {
  // Tillstånd för söktermen
  const [searchTerm, setSearchTerm] = useState("");

  // Funktion för att hantera sök
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    // Anropa Header onSearch-funktion med söktermen
    onSearch(searchTerm);
  };

  return (
    // Formulär för sökning som använder handleSearch-funktionen vid formulärinsändning
    <form onSubmit={handleSearch} className="flex items-center">
      {/* Inmatningsfält för söktermen */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Sök..."
        className="border border-gray-300 p-2 rounded mr-1 focus:outline-none"
        style={{ color: "gray" }}
      />
      <button
        type="submit"
        className="bg-stone-500 text-white px-5 py-2 rounded hover:bg-stone-400 focus:outline-none"
      >
        Sök
      </button>
    </form>
  );
};

export default Search;
