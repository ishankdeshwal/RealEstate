import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function SearchBar({ filter, setfilter, isHero = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (isHero) {
      // Navigate to properties page with search term
      navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // Update filter for properties page
      setfilter(searchTerm);
    }
  };

  return (
    <div className="search-bar bg-white w-full rounded-[5px] flex justify-between items-center gap-1 px-2 sm:px-4 py-2">
      <HiLocationMarker color="var(--blue)" size={20} className="flex-shrink-0" />
      <input
        type="text"
        placeholder="Search by title/city/country"
        value={isHero ? searchTerm : filter}
        onChange={(e) => isHero ? setSearchTerm(e.target.value) : setfilter(e.target.value)}
        className="text-black outline-none w-full text-sm sm:text-base"
      />
      <button 
        className="button text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 whitespace-nowrap flex-shrink-0" 
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
