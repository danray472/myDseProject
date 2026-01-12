import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress} // Trigger search on Enter key press
        placeholder="Search..."
      />
      {/* Glassy icon with pointer cursor on hover */}
      <div className="search-icon" onClick={handleSearch} onKeyDown={handleKeyPress} tabIndex={0}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
