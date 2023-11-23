// src/components/SearchBar.js
// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery.trim());
    setSearchQuery('');
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for ingredients"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
