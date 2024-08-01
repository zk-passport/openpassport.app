'use client';

import React, { useState } from "react";
import {SearchInput} from "../../components/search/SearchInput";
import{SearchResults} from "../../components/search/SearchResults";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <div>
      <SearchInput searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
      <SearchResults searchQuery={searchQuery} />
    </div>
  );
};
export default Search;