import React, { useContext, useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import '../Properties/Properties.css'
import UseProperties from "../../Hooks/UseProperties.jsx";
import { PuffLoader } from "react-spinners";
import PropertiesCard from "../../Components/PropertiesCard/PropertiesCard.jsx";
import { property } from "lodash";
import UserDetailContext from "../../Context/UserDetailsContext.js";

function Bookings() {
  const { data, isError, isLoading } = UseProperties();
  const [filter, setfilter] = useState("");
  const {userDetails:{bookings}}=useContext(UserDetailContext)

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error While Fetching the Data</span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        className="wrapper flexCenter loader-container"
        style={{ height: "60vh" }}
      >
        <PuffLoader color="#406ff" size={80} />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerwidth properties-container">
        <SearchBar filter={filter} setfilter={setfilter} />
        <div className="paddings flexCenter properties flex-wrap gap-4">
          {
            data
                .filter((property)=>bookings.map((booking)=>booking?.id).includes(property.id))

              .filter((property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase()) 
              )
              .map((card, i) => (
                <PropertiesCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default Bookings;
