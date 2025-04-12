import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import "./Properties.css";
import UseProperties from "../../Hooks/UseProperties.jsx";
import { PuffLoader } from "react-spinners";
import PropertiesCard from "../../Components/PropertiesCard/PropertiesCard.jsx";
import { useSearchParams } from "react-router-dom";

function Properties() {
  const { data, isError, isLoading } = UseProperties();
  const [filter, setfilter] = useState("");
  const [searchParams] = useSearchParams();
  
  // Check for search parameter in URL
  useEffect(() => {
    const searchTerm = searchParams.get("search");
    if (searchTerm) {
      setfilter(searchTerm);
    }
  }, [searchParams]);
  
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter min-h-[60vh]">
          <span className="text-red-500">Error While Fetching the Data</span>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="wrapper flexCenter min-h-[60vh]">
        <PuffLoader color="#406ff" size={80} />
      </div>
    );
  }
  
  const filteredData = data.filter((property) =>
    property.title.toLowerCase().includes(filter.toLowerCase()) ||
    property.city.toLowerCase().includes(filter.toLowerCase()) ||
    property.country.toLowerCase().includes(filter.toLowerCase()) 
  );
  
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <div className="w-full flex justify-center max-w-3xl mb-8">
          <SearchBar filter={filter} setfilter={setfilter} />
        </div>
        
        {filteredData.length === 0 ? (
          <div className="flexCenter min-h-[40vh]">
            <span className="text-gray-500">No properties found matching your search.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {filteredData.map((card, i) => (
              <PropertiesCard card={card} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
